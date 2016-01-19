"use strict";
let React = require('react');

let Router = require('react-router');
let { Link, RouteHandler, State } = Router;
var ga = require('./analytics');
var Initializer = ga.Initializer;

let Alerts = require('./react/alerts');
let Header = require('./react/header');
let Profile = require('./react/profile');

let App = React.createClass({
  mixins: [State],
  getInitialState: function () {
    return {
      sidebarVisible: false,
      tint: null
    };
  },
  render: function () {
    let className = "main";
    let route = this.context.router.getCurrentRoutes();

    if (route[1] && route[1].name === 'stream') {
      className += " sidebar";

      if (this.state.sidebarVisible) {
        className += " visible";
      }
    }

    return  (
      <div>
        <Initializer />
        {this.state.tint ? <div className="tint" onClick={this._tintOff}></div> : false}
        <Header tintOn={this._tintOn} tintOff={this._tintOff} tint={this.state.tint} />
        <div className="spacer"></div>
        <Profile />
        <Alerts {...this.props.alerts} />
        <div className={className}>
          <Sidebar sidebar={this._sidebar} sidebarVisible={this.state.sidebarVisible} />
          <div id="content">
            <RouteHandler />
          </div>
        </div>
        <Helper />
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
    );
  },
  _tintOn: function () {
    this.setState({tint: true});
  },
  _tintOff: function () {
    this.setState({tint: null});
  },
  _sidebar: function () {
    this.setState({sidebarVisible: !this.state.sidebarVisible});
  }
});

let Sidebar = React.createClass({
  getInitialState: function () {
    return {
      selected: 0
    };
  },
  render: function () {
    let tags = [
      {name: 'All Posts (Default)', count: 86},
      {name: 'Marketing', count: 32},
      {name: 'Development', count: 22},
      {name: 'Sales', count: 17},
      {name: 'Executive', count: 14},
      {name: 'Admin', count: 6}
    ];
    if (!this.props.sidebarVisible) {
      return (
        <div id="sidebar">
          <button className="toggle" onClick={this.props.sidebar}><i className="fa fa-navicon" /></button>
        </div>
      );
    }
    return (
      <div id="sidebar">
        <button className="toggle" onClick={this.props.sidebar}><i className="fa fa-navicon" /></button>
        <ul>
          {tags.map((item, index) => {
            return (
              <li className={index === this.state.selected ? "selected" : ""}>
                <a id={'id' + index} href="javascript:void(0)" onClick={this._select}>
                  <span className="title">{item.name}</span><br />
                  <span className="count">{item.count} posts</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  },
  _select: function (e) {
    let id = e.currentTarget.id;
    id = id.replace('id', '');
    this.setState({selected: parseInt(id)});
  }
});

let Helper = React.createClass({
  getInitialState: function () {
    return {
      active: false
    };
  },
  render: function () {
    let className = this.state.active ? "helper active" : "helper";
    return (
      <div className={className}>
        <div className="popout" onClick={this._inactive}>
          <div className="title">
            <span>Help</span>
            <i className="fa fa-close" onClick={this._inactive} />
          </div>
          <div>
            <ul>
              <li><Link to="about">About Us</Link></li>
              <li><Link to="pricing">Pricing</Link></li>
              <li><Link to="docs">Documentation</Link></li>
              <li><Link to="contact">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <strong>1-844-PHOURUS</strong><br />
            <div>(1-844-746-8787)</div>
            <a href="mailto:info@phourus.com?Subject=Help">info@phourus.com</a>
          </div>
        </div>
        <div className="icon" onClick={this._active}>
          <i className="fa fa-question" />
        </div>
      </div>
    );
  },
  _active: function () {
    ga('send', 'event', 'helper', 'show');
    this.setState({active: true});
  },
  _inactive: function () {
    ga('send', 'event', 'helper', 'hide');
    this.setState({active: false});
  }
});

module.exports = App;
