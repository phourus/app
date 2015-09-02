"use strict";
let React = require('react');

let Router = require('react-router');
let { Link, RouteHandler} = Router;

let Alerts = require('./react/alerts');
let Header = require('./react/header');

let App = React.createClass({
  render: function () {
    return  (
      <div>
        <Header />
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
