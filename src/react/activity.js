"use strict";
let React = require('react');
let Router = require('react-router');
let { RouteHandler, Link, State } = Router;
let Store = require('../stores/account');
let Actions = require('../actions/account');
let token = require('../token');
let Login = require('./auth/login');
let moment = require('moment');

let Activity = React.createClass({
  mixins: [State],
  getInitialState: function () {
    return {
      selected: "notifications"
    }
  },
  componentDidMount: function () {
    this.unsubscribe = Store.listen((data) => {
      this.setState({user: data.user, notifications: data.notifications, history: data.history});
    });
    Actions.get();
    this._route();
  },
  componentWillUnmount: function () {
    this.unsubscribe();
  },
  componentWillReceiveProps: function () {
    this._route();
  },
  render: function () {
    if (Store.authenticated === true) {
      return (
        <div className="activity">
          <div className="toggle">
            <h3><Link to="notifications">Notifications</Link> | <Link to="history">History</Link></h3>
          </div>
          <Notifications selected={this.state.selected} />
          <History selected={this.state.selected} />
        </div>
      );
    } else {
      return (
        <Login />
      );
    }
  },
  _route: function () {
    let route = this.context.router.getCurrentRoutes();
    if (route[1].name === 'history') {
      this.setState({selected: 'history'});
    } else {
      this.setState({selected: 'notifications'});
    }
  }
});

let Notifications = React.createClass({
  getInitialState: function () {
    return {
      notifications: [],
      mode: 'comments'
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
      //<img src={`/assets/avatars/${item.viewer.img}.jpg`} />
      return (<li key={item.id}>
        <i className="fa fa-eye" />
        <a href={`/user/${item.viewer.id}`}>{item.viewer.username}</a> viewed your profile
        <span className="date"> {moment(item.createdAt).fromNow()}</span>
      </li>)
    });
    comments = comments.map(function (item) {
      //<img src={`/assets/avatars/${item.user.img}.jpg`} />
      return (
        <li key={item.id}>
          <i className="fa fa-comment" />
          <a href={`/user/${item.userId}`}>{item.user.username}</a> commented on your post
          <a href={`/post/${item.post.id}`}>{` \"${item.post.title}\"`}</a>
          <span className="date"> {moment(item.createdAt).fromNow()}</span>
        </li>
      );
    });
    thumbs = thumbs.map(function (item) {
      // <img src={`/assets/avatars/${item.user.img}.jpg`} />
      return (
        <li key={item.id}>
          <i className={(item.positive) ? "fa fa-arrow-up green": "fa fa-arrow-down red"} />
          <a href={`/user/${item.user.id}`}>{item.user.username}</a> {(item.positive) ? "": "dis"}liked your post
          <a href={`/post/${item.post.id}`}>{` \"${item.post.title}\"`}</a>
          <span className="date"> {moment(item.createdAt).fromNow()}</span>
        </li>
      );
    });
    return (<div className={this.props.selected === 'history' ? "notifications" : "notifications selected"}>
      <h3>Notifications</h3>
      <div className="tabs">
        <div onMouseOver={this._comments}><div>{comments.length}</div>Comments</div>
        <div onMouseOver={this._thumbs}><div>{thumbs.length}</div>Thumbs</div>
        <div onMouseOver={this._views}><div>{views.length}</div>Views</div>
      </div>
      {this.state.mode === 'comments' ? <ul>{comments}</ul> : false}
      {this.state.mode === 'thumbs' ? <ul>{thumbs}</ul> : false}
      {this.state.mode === 'views' ? <ul>{views}</ul> : false}
    </div>);
  },
  _comments: function () {
    this.setState({mode: 'comments'});
  },
  _thumbs: function () {
    this.setState({mode: 'thumbs'});
  },
  _views: function () {
    this.setState({mode: 'views'});
  }
});

let History = React.createClass({
  getInitialState: function () {
    return {
      mode: 'comments',
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
      // <img src={"/assets/avatars/1.jpg"} />
      var user = item.user || {};
      return (<li key={item.id}>
        <i className="fa fa-eye" />
        You viewed <a href={"/user/"}>{user.username + "'s"}</a> profile
        <span className="date"> {moment(item.createdAt).fromNow()}</span>
      </li>)
    });
    comments = comments.map(function (item) {
      // <img src={`/assets/avatars/${item.post.user.img}.jpg`} />
      return (
        <li key={item.id}>
          <i className="fa fa-comment" /> You commented on
          <a href={"/post/" + item.post.id}>{" \"" + item.post.title + "\""}</a> by
          <a href={`/user/${item.post.user.id}`}> {item.post.user.username}</a>
          <span className="date"> {moment(item.createdAt).fromNow()}</span>
        </li>
      );
    });
    thumbs = thumbs.map(function (item) {
      // <img src={`/assets/avatars/${item.post.user.img}.jpg`} />
      return (
        <li key={item.id}>
          <i className={item.positive ? "fa fa-arrow-up green" : "fa fa-arrow-down red"} /> You {(item.positive) ? "": "dis"}liked
          <a href={`/post/${item.post.id}`}>{` \"${item.post.title}\"`}</a> by
          <a href={`/user/${item.post.user.id}`}> {item.post.user.username}</a>
          <span className="date"> {moment(item.createdAt).fromNow()}</span>
        </li>
      );
    });
    return (
      <div className={this.props.selected === 'history' ? "history selected" : "history"}>
        <h3>History</h3>
          <div className="tabs">
            <div onMouseOver={this._comments}><div>{comments.length}</div>Comments</div>
            <div onMouseOver={this._thumbs}><div>{thumbs.length}</div>Thumbs</div>
            <div onMouseOver={this._views}><div>{views.length}</div>Views</div>
          </div>
          {this.state.mode === 'comments' ? <ul>{comments}</ul> : false}
          {this.state.mode === 'thumbs' ? <ul>{thumbs}</ul> : false}
          {this.state.mode === 'views' ? <ul>{views}</ul> : false}
      </div>);
  },
  _comments: function () {
    this.setState({mode: 'comments'});
  },
  _thumbs: function () {
    this.setState({mode: 'thumbs'});
  },
  _views: function () {
    this.setState({mode: 'views'});
  }
});

module.exports = Activity;
