"use strict";
let React = require('react');
let Router = require('react-router');
let { Link, History } = Router;
let ReactMarkdown = require('react-markdown');

let Actions = require('../../actions/pages');
let Store = require('../../stores/pages');

const DEFAULT_PAGE = 'create-account';

module.exports = React.createClass({
  mixins: [History],
  getInitialState: function () {
    return {
      menu: true,
      page: ""
    };
  },
  componentDidMount: function () {
    this.unsubscribe = Store.listen((data) => {
      if (data.page) {
        this.setState({page: data.page, menu: false, id: data.id});
      }
    });
    this._route();
  },
  componentWillUnmount: function () {
    this.unsubscribe();
  },
  componentWillReceiveProps: function () {
    this._route();
  },
  render: function () {
    return (
      <div className="docs">
        <i className="fa fa-bars toggle" onClick={this._toggle} />
        <Menu menu={this.state.menu} />
        <div key={this.state.id} className="page">
          <ReactMarkdown source={this.state.page} />
        </div>
      </div>
    );
  },
  _route: function () {
    let page = '';
    let params = this.props.params;
    if (params && params.id) {
      Actions.get(params.id);
    } else {
      Actions.get(DEFAULT_PAGE);
    }
  },
  _toggle: function () {
    this.setState({menu: !this.state.menu});
  }
});

let Menu = React.createClass({
  render: function () {
    return (
      <div className={this.props.menu ? "menu" : "menu hide"}>
        <ul>
          <li><i className="fa fa-birthday-cake" /> GETTING STARTED
            <ul>
              <li><Link to="/docs/create-account">Creating an account</Link></li>
              <li><Link to="/docs/edit-account">Editing account information</Link></li>
              <li><Link to="/docs/join-org">Joining an Organization</Link></li>
              <li><Link to="/docs/create-org">Creating an Organization</Link></li>
              <li><Link to="/docs/edit-org">Editing an Organization</Link></li>
            </ul>
          </li>
          <li><i className="fa fa-search" /> FINDING POSTS
            <ul>
              <li><Link to="/docs/the-stream">The Stream</Link></li>
              <li><Link to="/docs/searching">Searching</Link></li>
              <li><Link to="/docs/filtering">Filtering</Link></li>
              <li><Link to="/docs/post-types">Post Types</Link></li>
              <li><Link to="/docs/contexts">Contexts</Link></li>
            </ul>
          </li>
          <li><i className="fa fa-book" /> READING POSTS
            <ul>
              <li><Link to="/docs/tags">Tags</Link></li>
              <li><Link to="/docs/stats">Stats</Link></li>
              <li><Link to="/docs/shares">Shares</Link></li>
              <li><Link to="/docs/comments">Comments</Link></li>
            </ul>
          </li>
          <li><i className="fa fa-plus" /> CREATING POSTS
            <ul>
              <li><Link to="/docs/create-post">Create Post</Link></li>
              <li><Link to="/docs/title-content">Title & Content</Link></li>
              <li><Link to="/docs/post-type">Post Type</Link></li>
              <li><Link to="/docs/publish-post">Publish Post</Link></li>
            </ul>
          </li>
          <li><i className="fa fa-pencil" /> EDITING POSTS
            <ul>
              <li><Link to="/docs/tags">Tags</Link></li>
              <li><Link to="/docs/links">Links</Link></li>
              <li><Link to="/docs/privacy-settings">Privacy Settings</Link></li>
            </ul>
          </li>
          <li><i className="fa fa-bell" /> ACTIVITY
            <ul>
              <li><Link to="/docs/notifications">Notifications</Link></li>
              <li><Link to="/docs/history">History</Link></li>
            </ul>
          </li>
          <li><i className="fa fa-edit" /> EXAMPLES
            <ul>
              <li></li>
            </ul>
          </li>
          <li><i className="fa fa-question" /> MORE INFORMATION
            <ul>
              <li><Link to="/docs/help">Additional Help</Link></li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }
});
