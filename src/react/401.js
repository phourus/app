/** @jsx React.DOM */
"use strict";
var React = require('react');
var account = require('../objects/account');
var token = require('../token');

var View401 = React.createClass({
    componentDidMount: function () {
		var self = this;
		var update = this.props.update;
        account.on('returnRegister', function (data) {
             alert('registration complete'); 
         });
         account.on('returnLogin', function (data) {
             console.log(data);
             if (data) {
                 token.save(data);
                 // Need to update parent, not current view
                 //self.forceUpdate();
             }
         }); 
	 },
    render: function () {
        return (
            <div className="view401">
                <h1>Login</h1>
                <Login update={this.props.update} force={this.props.force} />
                <h1>Register</h1>
                <Register update={this.props.update} />
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
            <div>
                <input ref="username" />
                <input ref="password" type="password" />
                <button onClick={this.login} className="green button">Login</button>
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
            <div>
                <input ref="email" />
                <input ref="password" type="password" />
                <input ref="confirm" type="password" />
                <button onClick={this.register} className="blue button">Sign Up Now</button>
            </div>
          );
     }    
});

module.exports = View401;
