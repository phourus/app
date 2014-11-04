"use strict";
/** PROFILE **/
// Pic, Stats, Game, Contact

/** VIEWS **/
// History, Notifications, Groups, Org Accounts
if (typeof module !== 'undefined' && module.exports) {
    var React = require('react');
}
/**
* @jsx React.DOM
*/
var Account = React.createClass({
     render: function () {
          return (
            <div>
                <PicUploader />
                <Info />
                <Details />
                <Address />
                <Social />
                <Password />  
            </div>
          );
     }
});

var PicUploader = React.createClass({
    render: function () {
        return (
            <div>   
                <h3>Photo Upload</h3>
                <div class="pic">
                    <img src="{this.props.pic}" onerror="this.src='/assets/pics/default.png'" height="200" />
                </div>
                <form action="/rest/pic/{this.props.id}" method="post" enctype="multipart/form-data" target="upload">
                  <input type="file" name="pic" id="pic" />
                  <input type="hidden" name="type" value="user" />
                  <input type="submit" name="submit" value="Upload" class="button blue" />
                </form>
                <iframe id="message" />
            </div>
        );
    }    
});

var Info = React.createClass({
    render: function () {
        return (
          <div>
            <h3>My Basic Info</h3>
            <div id="user_basic"></div>
            <button id="save_basic" class="button green save">Save Info</button>
          </div>
        );
    }    
});

var Details = React.createClass({
    render: function () {
        return (
          <div>
            <h3>My Details</h3>
            <div id="user_detail"></div>
            <button id="save_detail" class="button green save">Save Info</button>
          </div>
        );
    }    
});

var Address = React.createClass({
    render: function () {
        return (
          <div>
            <h3>My Address</h3>
            <div id="user_address"></div>
            <button id="save_address" class="button green save">Save Info</button>
          </div>
        );
    }    
});

var Social = React.createClass({
    render: function () {
        return (
          <div id="social">
            <h3>Verify Social Accounts</h3>
            <button id="facebook" class="social"></button> 
            <button id="linkedin" class="social"></button>
            <button id="linkedin" class="social"></button>
            <button id="google" class="social"></button>
          </div>
        );
    }    
});

var Password = React.createClass({
    render: function () {
        return (
          <div id="password">
            <h3>Change Password</h3>
            <div id="user_password"></div>
            <button id="save_password" class="button green save">Save Info</button>
          </div>
        );
    }    
});
  
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Account;
} else{
    var cnt = document.getElementById('content');
    React.renderComponent(Account({}), cnt);
}
