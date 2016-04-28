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
      id: "",
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
    this._route(this.props.params);
  },
  componentWillUnmount: function () {
    this.unsubscribe();
  },
  componentWillReceiveProps: function (nextProps) {
    if (this.state.id !== nextProps.params.id) {
      this._route(nextProps.params);
    }
  },
  render: function () {
    return (
      <div className="docs">
        <i className="fa fa-bars toggle" onClick={this._toggle} />
        <Popup id={this.state.id} page={this.state.page} close={this._close} />
        <Menu menu={this.state.menu} />
      </div>
    );
  },
  _route: function (params) {
    let page = '';
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

let Popup = React.createClass({
  render: function () {
    return (
      <div key={this.props.id} className="page">
        <ReactMarkdown source={this.props.page} />
      </div>
    );
  }
});

let Menu = React.createClass({
  render: function () {
    return (
      <div className={this.props.menu ? "menu" : "menu hide"}>
        <ul>
          <li><i className="fa fa-birthday-cake" /> GETTING STARTED
            <ul>
              <li><Link to="/help/create-account">Creating an account</Link></li>
              <li><Link to="/help/edit-account">Editing account information</Link></li>
              <li><Link to="/help/join-org">Joining an Organization</Link></li>
              <li><Link to="/help/create-org">Creating an Organization</Link></li>
              <li><Link to="/help/edit-org">Editing an Organization</Link></li>
            </ul>
          </li>
          <li><i className="fa fa-search" /> FINDING POSTS
            <ul>
              <li><Link to="/help/the-stream">The Stream</Link></li>
              <li><Link to="/help/searching">Searching</Link></li>
              <li><Link to="/help/filtering">Filtering</Link></li>
              <li><Link to="/help/post-types">Post Types</Link></li>
              <li><Link to="/help/contexts">Contexts</Link></li>
            </ul>
          </li>
          <li><i className="fa fa-book" /> READING POSTS
            <ul>
              <li><Link to="/help/tags">Tags</Link></li>
              <li><Link to="/help/stats">Stats</Link></li>
              <li><Link to="/help/shares">Shares</Link></li>
              <li><Link to="/help/comments">Comments</Link></li>
            </ul>
          </li>
          <li><i className="fa fa-plus" /> CREATING POSTS
            <ul>
              <li><Link to="/help/create-post">Create Post</Link></li>
              <li><Link to="/help/title-content">Title & Content</Link></li>
              <li><Link to="/help/post-type">Post Type</Link></li>
              <li><Link to="/help/publish-post">Publish Post</Link></li>
            </ul>
          </li>
          <li><i className="fa fa-pencil" /> EDITING POSTS
            <ul>
              <li><Link to="/help/tags">Tags</Link></li>
              <li><Link to="/help/links">Links</Link></li>
              <li><Link to="/help/privacy-settings">Privacy Settings</Link></li>
            </ul>
          </li>
          <li><i className="fa fa-bell" /> ACTIVITY
            <ul>
              <li><Link to="/help/notifications">Notifications</Link></li>
              <li><Link to="/help/history">History</Link></li>
            </ul>
          </li>
          <li><i className="fa fa-edit" /> EXAMPLES
            <ul>
              <li></li>
            </ul>
          </li>
          <li><i className="fa fa-question" /> MORE INFORMATION
            <ul>
              <li><Link to="/help/help">Additional Help</Link></li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }
});
