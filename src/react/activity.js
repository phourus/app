"use strict";
let React = require('react');
let Router = require('react-router');
let { RouteHandler, Link } = Router;
let Store = require('../stores/account');
let Actions = require('../actions/account');
let token = require('../token');
let View401 = require('./401');
let moment = require('moment');

let Activity = React.createClass({
  componentDidMount: function () {
    this.unsubscribe = Store.listen((data) => {
      this.setState({user: data.user, notifications: data.notifications, history: data.history});
    });
    Actions.get();
  },
  componentWillUnmount: function () {
    this.unsubscribe();
  },
  render: function () {
    if (Store.authenticated === true) {
      return (
        <div className="activity">
          <Link to="account" className="button gold toggle"><i className="fa fa-gear" /> My Account</Link>
          <h1>My Activity</h1>
          <Notifications />
          <History />
        </div>
      );
    } else {
      return (
        <View401 />
      );
    }
  }
});

let Notifications = React.createClass({
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

let History = React.createClass({
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

module.exports = Activity;
