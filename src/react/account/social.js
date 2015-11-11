"use strict";
let React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <div id="social">
        <h3>Verify Social Accounts</h3>
        <button id="facebook" className="social"></button>
        <button id="linkedin" className="social"></button>
        <button id="linkedin" className="social"></button>
        <button id="google" className="social"></button>
      </div>
    );
  }
});
