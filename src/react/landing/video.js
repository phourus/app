"use strict";
let React = require('react');
let ga = require('../../analytics');

let Video = React.createClass({
  componentDidMount: function () {
    let _video = document.getElementById("video");
    if (!_video) {
      return;
    }
    _video.addEventListener("play", function () {
      ga('send', 'event', 'video', 'play');
    }, false);
  },
  render: function () {
    return (
      <div className="video">
        <video id="video" width="100%" controls>
          <source src="/assets/screencast.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }
});

module.exports = Video;
