"use strict";
let React = require('react');

let Info = require('./account/info');
let Orgs = require('./account/organizations');

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
