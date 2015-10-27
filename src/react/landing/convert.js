"use strict";
let React = require('react');
let Router = require('react-router');
let Link = Router.Link;

let Convert = React.createClass({
  mixins: [Router.Navigation],
  render: function () {
    return (
      <div className="convert">
        <div>
          <input placeholder="email" />
          <button className="button green" onClick={this._register}>Sign Up Now</button>
          Already registered? <Link to="account">Login here</Link>.
        </div>
      </div>
    );
  },
  _register: function () {
    this.context.router.transitionTo("account");
  }
});

module.exports = Convert;
