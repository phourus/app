"use strict";
let React = require('react');
let Router = require('react-router');

let Emblem = require('./landing/emblem');
let Convert = require('./landing/convert');
let Explore = require('./landing/explore');
let Features = require('./landing/features');
let Integrate = require('./landing/integrate');
let Video = require('./landing/video');

let Landing = React.createClass({
  render: function () {
    return (
      <div className="landing">
        <Slider />
        <Convert />
        <Explore />
        <Features />
        <Compete />
        <Integrate />
      </div>
    );
  }
});

let Slider = React.createClass({
  getInitialState: function () {
    return {
      slide: 0,
      interval: 5000
    }
  },
  componentDidMount: function () {
    var self = this;
    setInterval(function () {
      self._next();
    }, this.state.interval);
  },
  render: function () {
    var classes = ['', '', '', '', ''];
    classes[this.state.slide] = 'selected';
    return (
      <div className="slider">
        <Emblem slide={this.state.slide} green={this._green} blue={this._blue} red={this._red} gold={this._gold} />
        <div className={classes[0]}>
          <img src="/assets/landing/home.jpg" className="banner" />
          <div className="title">The Pursuit of Truth</div>
          <p>Phourus is about the Pursuit of Truth across the 4 Elements of Society.</p>
        </div>
        <div className={classes[1]}>
          <img src="/assets/landing/world.jpg" className="banner" />
          <div className="title">Economy & Environment</div>
          <p>The balance between Economy & Environment is vital to the health & prosperity of a nation and it's people.</p>
        </div>
        <div className={classes[2]}>
          <img src="/assets/landing/mind.jpg" className="banner" />
          <div className="title">Knowledge & Education</div>
          <p>An educated culture is one that can make effective decisions that improve the lives of many.</p>
        </div>
        <div className={classes[3]}>
          <img src="/assets/landing/voice.jpg" className="banner" />
          <div className="title">Government & Politics</div>
          <p>Government exists to protect and serve, not to hinder or limit a society.</p>
        </div>
        <div className={classes[4]}>
          <img src="/assets/landing/self.jpg" className="banner" />
          <div className="title">Beliefs & Religion</div>
          <p>Understanding who we are as individuals and why we exist in a vast universe of empty space.</p>
        </div>
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

let Compete = React.createClass({
  render: function () {
    return (
      <div className="compete">
        <h2 className="heading">Compete</h2>
        <div className="squeeze">
          <div>
            <i className="fa fa-users" /><br />
            Engage users
          </div>
          <div>
            <i className="fa fa-bolt" /><br />
            Earn Influence points
          </div>
          <div>
            <i className="fa fa-line-chart" /><br />
            Rise in rankings
          </div>
          <div>
            <i className="fa fa-trophy" /><br />
            Become a Leader
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Landing;
