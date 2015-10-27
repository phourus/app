"use strict";
let React = require('react');

let Features = React.createClass({
  render: function () {
    return (
      <div className="features">
        <h2 className="heading">Features</h2>
        <p></p>
        <div className="squeeze">
          <div>
            <div>
              <i className="fa fa-sort-amount-desc" /><br />
              Crowd-sorting algorithm organizes content by value
            </div>
            <div>
              <i className="fa fa-filter" /><br />
              Advanced filtering, searching and sorting of all content
            </div>
            <div>
              <i className="fa fa-search" /><br />
              Replaces the outmoded "search and find" approach to content with "fetch and enjoy."
            </div>
            <div>
              <i className="fa fa-users" /><br />
              Organizations with custom team creation/subgroups
            </div>
            <div>
              <i className="fa fa-exchange" /><br />
              Real-time collaboration with teams and users on posts
            </div>
          </div>
          <div>
            <div>
              <i className="fa fa-upload" /><br />
              Easily attach any file, content or link
            </div>
            <div>
              <i className="fa fa-comments" /><br />
              Comments, upvotes/downvotes, tags, shares, mentions
            </div>
            <div>
              <i className="fa fa-share" /><br />
              Social sharing with Facebook, Twitter, LinkedIn and more
            </div>
            <div>
              <i className="fa fa-user-secret" /><br />
              Anonymity
            </div>
            <div>
              <i className="fa fa-mobile" /><br />
              Mobile & Web support: access anytime, anywhere
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Features;
