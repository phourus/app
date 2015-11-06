"use strict";
let React = require('react');
let Video = require('./video');

let Features = React.createClass({
  render: function () {
    return (
      <div className="features">
        <div className="squeeze">
          <h2 className="heading">Features</h2>
          <div>
            <div>
              <i className="fa fa-sort-amount-desc" />
              Crowd-sorting algorithm organizes content by value
            </div>
            <div>
              <i className="fa fa-filter" />
              Advanced filtering, searching and sorting of all content
            </div>
            <div>
              <i className="fa fa-users" />
              Organizations with custom team creation/subgroups
            </div>
            <div>
              <i className="fa fa-upload" />
              Easily attach and centralize any file, content or link
            </div>
          </div>
          <Video />
        </div>
      </div>
    );
  }
});

module.exports = Features;
