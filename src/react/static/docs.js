"use strict";
let React = require('react');
let Router = require('react-router');
let Link = Router.Link;

module.exports = React.createClass({
  render: function () {
    return (
      <div className="docs">
        <h2>Documentation</h2>
        <div className="menu">
          <ul>
            <li><i className="fa fa-birthday-cake" /> GETTING STARTED
              <ul>
                <li><Link to="docPage" params={{id: 'create-account'}}>Creating an account</Link></li>
                <li><Link to="docPage" params={{id: 'edit-account'}}>Editing account information</Link></li>
                <li><Link to="docPage" params={{id: 'join-org'}}>Joining an Organization</Link></li>
                <li><Link to="docPage" params={{id: 'create-org'}}>Creating an Organization</Link></li>
                <li><Link to="docPage" params={{id: 'edit-org'}}>Editing an Organization</Link></li>
              </ul>
            </li>
            <li><i className="fa fa-search" /> FINDING POSTS
              <ul>
                <li><Link to="docPage" params={{id: 'the-stream'}}>The Stream</Link></li>
                <li><Link to="docPage" params={{id: 'searching'}}>Searching</Link></li>
                <li><Link to="docPage" params={{id: 'filtering'}}>Filtering</Link></li>
                <li><Link to="docPage" params={{id: 'post-types'}}>Post Types</Link></li>
                <li><Link to="docPage" params={{id: 'contexts'}}>Contexts</Link></li>
              </ul>
            </li>
            <li><i className="fa fa-book" /> READING POSTS
              <ul>
                <li><Link to="docPage" params={{id: 'tags'}}>Tags</Link></li>
                <li><Link to="docPage" params={{id: 'stats'}}>Stats</Link></li>
                <li><Link to="docPage" params={{id: 'shares'}}>Shares</Link></li>
                <li><Link to="docPage" params={{id: 'comments'}}>Comments</Link></li>
              </ul>
            </li>
            <li><i className="fa fa-plus" /> CREATING POSTS
              <ul>
                <li><Link to="docPage" params={{id: 'create-post'}}>Create Post</Link></li>
                <li><Link to="docPage" params={{id: 'title-content'}}>Title & Content</Link></li>
                <li><Link to="docPage" params={{id: 'post-type'}}>Post Type</Link></li>
                <li><Link to="docPage" params={{id: 'publish-post'}}>Publish Post</Link></li>
              </ul>
            </li>
            <li><i className="fa fa-pencil" /> EDITING POSTS
              <ul>
                <li><Link to="docPage" params={{id: 'tags'}}>Tags</Link></li>
                <li><Link to="docPage" params={{id: 'links'}}>Links</Link></li>
                <li><Link to="docPage" params={{id: 'privacy-settings'}}>Privacy Settings</Link></li>
              </ul>
            </li>
            <li><i className="fa fa-bell" /> ACTIVITY
              <ul>
                <li><Link to="docPage" params={{id: 'notifications'}}>Notifications</Link></li>
                <li><Link to="docPage" params={{id: 'history'}}>History</Link></li>
              </ul>
            </li>
            <li><i className="fa fa-edit" /> EXAMPLES
              <ul>
                <li></li>
              </ul>
            </li>
            <li><i className="fa fa-question" /> MORE INFORMATION
              <ul>
                <li><Link to="docPage" params={{id: 'help'}}>Additional Help</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    );
  }
});
