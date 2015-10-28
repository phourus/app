"use strict";
let React = require('react');

let Video = React.createClass({
  render: function () {
    return (
      <div className="video">
        <video width="100%" controls>
          <source src="/assets/screencast.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }
});

module.exports = Video;
