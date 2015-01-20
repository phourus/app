/** @jsx React.DOM */
"use strict";
var React = require('react');
var account = require('../objects/account');
var token = require('../token');
//var View401 = require('./401');

var Account = React.createClass({
    getDefaultProps: function () {
        return {
            id: null,
            pic: "",
            username: "",
            first: "",
            last: "",
            email: "",
            phone: "",
            company: "",
            occupation: "",
            website: "",
            dob: "",
            gender: "",
            address: {
                street: "",
                city: "",
                state: "",
                zip: ""
            }
        }  
     },
     save: function () {
        account.edit(this.props);
     },
     change: function (e) { 
        var obj = {};
        // would be nice if React would provide ref value for synthetic events
        obj[e.target.className] = e.target.value;
        this.setProps(obj);
     },
     componentDidMount: function () {
		var self = this;
		var update = this.props.update;
         account.on('returnGet', function (data) {
             self.setProps(data);
         });
         account.on('returnEdit', function (data) {
            alert('account updated'); 
         });
         account.on('returnPassword', function (data) {
             alert('password updated');
         });
         account.on('returnDeactivate', function (data) {
             alert('account deactivated');
         });
         account.get();
	 },
     update: function (obj) {
		 this.setProps(obj);
	 },
     deactivate: function () {
       account.deactivate();  
     },
     logout: function () {
	    token.remove();
	    this.forceUpdate();
	 },
     render: function () { 
        if (token.get() !== false) {
            return (
                <div>
                    <button onClick={this.logout} className="button red">Logout</button>
                    <PicUploader pic={this.props.pic} id={this.props.id} />
                    <Info info={this.props} change={this.change} />
                    <Details details={this.props} change={this.change} />
                    <button className="button green save" onClick={this.save}>Save Info</button>
                    <Address address={this.props.address} change={this.change} />
                    <Social />
                    <Password />  
                    <button className="button red" onClick={this.deactive}>Deactivate Account</button>
                </div>
            );
        } else {
            return (
                <View401 update={this.update} force={this.force} />
            );
        } 
     }
});

var PicUploader = React.createClass({
    render: function () {
        return (
            <div>   
                <h3>Photo Upload</h3>
                <div className="pic">
                    <img src="{this.props.pic}" onerror="this.src='/assets/pics/default.png'" height="200" />
                </div>
                <form action="/rest/pic/{this.props.id}" method="post" encType="multipart/form-data" target="upload">
                  <input type="file" ref="pic" id="pic" />
                  <input type="hidden" ref="type" value="user" />
                  <input type="submit" ref="submit" value="Upload" className="button blue" />
                </form>
            </div>
        );
    }    
});

var Info = React.createClass({
    render: function () {
        return (
          <div>
            <h3>My Basic Info</h3>
            <div id="user_basic">
                <input ref="username" className="username" type="text" value={this.props.info.username} disabled="true" />
                <input ref="first" className="first" type="text" value={this.props.info.first} onChange={this.props.change} />
                <input ref="last" className="last" type="text" value={this.props.info.last} onChange={this.props.change} />
                <input ref="email" className="email" type="text" value={this.props.info.email} onChange={this.props.change} />
                <input ref="phone" className="phone" type="text" value={this.props.info.phone} onChange={this.props.change} /> 
            </div>
          </div>
        );
    }    
});

var Details = React.createClass({
    render: function () {
        return (
          <div>
            <h3>My Details</h3>
            <div id="user_detail">
                <input ref="company" className="company" type="text" value={this.props.details.company} onChange={this.props.change} />
                <input ref="occupation" className="occupation" type="text" value={this.props.details.occupation} onChange={this.props.change} />
                <input ref="website" className="website" type="text" value={this.props.details.website} onChange={this.props.change} />
                <input ref="dob" className="dob" type="datetime" value={this.props.details.dob} onChange={this.props.change} />
                <select ref="gender" className="gender" value={this.props.details.gender} onChange={this.props.change}>
                    <option value="">Private</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                </select>
            </div>
          </div>
        );
    }    
});

        /*                      states = []
          _.each @states, (val, key, obj) ->
            states.push {label: val, val: key}*/
var Address = React.createClass({
    render: function () {
        return (
          <div>
            <h3>My Address</h3>
            <div id="user_address">
                <input ref="street" className="street" type="text" value={this.props.address.street} onChange={this.props.change} />
                <input ref="zip" className="zip" type="text" value={this.props.address.zip} onChange={this.props.change} />
                <input ref="city" className="city" type="text" value={this.props.address.city} onChange={this.props.change} />
                <input ref="state" className="state" type="text" value={this.props.address.state} onChange={this.props.change} />
            </div>
          </div>
        );
    }    
});

var Social = React.createClass({
    render: function () {
        return (
          <div id="social">
            <h3>Verify Social Accounts</h3>
            <button id="facebook" className="social"></button> 
            <button id="linkedin" className="social"></button>
            <button id="linkedin" className="social"></button>
            <button id="google" className="social"></button>
          </div>
        );
    }    
});

var Password = React.createClass({
    change: function () {
         var current = this.refs.current.getDOMNode().value;
         var changed = this.refs.changed.getDOMNode().value;
         var verify = this.refs.verify.getDOMNode().value;
         if (changed === verify) {
             account.password(current, changed);
         }
    },
    render: function () {
        return (
          <div id="password">
            <h3>Change Password</h3>
            <div id="user_password">
                <input ref="current" type="password" />
                <input ref="changed" type="password" />
                <input ref="verify" type="password" />
            </div>
            <button id="save_password" className="button green save" onClick={this.change}>Update Password</button>
          </div>
        );
    }    
});

/*

        when "orgs"
          schema.name = "Text"
          schema.type = "Text"
          schema.shortname = "Text"
          schema.video = "Text"
          schema.channel = "Text"
          schema.email = "Text"
          schema.phone = "Text"
          schema.address = "Text"
          schema.about = "TextArea"
          schema.contact = "TextArea"
*/
  
module.exports = Account;