"use strict";
let React = require('react');
let Router = require('react-router');

let Store = require('../../stores/stream');
let Actions = require('../../actions/stream');
let Post = require('../post');

let Explore = React.createClass({
  render: function () {
    return (
      <div className="explore">
        <h2 className="heading">Explore</h2>
        <p>see some public Phourus posts in action</p>
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
    };
  },
  componentDidMount: function () {
    this.unsubscribe = Store.listen((data) => {
      this.setState(data);
    });
    Actions.collection();
  },
  render: function () {
    let data = this.state.posts.slice(0, 4);
    let posts = [];

    posts = data.map((item, i) => {
       let location = {};
       //let selected = (item.id === this.props.selected);
       if (item.user.locations && item.user.locations.length > 0) {
           location = item.user.locations[0];
       }
       return <Post key={item.id} post={item} user={item.user} location={location} context={{type: null, id: null}} scroll={this.props.scroll} />;
    });
    return (
      <div className="explorer">
        <div className="posts">{posts}</div>
        <button className="button blue" style={{margin: 'auto'}} onClick={this._more}>See More</button>
      </div>
    );
  },
  _more: function () {
    this.context.router.transitionTo('stream');
  }
});

module.exports = Explore;
