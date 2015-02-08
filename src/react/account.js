/** @jsx React.DOM */
"use strict";
var React = require('react');
var Router = require('react-router-component');
var Link = Router.Link;
var NavigatableMixin = Router.NavigatableMixin;
var account = require('../objects/account');
var token = require('../token');
var View401 = require('./401');

var Account = React.createClass({
     mixins: [NavigatableMixin],
     save: function () {
        account.edit(this.props.user);
     },
     change: function (e) { 
		var user = this.props.user;
		user[e.target.className] = e.currentTarget.value;
        this.props.update('account', {user: user});
     },
     componentDidMount: function () {
		var self = this;
		var update = this.props.update;
         account.on('returnGet', function (code, data) {
             if (code != 200) {
                 self.props.update("alert", {type: "yellow", msg: 'account could not be loaded', code: code}); 
                 return;
             }
             self.props.update('account', data);
         });
         account.on('returnEdit', function (code, data) {
            if (code == 204) {
                self.props.update("alert", {type: "green", msg: 'account updated', code: code}); 
            } else {
                self.props.update("alert", {type: "red", msg: 'account could not be updated', code: code});
            }
         });
         account.on('returnPassword', function (code, data) {
            if (code == 204) {
                self.props.update("alert", {type: "green", msg: 'password updated', code: code}); 
            } else {
                self.props.update("alert", {type: "red", msg: 'password could not be updated', code: code});
            }
         });
         account.on('returnDeactivate', function (code, data) {
            if (code == 202) {
                self.props.update("alert", {type: "green", msg: 'account deactivated', code: code}); 
            } else {
                self.props.update("alert", {type: "red", msg: 'account could not be deactivated', code: code});
            }
         });
         account.get();
	 },
     deactivate: function () {
       account.deactivate();  
     },
     logout: function () {
	    token.remove()
	    this.forceUpdate();
	 },
	 history: function () {
    	 this.navigate('/account/history');
	 },
	 notifications: function () {
    	 this.navigate('/account');
	 },
     render: function () { 
        var button, view, password;
        button = <button className="button blue" onClick={this.history}>View History</button>;
        view = <Notifications {...this.props} />;
        console.log(this.props._);
        if (this.props._[0] == 'history') {
            button = <button className="button blue" onClick={this.notifications}>View Notifications</button>;
            view = <History {...this.props} />;
        }
        if (this.props._[0] == 'password') {
            view = '';
            button = '';
            password = <Password />;
        }
        
        if (token.get() !== false) {
            return (
                <div>
                    <PicUploader pic={this.props.user.pic} id={this.props.user.id} />
                    <Link href="/account/password">Change my password</Link>
                    <br />
                    <a onClick={this.logout}>Logout</a>
                    <br />
                    <Info {...this.props.user} change={this.change} />
                    <Details {...this.props.user} change={this.change} />
                    <button className="button green save" onClick={this.save}>Save Info</button>
                    {password}
                    {button}
                    {view}      
                </div>
            );
        } else {
            return (
                <View401 update={this.props.update} force={this.force} />
            );
        } 
     }
});

//                     <Address {...this.props} change={this.change} />
var PicUploader = React.createClass({
    render: function () {
        // <input type="submit" ref="submit" value="Upload" className="button blue" />
        return (
            <div>   
                <h3>Photo Upload</h3>
                <div className="pic">
                    <img src="{this.props.pic}" onerror="this.src='/assets/pics/default.png'" height="200" />
                </div>
                <form action="/rest/pic/{this.props.id}" method="post" encType="multipart/form-data" target="upload">
                  <input type="file" ref="pic" id="pic" />
                  <input type="hidden" ref="type" value="user" />
                  
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
                <label>Username</label>
                <input ref="username" className="username" type="text" value={this.props.username} disabled="true" />
                <br />
                <label>First</label>
                <input ref="first" className="first" type="text" value={this.props.first} onChange={this.props.change} />
                <br />
                <label>Last</label>
                <input ref="last" className="last" type="text" value={this.props.last} onChange={this.props.change} />
                <br />
                <label>Email</label>
                <input ref="email" className="email" type="text" value={this.props.email} onChange={this.props.change} />
                <br />
                <label>Phone</label>
                <input ref="phone" className="phone" type="text" value={this.props.phone} onChange={this.props.change} /> 
                <br />
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
                <label>Company</label>
                <input ref="company" className="company" type="text" value={this.props.company} onChange={this.props.change} />
                <br />
                <label>Occupation</label>
                <input ref="occupation" className="occupation" type="text" value={this.props.occupation} onChange={this.props.change} />
                <br />
                <label>Website</label>
                <input ref="website" className="website" type="text" value={this.props.website} onChange={this.props.change} />
                <br />
                <label>Date of Birth</label>
                <input ref="dob" className="dob" type="datetime" value={this.props.dob} onChange={this.props.change} />
                <br />
                <label>Gender</label>
                <select ref="gender" className="gender" value={this.props.gender} onChange={this.props.change}>
                    <option value="">Private</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                </select>
                <br />
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
                <label>Street</label>
                <input ref="street" className="street" type="text" value={this.props.address.street} onChange={this.props.change} />
                <label>Zip</label>
                <input ref="zip" className="zip" type="text" value={this.props.address.zip} onChange={this.props.change} />
                <label>City</label>
                <input ref="city" className="city" type="text" value={this.props.address.city} onChange={this.props.change} />
                <label>State</label>
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

var Notifications = React.createClass({
    componentDidMount: function () {
        var self = this;
        account.on('returnNotifications', function (code, data) {
             if (code != 200) {
                self.props.update("alert", {type: "yellow", msg: 'notifications could not be loaded', code: code}); 
                return;
             }
             self.props.update("account", {notifications: data});
         });
         account.notifications({});
    },
    render: function () {
        var views = this.props.notifications[0] || [];
        var comments = this.props.notifications[1] || [];
        var thumbs = this.props.notifications[2] || [];
        
        views = views.map(function (item) {
           return <li>A <a href={"/user/" + item.viewer_id}>user</a> viewed your profile</li>;
        });
        comments = comments.map(function (item) {
           return <li>A <a href={"/user/" + item.user_id}>user</a> commented on your 
                <a href={"/post/" + item.post_id}>post</a>
            </li>;
        });
        thumbs = thumbs.map(function (item) {
           return <li>A <a href={"/user/" + item.user_id}>user</a> {(item.positive) ? "dis": ""}liked your 
                <a href={"/post/" + item.post_id}>post</a>
            </li>;
        });
        return (<div><h3>Notifications</h3><ul>{views}</ul><ul>{comments}</ul><ul>{thumbs}</ul></div>);
    }
});

var History = React.createClass({
    componentDidMount: function () {
        var self = this;
        account.on('returnHistory', function (code, data) {
             if (code != 200) {
                self.props.update("alert", {type: "yellow", msg: 'history could not be loaded', code: code}); 
                return;
             }
             self.props.update("account", {history: data});
         });
         account.history({});
    },
    render: function () {
        var views = this.props.history[0] || [];
        var comments = this.props.history[1] || [];
        var thumbs = this.props.history[2] || [];
        
        views = views.map(function (item) {
           return <li>A <a href={"/user/" + item.viewer_id}>user</a> viewed your profile</li>;
        });
        comments = comments.map(function (item) {
           return <li>You commented on your a 
                <a href={"/user/" + item.user_id}>users</a> 
                <a href={"/post/" + item.post_id}>post</a>
            </li>;
        });
        thumbs = thumbs.map(function (item) {
           return <li>You {(item.positive) ? "dis": ""}liked a
                <a href={"/user/" + item.user_id}>users</a>  
                <a href={"/post/" + item.post_id}>post</a>
            </li>;
        });
        return (<div><h3>History</h3><ul>{views}</ul><ul>{comments}</ul><ul>{thumbs}</ul></div>);

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