"use strict";
let React = require('react');
let Router = require('react-router');
let { Link, Navigation } = Router;

let Form = require('./form');

module.exports = React.createClass({
  mixins: [Navigation],
  render: function () {
    return (
      <div className="contact">
        <div className="description">
          <h3>Contact Us</h3>
          <p>For individuals, a free tool to express themselves professionally, educationally, politically and religiously; a place where expression and representation meet.</p>
          <p>For organizations, such as businesses, government agencies, religious/charitable organizations and educational institutions, Phourus is a tool to create valuable content both internally and externally, with a competitive, social spin with the purpose of giving higher visibility to great content.</p>
        </div>
        <div className="help">
          <h3>Have questions or need help?</h3>
          <button className="button blue" onClick={this._docs}>View Documentation</button>
          <p>1-844-PHOURUS</p>
          <a href='mailto:info@phourus.com?Subject=Support'>info@phourus.com</a>
        </div>
        <Form />
        <br clear="right" />
      </div>
    );
  },
  _docs: function () {
    this.context.router.transitionTo("docs");
  }
});
