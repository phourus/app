"use strict";
let React = require('react');

let Info = require('./info');
let Orgs = require('./organizations');

module.exports = React.createClass({
  render: function () {
    return (
      <div className="account">
        <h2>My Account</h2>
        <Info />
        <Orgs />
      </div>
    );
  }
});
