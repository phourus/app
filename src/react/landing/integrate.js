"use strict";
let React = require('react');

let Integrate = React.createClass({
  render: function () {
    return (
      <div className="integrate">
        <h2 className="heading">Integrate</h2>
        <p>work with the tools you're already using</p>
        <div className="squeeze">
          <i className="fa fa-facebook" />
          <i className="fa fa-google" />
          <i className="fa fa-twitter" />
          <i className="fa fa-linkedin" />
          <i className="fa fa-slack" />          
          <i className="fa fa-dropbox" />
        </div>
      </div>
    );
  }
});

module.exports = Integrate;
