"use strict";
let React = require('react');
let Router = require('react-router');
let Link = Router.Link;
let Store = require('../stores/search');
let Actions = require('../actions/search');
let Post = require('./post');
let Emblem = require('./emblem');

let Landing = React.createClass({
  render: function () {
    return (
      <div className="landing">
        <Slider />
        <Convert />
        <Explore />
        <Create />
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

let Convert = React.createClass({
  render: function () {
    return (
      <div className="convert">
        <div>
          <input placeholder="email" />
          <button className="button green">Sign Up Now</button>
          Already registered? <Link to="account">Login here</Link>.
        </div>
      </div>
    );
  }
});

let Explore = React.createClass({
  render: function () {
    return (
      <div className="explore">
        <h2>Explore</h2>
        <p>view our stream of top-rated content</p>
        <Explorer />
      </div>
    );
  }
});

let Explorer = React.createClass({
  mixins: [Router.State],
  getInitialState: function () {
    return {
      posts: []
    }
  },
  componentDidMount: function () {
    this.unsubscribe = Store.listen((data) => {
      this.setState(data);
    });
    Actions.collection();
  },
  render: function () {
    let data = this.state.posts.slice(0, 5);
    let posts = [];

    posts = data.map((item, i) => {
       let location = {};
       //let selected = (item.id === this.props.selected);
       if (item.user.locations && item.user.locations.length > 0) {
           location = item.user.locations[0];
       }
       return <Post key={item.id} post={item} user={item.user} location={location} scroll={this.props.scroll} />;
    });
    return (
      <div className="explorer">
        <div className="posts">{posts}</div>
        <button className="button blue" style={{margin: 'auto'}} onClick={this._more}>See More</button>
      </div>
    );
  },
  _more: function () {
    this.context.router.transitionTo('search');
  }
});

let Create = React.createClass({
  render: function () {
    return (
      <div className="create">
        <h2>Create</h2>
        <div className="squeeze">
          <div>
            <i className="fa fa-laptop" /><br />
            Blogs
          </div>
          <div>
            <i className="fa fa-calendar" /><br />
            Events
          </div>
          <div>
            <i className="fa fa-puzzle-piece" /><br />
            Subjects
          </div>
          <div>
            <i className="fa fa-question" /><br />
            Questions
          </div>
          <div>
            <i className="fa fa-bullhorn" /><br />
            Debates
          </div>
          <div>
            <i className="fa fa-line-chart" /><br />
            Polls
          </div>
          <div>
            <i className="fa fa-road" /><br />
            Beliefs
          </div>
          <div>
            <i className="fa fa-quote-right" /><br />
            Quotes
          </div>
        </div>
      </div>
    );
  }
});

let Compete = React.createClass({
  render: function () {
    return (
      <div className="compete">
        <h2>Compete</h2>
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

let Integrate = React.createClass({
  render: function () {
    return (
      <div className="integrate">
        <h2>Integrate</h2>
        <div className="squeeze">
          <i className="fa fa-facebook" />
          <i className="fa fa-dropbox" />
          <i className="fa fa-linkedin" />
          <i className="fa fa-slack" />
          <i className="fa fa-google" />
          <i className="fa fa-rss" />
        </div>
      </div>
    );
  }
});

module.exports = Landing;
