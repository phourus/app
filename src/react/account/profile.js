"use strict";
let React = require('react');
let Router = require('react-router');
let { Link } = Router;

let Actions = require('../actions/account');

module.exports = React.createClass({
  render: function () {
    //<Link href="/account/password">Change my password</Link>
    return (
      <div className="profile">
        <div><Link to="myPosts">View my Posts</Link></div>
        <div><Link to="activity">View my Activity</Link></div>
        <div><a href="javascript:void(0)">View my Profile</a></div>
        <div><a href="javascript:void(0)">View my Stats</a></div>
        <br />
        <div><a href="javascript:void(0)" onClick={this._logout}>Logout</a></div>
      </div>
    );
  },
  _logout: function () {
    Actions.logout();
  }
});
