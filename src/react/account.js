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
      id: 0,
      img: "",
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
  componentDidMount: function () {
    this.unsubscribe = Store.listen((data) => {
      if (data.user) {
        this.setState(data.user);
      }
    });
    Actions.get();
  },
  componentWillUnmount: function () {
    this.unsubscribe();
  },
  render: function () {
    if (token.get() !== false) {
      return (
        <div className="account">
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
        <br />
        <Link to="update">Edit Account</Link>
        <br />
        <Link to="notifications">My Notifications</Link>
        <br />
        <Link to="history">My History</Link>
        <br />
        <a href="javascript:void(0)" onClick={this._logout}>Logout</a>
        <br />
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
        <Link to="userPosts" params={{id: this.props.id}}>{this.props.username}</Link>
        <div><strong>Full Name:</strong> {this.props.first} {this.props.last}</div>
        <div>{(this.props.address.city) ? this.props.address.city + ', ' : ''} {this.props.address.state || ''}</div>
        <div><Link to="myPosts">View my Posts</Link></div>
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
        <Details {...this.props} />
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
    return (
      <div className="info">
        <h3>Basic Information</h3>
        <div id="user_basic">
          <label>Username
            <input ref="username" className="username" type="text" value={this.props.username} disabled="true" />
          </label>
          <label>First
            <input ref="first" className="first" type="text" value={this.props.first} onChange={this._change} />
          </label>
          <label>Last
          <input ref="last" className="last" type="text" value={this.props.last} onChange={this._change} />
          </label>
          <label>Email
            <input ref="email" className="email" type="text" value={this.props.email} onChange={this._change} />
          </label>
          <label>Phone
            <input ref="phone" className="phone" type="text" value={this.props.phone} onChange={this._change} />
          </label>
        </div>
        <button className="button green" onClick={this.props.save}>Save Changes</button>
      </div>
    );
  }
});

let Details = React.createClass({
  render: function () {
    return (
      <div className="details">
        <h3>Details</h3>
        <div id="user_detail">
          <label>Company
            <input ref="company" className="company" type="text" value={this.props.company} onChange={this.props.change} />
          </label>
          <label>Occupation
            <input ref="occupation" className="occupation" type="text" value={this.props.occupation} onChange={this.props.change} />
          </label>
          <label>Website
            <input ref="website" className="website" type="text" value={this.props.website} onChange={this.props.change} />
          </label>
          <label>Date of Birth
            <input ref="dob" className="dob" type="datetime" value={this.props.dob} onChange={this.props.change} />
          </label>
          <label>Gender
            <select ref="gender" className="gender" value={this.props.gender} onChange={this.props.change}>
              <option value="">Private</option>
              <option value="F">Female</option>
              <option value="M">Male</option>
            </select>
          </label>
        </div>
        <button className="button green" onClick={this.props.save}>Save Changes</button>
      </div>
    );
  }
});

let Address = React.createClass({
  render: function () {
    return (
      <div>
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

Account.Notifications = React.createClass({
  getInitialState: function () {
    return {
      notifications: []
    }
  },
  componentDidMount: function () {
    this.unsubscribe = Store.listen((data) => {
      this.setState(data);
    });
    Actions.notifications();
  },
  componentWillUnmount: function () {
    this.unsubscribe();
  },
  render: function () {
    let views = this.state.notifications[0] || [];
    let comments = this.state.notifications[1] || [];
    let thumbs = this.state.notifications[2] || [];

    views = views.map(function (item) {
      return <li key={item.id}><img src={`/assets/avatars/${item.viewer.img}.jpg`} /><a href={`/user/${item.viewer.id}`}>{item.viewer.username}</a> viewed your profile</li>;
    });
    comments = comments.map(function (item) {
      return (
        <li key={item.id}><img src={`/assets/avatars/${item.user.img}.jpg`} />
          <a href={`/user/${item.userId}`}>{item.user.username}</a> commented on your post
          <a href={`/post/${item.post.id}`}>{` \"${item.post.title}\"`}</a>
        </li>
      );
    });
    thumbs = thumbs.map(function (item) {
      return (
        <li key={item.id}><img src={`/assets/avatars/${item.user.img}.jpg`} />
          <a href={`/user/${item.user.id}`}>{item.user.username}</a> {(item.positive) ? "dis": ""} liked your post
          <a href={`/post/${item.post.id}`}>{` \"${item.post.title}\"`}</a>
        </li>
      );
    });
    return (<div><h3>Notifications</h3><ul>{views}</ul><ul>{comments}</ul><ul>{thumbs}</ul></div>);
  }
});

Account.History = React.createClass({
  getInitialState: function () {
    return {
      history: []
    }
  },
  componentDidMount: function () {
    this.unsubscribe = Store.listen((data) => {
      this.setState(data);
    });
    Actions.history();
  },
  componentWillUnmount: function () {
    this.unsubscribe();
  },
  render: function () {
    let views = this.state.history[0] || [];
    let comments = this.state.history[1] || [];
    let thumbs = this.state.history[2] || [];

    views = views.map(function (item) {
      return <li key={item.id}><img src={"/assets/avatars/1.jpg"} /><i className="fa fa-eye" />You viewed<a href={"/user/"}></a></li>;
    });
    comments = comments.map(function (item) {
      return (
        <li key={item.id}><img src={`/assets/avatars/${item.post.user.img}.jpg`} /><i className="fa fa-comment" /> You commented on
          <a href={"/post/" + item.post.id}>{" \"" + item.post.title + "\""}</a> by
          <a href={`/user/${item.post.user.id}`}> {item.post.user.username}</a>
        </li>
      );
    });
    thumbs = thumbs.map(function (item) {
      return (
        <li key={item.id}><img src={`/assets/avatars/${item.post.user.img}.jpg`} /><i className="fa fa-thumb" /> You {(item.positive) ? "dis": ""}liked
          <a href={`/post/${item.post.id}`}>{` \"${item.post.title}\"`}</a> by
          <a href={`/user/${item.post.user.id}`}> {item.post.user.username}</a>
        </li>
      );
    });
    return (<div><h3>History</h3><ul>{views}</ul><ul>{comments}</ul><ul>{thumbs}</ul></div>);
  }
});

module.exports = Account;
