"use strict";
let React = require('react');
let Router = require('react-router');
let { Link, History } = Router;

let Form = require('./form');
let Docs = require('./docs');

module.exports = React.createClass({
  mixins: [History],
  render: function () {
    return (
      <div className="help">
        <div className="faq">
          <h1>Help & Docs</h1>
          <input type="text" placeholder="what can we help you with?" />
          <Docs />
        </div>
        <div className="contact">
          <h2>Contact us</h2>
          <Form />
          <h4>Additional Assistance</h4>
          <button className="button blue" onClick={this._docs}>Chat with us</button>
          <p>1-844-PHOURUS</p>
          <a href='mailto:info@phourus.com?Subject=Support'>info@phourus.com</a>
        </div>
        <br clear="right" />
        <br />
      </div>
    );
  },
  _docs: function () {
    this.history.pushState(null, "/docs");
  }
});
