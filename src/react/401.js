"use strict";
let React = require('react');
let Router = require('react-router');
let { State } = Router;
let Actions = require('../actions/account');
let Store = require('../stores/account');

let View401 = React.createClass({
  mixins: [State],
  getInitialState: function () {
    return {
      mode: "login"
    }
  },
  componentDidMount: function () {
    Store.listen((data) => {
      this.setState(data);
    });
    this._routes();
  },
  componentWillReceiveProps: function () {
    this._routes();
  },
  render: function () {
    return (
      <div className="view401">
        {this.state.mode === 'login'
          ? <Login forgot={this._forgot} />
          : false
        }
        {this.state.mode === 'forgot'
          ? <Forgot />
          : false
        }
        {this.state.mode === 'reset'
          ? <Reset />
          : false
        }
        {this.state.mode === 'request'
          ? <Request />
          : false
        }
        {this.state.mode === 'register'
          ? <Register />
          : false
        }
      </div>
    );
  },
  _routes: function () {
    let route = this.context.router.getCurrentRoutes();
    if (route[1].name === 'reset') {
      this.setState({mode: "reset"});
    }
  },
  _forgot: function () {
    this.setState({mode: "forgot"});
  },
});

let Login = React.createClass({
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
        <button onClick={this._login} className="green button">Login</button>
        <a href="javascript:void(0)" className="forgotLink" onClick={this.props.forgot}>Forgot your login information? Click here</a>
      </div>
    );
  },
  _login: function () {
    let username = this.refs.username.getDOMNode().value;
    let password = this.refs.password.getDOMNode().value;
    Actions.login(username, password);
  },
});

let Forgot = React.createClass({
  render: function () {
    return (
    <div className="forgot">
      <h1>Forgot your login information?</h1>
      <label>
        Email:
        <input onChange={this._email} />
      </label>
      <button onClick={this._forgot} className="blue button submit">Email me a reset link</button>
    </div>
    );
  },
  _email: function (e) { this.setState({email: e.currentTarget.value }); },
  _forgot: function () {
    Actions.forgot(this.state.email)
  }
});

let Reset = React.createClass({
  mixins: [State],
  render: function () {
    return (
    <div className="forgot">
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
  }
});

let Register = React.createClass({
  getInitialState: function () {
    return {
      email: "",
      password: "",
      confirm: ""
    };
  },
  render: function () {
    return (
      <div className="register">
        <h1>Register</h1>
        <label>
          Email:
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
        <button onClick={this._register} className="blue button submit">Sign Up Now</button>
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
  _register: function () {
    if (this.state.password === this.state.confirm) {
      Actions.register(this.state.email, this.state.password);
    }
  },
});

module.exports = View401;
