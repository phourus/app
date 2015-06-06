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
    let component;
    if (this.state.mode == "forgot") {
      component = <Forgot />;
    } else if (this.state.mode == "register") {
      component = <Register />;
    } else {
      component = <Login register={this._register} forgot={this._forgot} />;
    }
    return (
      <div className="view401">{component}</div>
    );
  },
  _register: function () {
    this.setState({mode: "register"});
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
        <input ref="username" className="username" />
        <input ref="password" className="password" type="password" />
        <button onClick={this._login} className="green button">Login</button>
        <a href="" className="forgotLink" onClick={this.props.forgot}>Forgot your login information? Click here</a>
        <div className="registration">Not yet a member?
          <a href="" className="registerLink" onClick={this.props.register}>Click here to register</a>
        </div>
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
        <input ref="email" className="email" />
        <input ref="password" className="password" type="password" />
        <input ref="confirm" className="confirm" type="password" />
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
      <input ref="handle" className="handle" />
      <button onClick={this._request} className="blue button submit">Send me my login info</button>
    </div>
    );
  },
  _request: function () {

  },
});

module.exports = View401;
