"use strict";
let React = require('react');
let Actions = require('../actions/account');
let Store = require('../stores/account');

let View401 = React.createClass({
  getInitialState: function () {
    return {
      mode: "login"
    }
  },
  componentDidMount: function () {
    Store.listen((data) => {
      this.setState(data);
    });
  },
  render: function () {
    return (
      <div className="view401">
        <Register />
        <Login forgot={this._forgot} />
      </div>
    );
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

let Register = React.createClass({
  render: function () {
    return (
      <div className="register">
        <h1>Register</h1>
        <label>
          Email:
          <input ref="email" className="email" placeholder="enter your email address" />
        </label>
        <label>
          Password:
          <input ref="password" className="password" type="password" placeholder="enter a password" />
        </label>
        <label>
          Confirm Password:
          <input ref="confirm" className="confirm" type="password" placeholder="confirm your password" />
        </label>
        <button onClick={this._register} className="blue button submit">Sign Up Now</button>
      </div>
    );
  },
  _register: function () {
    let email = this.refs.email.getDOMNode().value;
    let password = this.refs.password.getDOMNode().value;
    let confirm = this.refs.confirm.getDOMNode().value;
    if (password === confirm) {
      Actions.register(email, password);
    }
  },
});

let Forgot = React.createClass({
  render: function () {
    return (
    <div className="forgot">
      <h1>Forgot your login information?</h1>
      <label>
        Email:
        <input ref="handle" className="handle" />
      </label>
      <button onClick={this._request} className="blue button submit">Send me my login info</button>
    </div>
    );
  },
  _request: function () {

  }
});

module.exports = View401;
