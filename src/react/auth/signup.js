"use strict";
let React = require('react');
let Router = require('react-router');
let { Link } = Router;
let Actions = require('../../actions/account');
let Store = require('../../stores/account');

module.exports = React.createClass({
  getDefaultProps: function () {
    return {
      show: false
    };
  },
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
    if (!this.props.show) {
      return false;
    }
    return (
      <div className="register">
        <div className="form">
          <h2>Step 1. Create personal account</h2>
          <p>To start using Phourus, you will want to create a personal account. Once you have a personal account, you can create or join existing organization accounts.</p>
          <h2>Step 2. Create or join organization (optional)</h2>
          <p>Although Phourus can be used strictly as an individual, the real benefit comes from using it within an organization. If your organization already has a Phourus account, or you'd like to create one, simply type your organization name into the organization field in the signup form.</p>
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
            <a href="javascript:void(0)" onClick={this.props.showLogin}>Already have an account? Click here to sign in.</a>
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
