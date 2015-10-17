"use strict";
let React = require('react');

let Router = require('react-router');
let { Link, RouteHandler} = Router;
var ga = require('./analytics');
var Initializer = ga.Initializer;

let Alerts = require('./react/alerts');
let Header = require('./react/header');

let App = React.createClass({
  getInitialState: function () {
    return {
      tint: null
    };
  },
  render: function () {
    return  (
      <div>
        <Initializer />
        {this.state.tint ? <div className="tint"></div> : false}
        <Header tintOn={this._tintOn} tintOff={this._tintOff} />
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
  },
  _tintOn: function () {
    this.setState({tint: true});
  },
  _tintOff: function () {
    this.setState({tint: null});
  }
});

module.exports = App;
