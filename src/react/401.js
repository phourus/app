"use strict";
let React = require('react');
let Router = require('react-router');
let { RouteHandler, State, Navigation, Link } = Router;
let Actions = require('../actions/account');
let Store = require('../stores/account');

let View401 = {};

View401.Login = React.createClass({
  mixins: [State, Navigation],
  getInitialState: function () {
    return {
      loaded: false
    };
  },
  componentDidMount: function () {
    this.unsubscribe = Store.listen(data => {
      if (data.code === 200 && this.context.router.getCurrentRoutes()[1].name === 'login') {
        this.context.router.transitionTo("activity");
      }
      this.setState(data);
    });
  },
  componentWillUnmount: function () {
    this.unsubscribe();
  },
  componentDidUpdate: function () {
    if (this.state.loaded === false) {
      this.setState({code: null, loaded: true});
    }
  },
  render: function () {
    return (
      <div className="login">
        <h1>Login</h1>
        <label>
          Email:
          <input ref="username" className="username" placeholder="your email address"/>
        </label>
        <label>
          Password:
          <input ref="password" className="password" type="password" placeholder="your password" />
        </label>
        {this.state.code === 401 && this.state.loaded
          ? <div className="message red" onClick={this._clear}>There was an error logging in. Please try again or <a href="mailto:info@phourus.com&subject=Error">contact us.</a></div>
          : false
        }
        <button onClick={this._login} className="green button">Login</button>
        <Link to="forgot" className="forgotLink">Forgot your login information? Click here</Link>
      </div>
    );
  },
  _login: function () {
    let username = this.refs.username.getDOMNode().value;
    let password = this.refs.password.getDOMNode().value;
    this._clear();
    Actions.login(username, password);
  },
  _request: function () {
    //this._clear();
    //this.context.router.transitionTo("request");
  },
  _clear: function () {
    this.setState({code: null});
  }
});

View401.Request = React.createClass({
  getInitialState: function () {
    return {
      email: ""
    }
  },
  componentDidMount: function () {
    this.unsubscribe = Store.listen(data => {
      this.setState(data);
    });
  },
  componentWillUnmount: function () {
    this.unsubscribe();
  },
  render: function () {
    return (
      <div className="request">
        <h1>Request Access</h1>
        <p>Phourus is currently in Private Beta, so please provide your email below if you'd like to join.</p>
        <label>
          Email:
          <input className="username" placeholder="your email address" onChange={this._email} />
        </label>
        {this.state.code === 500
          ? <div className="message red" onClick={this._clear}>There was an error requesting access. Please try again or <a href="mailto:info@phourus.com&subject=Error">contact us.</a></div>
          : false
        }
        {this.state.code === 409
          ? <div className="message red" onClick={this._clear}>That email already exists. Use a different email address or <Link to="login">login with your existing email.</Link></div>
          : false
        }
        {this.state.code === 202
          ? <div className="message green" onClick={this._clear}>Your request has been received. We will email you with further instructions if you are accepted.</div>
          : false
        }
        <button onClick={this._request} className="green button">Request Access</button>
      </div>
    );
  },
  _email: function (e) { this.setState({email: e.currentTarget.value }); },
  _request: function () {
    Actions.request(this.state.email);
  },
  _clear: function () {
    this.setState({code: null});
  }
});

View401.Forgot = React.createClass({
  getInitialState: function () {
    return {}
  },
  componentDidMount: function () {
    this.unsubscribe = Store.listen(data => {
      this.setState(data);
    });
  },
  componentWillUnmount: function () {
    this.unsubscribe();
  },
  render: function () {
    return (
    <div className="forgot">
      <h1>Forgot your login information?</h1>
      <label>
        Email:
        <input onChange={this._email} />
      </label>
      {this.state.code === 500
        ? <div className="message red" onClick={this._clear}>There was an error sending your reset link. Please try again or <a href="mailto:info@phourus.com&subject=Error">contact us.</a></div>
        : false
      }
      {this.state.code === 200
        ? <div className="message green" onClick={this._clear}>Instructions to reset your password have been sent to your email address.</div>
        : false
      }
      <button onClick={this._forgot} className="blue button submit">Email me a reset link</button>
    </div>
    );
  },
  _email: function (e) { this.setState({email: e.currentTarget.value }); this._clear(); },
  _forgot: function () {
    Actions.forgot(this.state.email)
    this.setState({email: "", code: null});
  },
  _clear: function () {
    this.setState({code: null});
  }
});

View401.Reset = React.createClass({
  mixins: [State],
  getInitialState: function () {
    return {}
  },
  componentDidMount: function () {
    this.unsubscribe = Store.listen(data => {
      this.setState(data);
    });
  },
  componentWillUnmount: function () {
    this.unsubscribe();
  },
  render: function () {
    return (
    <div className="reset">
      <h1>Reset Your Password</h1>
      <label>
        Email:
        <input onChange={this._email} />
      </label>
      <label>
        New Password:
        <input onChange={this._password} type="password" />
      </label>
      <label>
        Confirm Password:
        <input onChange={this._confirm} type="password" />
      </label>
      {this.state.code === 403
        ? <div className="message red" onClick={this._clear}>There was an error resetting your password. Please try again or <a href="mailto:info@phourus.com&subject=Error">contact us.</a></div>
        : false
      }
      {this.state.code === 200
        ? <div className="message green" onClick={this._clear}>Your password has been reset. You can now <Link to="login">login with your new password here.</Link></div>
        : false
      }
      <button onClick={this._reset} className="blue button submit">Reset my Password</button>
    </div>
    );
  },
  _email: function (e) { this.setState({email: e.currentTarget.value }); },
  _password: function (e) { this.setState({password: e.currentTarget.value }); },
  _confirm: function (e) { this.setState({confirm: e.currentTarget.value }); },
  _reset: function () {
    let query = this.context.router.getCurrentQuery();
    if (this.state.password === this.state.confirm) {
      Actions.reset(this.state.email, this.state.password, query.token, query.userId);
    }
  },
  _clear: function () {
    this.setState({code: null});
  }
});

View401.Register = React.createClass({
  getInitialState: function () {
    return {
      email: "",
      password: "",
      confirm: "",
      organization: "",
      loaded: false
    };
  },
  componentDidMount: function () {
    this.unsubscribe = Store.listen(data => {
      this.setState(data);
    });
  },
  componentWillUnmount: function () {
    this.unsubscribe();
  },
  componentDidUpdate: function () {
    if (this.state.loaded === false) {
      this.setState({code: null, loaded: true});
    }
  },
  render: function () {
    return (
      <div className="register">
        <h1>Create your Phourus Account</h1>
        <div className="instructions">
          <h2>Phourus: SaaS with a Soul</h2>
          <p></p>
          <ul>
            <li>Surface important content & ideas</li>
            <li>Capture intellectual capital</li>
            <li>Embrace real culture & diversity</li>
            <li>Enhance Vision & Engagement</li>
          </ul>
          <h2>Step 1. Create personal account</h2>
          <p>To start using Phourus, you will want to create a personal account. Once you have a personal account, you can create or join existing organization accounts.</p>
          <h2>Step 2. Create or join organization (optional)</h2>
          <p>Although Phourus can be used strictly as an individual, the real benefit comes from using it within an organization. If your organization already has a Phourus account, or you'd like to create one, simply type your organization name into the organization field in the signup form.</p>
        </div>
        <div className="form">
          <h2>Signup Form</h2>
          <div>
            <label>
              Your Email:
              <input ref="email" className="email" placeholder="enter your email address" value={this.state.email} onChange={this._email} />
            </label>
            <label>
              Password:
              <input ref="password" className="password" type="password" placeholder="enter a password" value={this.state.password} onChange={this._password} />
            </label>
            <label>
              Confirm Password:
              <input ref="confirm" className="confirm" type="password" placeholder="confirm your password" value={this.state.confirm} onChange={this._confirm} />
            </label>
            <label>
              Organization Name (optional):
              <input className="confirm" placeholder="organization name" value={this.state.organization} onChange={this._organization} />
            </label>
            {this.state.code && this.state.loaded
              ? <div className="error" onClick={this._clear}>There was an error creating your account. Please try again or <a href="mailto:info@phourus.com&subject=Error">contact us.</a></div>
              : false
            }
            <Link to="login">Already have an account? Click here to sign in.</Link>
            <button onClick={this._register} className="blue button submit">Sign Up Now</button>
          </div>
        </div>
      </div>
    );
  },
  _email: function (e) {
    var value = e.currentTarget.value;
    this.setState({email: value});
  },
  _password: function (e) {
    var value = e.currentTarget.value;
    this.setState({password: value});
  },
  _confirm: function (e) {
    var value = e.currentTarget.value;
    this.setState({confirm: value});
  },
  _organization: function (e) {
    var value = e.currentTarget.value;
    this.setState({organization: value});
  },
  _register: function () {
    if (this.state.password === this.state.confirm) {
      Actions.register(this.state.email, this.state.password);
    }
  },
  _clear: function () {
    this.setState({code: null});
  }
});

module.exports = View401;
