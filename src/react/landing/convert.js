"use strict";
let React = require('react');
let { Link, History } = require('react-router');

let Convert = React.createClass({
  mixins: [History],
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
    this.history.pushState(null, "/account");
  }
});

module.exports = Convert;
