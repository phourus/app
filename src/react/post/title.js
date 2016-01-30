"use strict";
let React = require('react');
let Router = require('react-router');
let { Link } = Router;

let Actions = require('../../actions/post');

module.exports = React.createClass({
  getDefaultProps: function () {
    return {
      post: {
        id: 0
      },
      owner: false
    };
  },
  render: function () {
    return this.props._route.type === 'create' || this.props._route.type === 'edit' && this.props.owner
    ? <input className="title editing" onChange={this._title} value={this.props.post.title} />
  : <h2 className="title"><Link to={`/stream/${this.props.post.id}`}>{this.props.post.title}</Link></h2>;
  },
  _title: function (e) {
    Actions.change('title', e.currentTarget.value);
  }
});
