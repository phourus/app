"use strict";
let React = require('react');
let Router = require('react-router');

let Emblem = require('./landing/emblem');
let Convert = require('./landing/convert');
let Explore = require('./landing/explore');
let Features = require('./landing/features');
let Integrate = require('./landing/integrate');


let Landing = React.createClass({
  render: function () {
    return (
      <div className="landing">
        <Slider more={this._more} />
        <Convert />
        <Benefits ref="benefits" />
        <Features />
        <Integrate />
      </div>
    );
  },
  _more: function () {
    React.findDOMNode(this.refs.benefits).scrollIntoView();
  },
});

let Slider = React.createClass({
  mixins: [Router.Navigation],
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
        <div className={classes[0]}>
          <img src="/assets/landing/home.jpg" className="banner" />
          <div className="title">SaaS with a soul</div>
          <p>Get more out of your productivity tools than just productivity.</p>
          <div className="actions">
            <button className="button green" onClick={this._signup}>Start Free Trial</button>
            <button className="button blue inverted" onClick={this.props.more}>Learn More</button>
          </div>
        </div>
      </div>
    );
  },
  _signup: function () {
    this.context.router.transitionTo("account");
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
        <div><br /><br /></div>
        <h2 className="heading">Master Communication & Collaboration</h2>
        <h3 className="subtitle">Take control of the most important part of your business</h3>
        <div className="squeeze">
          <div>
            <div className="left">
              <i className="fa fa-lightbulb-o" />
            </div>
            <span className="title">Surface important content & ideas</span>
            <p>Flatten organizational hierarchies and eliminate the political effect hindering progressive growth.</p>
            <p className="usage">Phourus uses a unique algorithm called Influence that offsets the popularity of individual users to ensure valuable content gets the visibility it deserves, not because of who said it.</p>
          </div>
          <div>
            <div className="left">
              <i className="fa fa-bolt" />
            </div>
            <span className="title">Capture intellectual capital</span>
            <p>Are you capturing the full capabilities of the people you invest significant time and effort recruiting and retaining?</p>
            <p className="usage">Use Subjects & Questions on Phourus to enable Subject Matter Experts (SMEs) to create content in their area of expertise for the benefit of the entire organization.</p>
          </div>
          <div>
            <div className="left">
              <i className="fa fa-language" />
            </div>
            <span className="title">Embrace real culture & diversity</span>
            <p>True culture is not about blue jeans and ping-pong tables. It is about the diverse cultural and socioeconomic backgrounds of each and every employee.</p>
            <p className="usage">Use Beliefs, Debates and other tools of expression built into Phourus to unite and educate a diverse workplace.</p>
          </div>
          <div>
            <div className="left">
              <i className="fa fa-compass" />
            </div>
            <span className="title">Enhance Vision & Engagement</span>
            <p>Each employee of a business has his or her own idea of what your company is and where is it going. The vision and mission of a business should be an ongoing evolution involving employees and customers alike.</p>
            <p className="usage">Use Beliefs and Quotes to better define your mission and objective, while also engaging employees and acknowledging their contribution to the vision of your business.</p>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Landing;
