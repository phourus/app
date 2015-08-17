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
            <Link to="search" className="fa fa-search"></Link>
            <Link to="editor" className="fa fa-pencil"></Link>
            <Link to="activity" className="fa fa-user"><span className="notifications"></span></Link>
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
            <Link to="leaders">Home</Link> |
            <Link to="about">About</Link> |
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
