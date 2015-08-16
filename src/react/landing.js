"use strict";
let React = require('react');
let Router = require('react-router');
let Link = Router.Link;
let Store = require('../stores/search');
let Actions = require('../actions/search');
let Post = require('./post');

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
  render: function () {
    return (
      <div className="slider">
        <img src="/assets/banner.jpg" className="banner" />
      </div>
    );
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
    );
  }
});

let Compete = React.createClass({
  render: function () {
    return (
      <div className="compete">
        <h2>Compete</h2>
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
    );
  }
});

let Integrate = React.createClass({
  render: function () {
    return (
      <div className="integrate">
        <h2>Integrate</h2>
        <i className="fa fa-facebook" />
        <i className="fa fa-dropbox" />
        <i className="fa fa-linkedin" />
        <i className="fa fa-slack" />
        <i className="fa fa-google" />
        <i className="fa fa-rss" />
      </div>
    );
  }
});

module.exports = Landing;
