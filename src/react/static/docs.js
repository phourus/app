"use strict";
let React = require('react');
let Router = require('react-router');
let Link = Router.Link;

module.exports = React.createClass({
  render: function () {
    return (
      <div className="docs">
        <h2>Documentation</h2>
        <div className="breadcrumb">Editing Posts >> Privacy Settings</div>
        <div className="menu">
          <ul>
            <li>GETTING STARTED
              <ul>
                <li>Creating an account</li>
                <li>Editing account information</li>
                <li>Joining an Organization</li>
                <li>Creating an Organization</li>
                <li>Editing an Organization</li>
              </ul>
            </li>
            <li>FINDING POSTS
              <ul>
                <li>The Stream</li>
                <li>Searching</li>
                <li>Filtering</li>
                <li>Post Types</li>
                <li>Contexts</li>
              </ul>
            </li>
            <li>READING POSTS
              <ul>
                <li>Tags</li>
                <li>Stats</li>
                <li>Share</li>
                <li>Comments</li>
              </ul>
            </li>
            <li>CREATING POSTS
              <ul>
                <li>Create Post</li>
                <li>Title & Content</li>
                <li>Post Type</li>
                <li>Finish</li>
              </ul>
            </li>
            <li>EDITING POSTS
              <ul>
                <li>Tags</li>
                <li>Links</li>
                <li>Privacy Settings</li>
              </ul>
            </li>
            <li>ACTIVITY
              <ul>
                <li>Notifications</li>
                <li>History</li>
              </ul>
            </li>
            <li>EXAMPLES
              <ul>
                <li></li>
              </ul>
            </li>
            <li>MORE INFORMATION
              <ul>
                <li>Additional Help</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    );
  }
});
