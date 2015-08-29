"use strict";
let React = require('react');

let Router = require('react-router');
let { Link, RouteHandler} = Router;

let Alerts = require('./react/alerts');

let App = React.createClass({
  render: function () {
    return  (
      <div>
        <header className="header">
          <div className="brand">
            <Link to="home"></Link>
          </div>
          <nav className="nav">
            <ul>
              <li className="posts">
                <Link to="search" >
                  <i className="fa fa-search" />
                  Posts
                </Link>
              </li>
              <li className="create">
                <Link to="editor">
                  <i className="fa fa-pencil" />
                  Create
                </Link>
              </li>
              <li className="me">
                <Link to="activity" className="me">
                  <i className="fa fa-user" />
                  <span className="notifications"></span>
                  Me
                </Link>
                <ul>
                  <li><Link to="myPosts">My Posts</Link></li>
                  <li><Link to="activity">My Activity</Link></li>
                  <li><Link to="account">My Account</Link></li>
                  <li><Link to="myPosts">Logout</Link></li>
                </ul>
              </li>
            </ul>
          </nav>
        </header>
        <div className="spacer"></div>
        <Alerts {...this.props.alerts} />
        <div className="main">
          <div id="content">
            <RouteHandler />
          </div>
          <footer className="footer">
            © 2015 Phourus Inc. All Rights Reserved.
            <br />
            <Link to="terms">Terms</Link> |
            <Link to="privacy">Privacy</Link>
            <br clear="all" />
          </footer>
        </div>
      </div>
    );
  }
});

module.exports = App;
