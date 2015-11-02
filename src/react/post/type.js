"use strict";
let React = require('react');
let Router = require('react-router');

let Actions = require('../../actions/stream');
let Types = require('./types');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      types: false
    };
  },
  getDefaultProps: function () {
    return {
      context: {},
      post: {},
      owner: false
    };
  },
  render: function () {
    let icons = {
      blog: "laptop",
      event: "calendar",
      subject: "info",
      question: "question",
      debate: "bullhorn",
      poll: "bar-chart",
      quote: "quote-right",
      belief: "flag"
    };
    return (
      <div>
        <div id={this.props.post.type} className={`type ${this.props.post.type} ${(this.props.types ? 'inverted' : '')}`} onClick={this._type}>
          <i className={"fa fa-" + (icons[this.props.post.type] ? icons[this.props.post.type] : 'file')} />
          {" "}
          {this.props.post.type ? this.props.post.type : "Please select a type"}
        </div>
        {this.state.types ? <Types post={this.props.post} type={this._type} context={this.props.context} owner={this.props.owner} /> : false}
      </div>

    );
  },
  _type: function (e) {
    if (this.props.context.type === 'create' || this.props.context.type === 'edit' && this.props.owner) {
      this.setState({types: !this.state.types});
    }
    if (this.props.context.type !== 'post' && this.props.context.type !== 'edit' && this.props.context.type !== 'create') {
      Actions.type(e.currentTarget.id);
    }
  }
});
