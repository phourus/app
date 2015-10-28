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
              <i className="fa fa-check-square" />
              <i className="fa fa-sort-amount-desc" />
              Crowd-sorting algorithm organizes content by value
            </div>
            <div>
              <i className="fa fa-check-square" />
              <i className="fa fa-filter" />
              Advanced filtering, searching and sorting of all content
            </div>
            <div>
              <i className="fa fa-check-square" />
              <i className="fa fa-search" />
              Replaces the outmoded "search and find" approach to content with "fetch and enjoy"
            </div>
            <div>
              <i className="fa fa-check-square" />
              <i className="fa fa-users" />
              Organizations with custom team creation/subgroups
            </div>
            <div>
              <i className="fa fa-check-square" />
              <i className="fa fa-exchange" />
              Real-time collaboration with teams and users on posts
            </div>
            <div>
              <i className="fa fa-check-square" />
              <i className="fa fa-upload" />
              Easily attach any file, content or link
            </div>
            <div>
              <i className="fa fa-check-square" />
              <i className="fa fa-comments" />
              Comments, upvotes/downvotes, tags, shares, mentions
            </div>
            <div>
              <i className="fa fa-check-square" />
              <i className="fa fa-share" />
              Social sharing with Facebook, Twitter, LinkedIn and more
            </div>
            <div>
              <i className="fa fa-check-square" />
              <i className="fa fa-user-secret" />
              Anonymity
            </div>
            <div>
              <i className="fa fa-check-square" />
              <i className="fa fa-mobile" />
              Mobile & Web support: access anytime, anywhere
            </div>
          </div>
          <Video />
        </div>
      </div>
    );
  }
});

module.exports = Features;
