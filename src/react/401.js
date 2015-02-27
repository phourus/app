/** @jsx React.DOM */
"use strict";
var React = require('react');
var account = require('../sockets/account');
var token = require('../token');
var msg = function (color, msg, code) {}

var View401 = React.createClass({
    getInitialState: function () {
        return {
            mode: "login"
        }  
    },
    componentDidMount: function () {
		var self = this;
        account.on('register', function (code, data) {
             msg('green', 'Registration complete', code);
         });
         account.on('login', function (code, data) {
             if (code === 200) {
                 token.save(data);
                 return;
             }
             msg('red', 'Login unsuccessful', code);
         }); 
	 },
	 register: function () {
    	this.setState({mode: "register"}); 
	 },
     forgot: function () {
    	this.setState({mode: "forgot"}); 
	 },
    render: function () {
        var component;
        if (this.state.mode == "forgot") {
            component = <Forgot />;
        } else if (this.state.mode == "register") {
            component = <Register />;
        } else {
            component = <Login register={this.register} forgot={this.forgot} />;
        }
        return (
            <div className="view401">
                {component}
            </div>
        );
    }
});

var Login = React.createClass({
	 login: function () {
	     var username, password, self;
	     self = this;
         username = this.refs.username.getDOMNode().value;
         password = this.refs.password.getDOMNode().value;
	     account.login(username, password);
	 },
     render: function () {
          return (
            <div className="login">
                <h1>Login</h1>
                <input ref="username" className="username" />
                <input ref="password" className="password" type="password" />
                <button onClick={this.login} className="green button">Login</button>
                <a href="" className="forgotLink" onClick={this.props.forgot}>Forgot your login information? Click here</a>
                <div className="registration">Not yet a member? 
                    <a href="" className="registerLink" onClick={this.props.register}>Click here to register</a>
                </div>
            </div>
          );
     }
});

var Register = React.createClass({
     register: function () {
         var email = this.refs.email.getDOMNode().value;
         var password = this.refs.password.getDOMNode().value;
         var confirm = this.refs.confirm.getDOMNode().value;
         if (password === confirm) {
             account.register(email, password);
         }
     },
     render: function () {
          return (
            <div className="register">
                <h1>Register</h1>
                <input ref="email" className="email" />
                <input ref="password" className="password" type="password" />
                <input ref="confirm" className="confirm" type="password" />
                <button onClick={this.register} className="blue button submit">Sign Up Now</button>
            </div>
          );
     }    
});

var Forgot = React.createClass({
    request: function () {
        
    },
    render: function () {
        return (
            <div className="forgot">
                <h1>Forgot your login information?</h1>
                <input ref="handle" className="handle" />
                <button onClick={this.request} className="blue button submit">Send me my login info</button>             
            </div>
        );
    } 
});

module.exports = View401;
