"use strict";
let React = require('react');
let Router = require('react-router');
let { RouteHandler, Link } = Router;
let Store = require('../stores/account');
let Actions = require('../actions/account');
let token = require('../token');
let View401 = require('./401');
let moment = require('moment');

let Account = React.createClass({
  getInitialState: function () {
    return {
      user: {},
      changes: {},
      address: {}
    }
  },
  componentDidMount: function () {
    this.unsubscribe = Store.listen((data) => {
      this.setState(data);
    });
    Actions.get();
  },
  componentWillUnmount: function () {
    this.unsubscribe();
  },
  render: function () {
    if (Store.authenticated === true) {
      return (
        <div className="account">
          <Link to="activity" className="button gold toggle"><i className="fa fa-bell" /> My Activity</Link>
          <h1>My Account</h1>
          <div className="heading">
            <Pic {...this.state} />
            <Profile {...this.state} />
            <Orgs />
          </div>
          <RouteHandler {...this.state} save={this._save} change={this._change} />
        </div>
      );
    } else {
      return (
        <View401 />
      );
    }
  },
  _save: function () {
    Actions.edit(this.state);
  },
  _change: function (e) {
    let user = this.state;
    user[e.target.className] = e.target.value;
    this.setState(user);
  },
});

let Pic = React.createClass({
  render: function () {
    //<Link href="/account/password">Change my password</Link>
    return (
      <div className="pic">
        <img src={`/assets/avatars/${this.props.img || 'default'}.jpg`} />
      </div>
    );
  },
  _logout: function () {
    Actions.logout();
  }
});

let Profile = React.createClass({
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
  }
});

let Orgs = React.createClass({
  mixins: [Router.Navigation],
  getInitialState: function () {
    return {
      orgs: []
    }
  },
  componentDidMount: function () {
    this.unsubscribe = Store.listen((data) => {
      if (data.orgs) {
        this.setState({orgs: data.orgs});
      }
    });
    Actions.orgs();
  },
  componentWillUnmount: function () {
    this.unsubscribe();
  },
  render: function () {
    return (
      <div className="orgs">
        <h4>My Organizations</h4>
        {this.state.orgs.map((item) => {
          var admin = false;
          if (item.admin === true) {
            admin = <button id={item.org.id} className="button blue" onClick={this._edit}>Admin</button>
          }
          return (
            <div className="org">
              <Link to="orgPosts" params={{id: item.org.id}}>{item.org.name}</Link> <a href="javascript:void(0)" id={item.id} className="remove" onClick={this._remove}>Remove Me</a> {admin}
            </div>
          );
        })}
      </div>
    );
  },
  _edit: function (e) {
    var id = e.currentTarget.id;
    this.context.router.transitionTo('details', {id: id});
  },
  _remove: function (e) {
    var id = e.currentTarget.id;
    console.warn('remove org' + id);
  }
});

Account.Edit = React.createClass({
  render: function () {
    return (
      <div className="update">
        <Info {...this.props} />
        <Address {...this.props} />
      </div>
    );
  }
});

let Uploader = React.createClass({
  render: function () {
    return (
      <div className="uploader">
        <h3>Profile Picture</h3>
        <img src={`/assets/avatars/${this.props.img}.jpg`} height="200" />
        <form action={`/rest/pic/${this.props.id}`} method="post" encType="multipart/form-data" target="upload">
          <input type="file" ref="pic" id="pic" />
          <input type="hidden" ref="type" value="user" />
        </form>
      </div>
    );
  }
});

let Info = React.createClass({
  render: function () {
    let account = this.props.user;
    Object.keys(this.props.changes).forEach((key) => {
      account[key] = this.props.changes[key];
    });
    return (
      <div className="info">
        <h3>Basic Information</h3>
        <div id="user_basic">
          <label>Username
            <input ref="username" className="username" type="text" value={account.username} disabled="true" />
          </label>
          <label>Email
            <input ref="email" className="email" type="text" value={account.email} onChange={this._email} />
          </label>
          <label>First
            <input ref="first" className="first" type="text" value={account.first} onChange={this._first} />
          </label>
          <label>Last
          <input ref="last" className="last" type="text" value={account.last} onChange={this._last} />
          </label>
          <label>Phone
            <input ref="phone" className="phone" type="text" value={account.phone} onChange={this._phone} />
          </label>
          <label>Company
            <input ref="company" className="company" type="text" value={account.company} onChange={this._company} />
          </label>
          <label>Occupation
            <input ref="occupation" className="occupation" type="text" value={account.occupation} onChange={this._occupation} />
          </label>
          <label>Website
            <input ref="website" className="website" type="text" value={account.website} onChange={this._website} />
          </label>
          <label>Date of Birth
            <input ref="dob" className="dob" type="datetime" value={account.dob} onChange={this._dob} />
          </label>
          <label>Gender
            <select ref="gender" className="gender" value={account.gender} onChange={this._gender}>
              <option value="">Private</option>
              <option value="F">Female</option>
              <option value="M">Male</option>
            </select>
          </label>
        </div>
        <button className="button green" onClick={this._save}>Save Changes</button>
      </div>
    );
  },
  _first: function (e) { Actions.change('first', e.currentTarget.value); },
  _last: function (e) { Actions.change('last', e.currentTarget.value); },
  _phone: function (e) { Actions.change('phone', e.currentTarget.value); },
  _company: function (e) { Actions.change('company', e.currentTarget.value); },
  _occupation: function (e) { Actions.change('occupation', e.currentTarget.value); },
  _website: function (e) { Actions.change('website', e.currentTarget.value); },
  _dob: function (e) { Actions.change('dob', e.currentTarget.value); },
  _gender: function (e) { Actions.change('gender', e.currentTarget.value); },
  _save: function () {
    Actions.edit();
  }
});

let Address = React.createClass({
  render: function () {
    return (
      <div className="address">
        <h3>My Address</h3>
        <div id="user_address">
          <label>Street
            <input ref="street" className="street" type="text" value={this.props.address.street} onChange={this.props.change} />
          </label>
          <label>Zip
            <input ref="zip" className="zip" type="text" value={this.props.address.zip} onChange={this.props.change} />
          </label>
          <label>City
            <input ref="city" className="city" type="text" value={this.props.address.city} onChange={this.props.change} />
          </label>
          <label>State
            <input ref="state" className="state" type="text" value={this.props.address.state} onChange={this.props.change} />
          </label>
        </div>
        <button className="button green">Save Address</button>
      </div>
    );
  }
});

let Social = React.createClass({
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

Account.Password = React.createClass({
  getInitialState: function () {
    return {
        current: "",
        new: "",
        confirm: ""
    }
  },
  render: function () {
    let match = (this.state.new === this.state.confirm);
    return (
      <div id="password">
        <h3>Change Password</h3>
        <div id="user_password" type="password">
          <label>
            Current Password
            <input placeholder="current password" value={this.state.password} onChange={this._changePassword} type="password" />
          </label>
          <label>
            New Password
            <input placeholder="set new password" value={this.state.new} onChange={this._changeNew} type="password" />
          </label>
          <label className={match ? "" : "error"}>
            Confirm New Password&nbsp;
            {match ? "" : <span className="error">This field should match your new password</span>}
            <input placeholder="confirm new password" value={this.state.confirm} onChange={this._changeConfirm} type="password" />
          </label>
        </div>
        <button id="save_password" className="button green save" onClick={this._submit} disabled={!match}>Update Password</button>
      </div>
    );
  },
  _changeCurrent: function (e) {
    let value = e.currentTarget.value;
    this.setState({current: value});
  },
  _changeNew: function (e) {
    let value = e.currentTarget.value;
    this.setState({new: value});
  },
  _changeConfirm: function (e) {
    let value = e.currentTarget.value;
    this.setState({confirm: value});
  },
  _submit: function () {
    if (this.state.new !== this.state.confirm) {
      // alert user
      return;
    }
    Actions.changePassword();
  }
});

module.exports = Account;
