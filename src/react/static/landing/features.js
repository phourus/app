let React = require('react');
let Video = require('./video');

let Features = React.createClass({
  render: function () {
    return (
      <div className="features">
        <div className="squeeze">
          <h2 className="heading">Features</h2>
          <img src="/assets/landing/devices.png" className="devices" alt="Phourus Landing Page Mobile and Laptop Screenshot" />
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
