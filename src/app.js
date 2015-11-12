"use strict";
let React = require('react');

let Router = require('react-router');
let { Link, RouteHandler} = Router;
var ga = require('./analytics');
var Initializer = ga.Initializer;

let Alerts = require('./react/alerts');
let Header = require('./react/header');
let Profile = require('./react/profile');

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
        {this.state.tint ? <div className="tint" onClick={this._tintOff}></div> : false}
        <Header tintOn={this._tintOn} tintOff={this._tintOff} tint={this.state.tint} />
        <div className="spacer"></div>
        <Profile />
        <Alerts {...this.props.alerts} />
        <div className="main">
          <div id="content">
            <RouteHandler />
          </div>
          <footer className="footer">
            <strong>1-844-PHOURUS</strong><br />
            <span className="muted">(1-844-746-8787)</span><br />
            <a href="mailto:info@phourus.com&Subject=">info@phourus.com</a><br /><br />
            <span>© 2015 Phourus Inc. All Rights Reserved.</span><br />
            <span className="muted">1411 7th St. #305, Santa Monica, CA 90401</span><br />
            <Link to="terms" className="muted">Terms</Link> |
            <Link to="privacy" className="muted">Privacy</Link>
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
