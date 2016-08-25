"use strict";
let React = require('react');
let { History } = require('react-router');

let Auth = require('./landing/auth');
let Ideas = require('./landing/ideas');
let Information = require('./landing/information');
let Engagement = require('./landing/engagement');
let Feedback = require('./landing/feedback');

let Landing = React.createClass({
  render: function () {
    return (
      <div className="landing">
        <Slider more={this._more} showSignup={this._signup} />
        <Ideas />
        <Information />
        <Engagement />
        <Feedback />
      </div>
    );
  },
  _more: function () {
    React.findDOMNode(this.refs.benefits).scrollIntoView();
  },
  _signup: function () {
    this.refs.auth._showSignup();
  }
});

let Slider = React.createClass({
  mixins: [History],
  getInitialState: function () {
    return {
      slide: 0,
      interval: 5000
    }
  },
  componentDidMount: function () {
    // var self = this;
    // setInterval(function () {
    //   self._next();
    // }, this.state.interval);
  },
  render: function () {
    var classes = ['', '', '', '', ''];
    classes[this.state.slide] = 'selected';
    return (
      <div className="banner">
        <div className="title">Every company has a story</div>
        <p>Make sure you're on the same page</p>
        <Auth ref="auth" />
      </div>
    );
  },
  _next: function () {
    if (this.state.slide === 4) {
      this.setState({slide: 0});
      return;
    }
    this.setState({slide: this.state.slide + 1});
  },
  _green: function () {
    if (this.state.slide === 1) {
      this.setState({slide: 0});
      return;
    }
    this.setState({slide: 1});
  },
  _blue: function () {
    if (this.state.slide === 2) {
      this.setState({slide: 0});
      return;
    }
    this.setState({slide: 2});
  },
  _red: function () {
    if (this.state.slide === 3) {
      this.setState({slide: 0});
      return;
    }
    this.setState({slide: 3});
  },
  _gold: function () {
    if (this.state.slide === 4) {
      this.setState({slide: 0});
      return;
    }
    this.setState({slide: 4});
  }
});

module.exports = Landing;
