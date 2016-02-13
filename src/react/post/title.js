"use strict";
let React = require('react');
let Router = require('react-router');
let { Link } = Router;

let Actions = require('../../actions/post');

module.exports = React.createClass({
  contextTypes: {
    route: React.PropTypes.object
  },
  getDefaultProps: function () {
    return {
      post: {
        id: 0
      },
      user: {
        id: 0
      },
      owner: false
    };
  },
  render: function () {
    let username = 'post';
    let post = this.props.post;
    if (post.user && post.user.username) {
      username = post.user.username;
    }
    return this.context.route.type === 'create' || this.context.route.type === 'edit' && this.props.owner
    ? <input className="title editing" onChange={this._title} value={post.title} />
    : <h2 className="title"><Link to={`/${username}/${post.slug}`}>{post.title}</Link></h2>;
  },
  _title: function (e) {
    Actions.change('title', e.currentTarget.value);
  }
});
