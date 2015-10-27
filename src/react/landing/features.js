"use strict";
let React = require('react');

let Features = React.createClass({
  render: function () {
    return (
      <div className="create">
        <h2 className="heading">Create</h2>
        <p>create a variety of detailed post types</p>
        <div className="squeeze">
          <div className="green">
            <i className="fa fa-laptop" /><br />
            Blogs
          </div>
          <div className="green">
            <i className="fa fa-calendar" /><br />
            Events
          </div>
          <div className="blue">
            <i className="fa fa-puzzle-piece" /><br />
            Subjects
          </div>
          <div className="blue">
            <i className="fa fa-question" /><br />
            Questions
          </div>
          <div className="red">
            <i className="fa fa-bullhorn" /><br />
            Debates
          </div>
          <div className="red">
            <i className="fa fa-line-chart" /><br />
            Polls
          </div>
          <div className="gold">
            <i className="fa fa-road" /><br />
            Beliefs
          </div>
          <div className="gold">
            <i className="fa fa-quote-right" /><br />
            Quotes
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Features;
