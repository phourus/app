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
        <Benefits />
        <Features />
        <Video />
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
    // var self = this;
    // setInterval(function () {
    //   self._next();
    // }, this.state.interval);
  },
  render: function () {
    var classes = ['', '', '', '', ''];
    classes[this.state.slide] = 'selected';
    return (
      <div className="slider">
        <div className={classes[0]}>
          <img src="/assets/landing/world.jpg" className="banner" />
          <div className="title">SaaS with a soul</div>
          <p>Get more out of your productivity tools than just productivity.</p>
        </div>
        <button className="button green">Start Free Trial</button>
        <button className="button blue inverted">Learn More</button>
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

let Benefits = React.createClass({
  render: function () {
    return (
      <div className="benefits">
        <h2 className="heading">Master Communication & Collaboration within your business</h2>
        <div className="squeeze">
          <div>
            <i className="fa fa-lightbulb-o" /><br />
            Surface important content & ideas
            <p>Flatten organizational hierarchies and eliminate the political effect hindering progressive growth.</p>
            <p>Phourus uses a unique algorithm called Influence that offset's the popularity of individual users to ensure valuable content gets the visibility it deserves, not because of who said it.</p>
          </div>
          <div>
            <i className="fa fa-bolt" /><br />
            Capture intellectual capital
            <p>Are you capturing the full capabilities of those you invest significant time and effort recruiting and retaining?</p>
            <p>Use Subjects & Questions on Phourus to enable Subject Matter Experts (SMEs) to create content in their area of expertise for the benefit of the entire organization.</p>
          </div>
          <div>
            <i className="fa fa-language" /><br />
            Embrace real culture & diversity
            <p>True culture is not about blue jeans and ping-pong tables. It is about the diverse cultural and socioeconomic backgrounds of each and every employee in a global marketplace.</p>
            <p>Use Beliefs, Debates and other tools of expression built into Phourus in order to unite and educate a diverse workplace.</p>
          </div>
          <div>
            <i className="fa fa-compass" /><br />
            Enhance Vision & Engagement
            <p>Each employee of a business has his or her own idea of what your company is and where is it going. The vision and mission of a business should be an ongoing evolution involving employees and customers alike.</p>
            <p>Use Beliefs and Quotes to better define your mission and objective, while also engaging employees and acknowledging their contribution to the vision of your business.</p>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Landing;
