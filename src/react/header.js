"use strict";
let React = require('react');

let Router = require('react-router');
let { Link, History } = Router;
let ga = require('../analytics');

let Actions = require('../actions/session');

let Search = require('./stream/search');

module.exports = React.createClass({
  mixins: [History],
  contextTypes: {
    session: React.PropTypes.object
  },
  render: function () {
    let session = this.context.session;
    let route = this.props._route;
    let r = route.root;
    if (!r || r === 'home') {
      return <Home />
    }
    if (['contact', 'pricing', 'about', 'docs'].indexOf(r) > -1) {
      return <Static />
    }
    return  (
      <header className="header">
        { !session.authenticated
          ?  <nav>
                <ul>
                  <li className="create">
                    <Link to="/home">
                      <i className="fa fa-sign-in" />
                      Login
                    </Link>
                  </li>
                </ul>
              </nav>
          : <Private />
        }
        <div className="brand">
          <Link to="/home"></Link>
        </div>
        <Search />
      </header>
    );
  },
  _logout: function () {
    Actions.logout();
    this.history.pushState(null, "/home");
    ga('send', 'event', 'account', 'logout');
  }
});

let Home = React.createClass({
  render: function () {
    return (
      <header className="header home">
        <div className="brand">
          <Link to="/home"></Link>
        </div>
        <Nav classType="home" />
      </header>
    );
  }
});

let Static = React.createClass({
  render: function () {
    return (
      <header className="header">
        <div className="brand">
          <Link to="/home"></Link>
        </div>
        <Nav classType="static" />
      </header>
    );
  }
});

let Private = React.createClass({
  contextTypes: {
    session: React.PropTypes.object
  },
  render: function () {
    let session = this.context.session;
    let orgs = session.orgs;

    return (
      <nav className="nav">
          <ul>
            <li className="posts">
              <Link to="/stream" >
                <i className="fa fa-file" />
                Posts
              </Link>
            </li>
            <li className="me">
              <Link to="/activity" className="me">
                <i className="fa fa-user" />
                <span className="notifications"></span>
                Me
              </Link>
              <div>
                <ul>
                  {orgs.map((org) => {
                    if (!org.approved) {
                      return false;
                    }
                    return <li key={org.org.id}><Link to={`/stream/org/${org.org.id}`}>{org.org.shortname || org.org.name} <i className="fa fa-users" /></Link></li>
                  })}
                </ul>
                <ul>
                  <li><Link to="/stream/me">My Posts <i className="fa fa-edit" /></Link></li>
                  <li><Link to="/activity">My Activity <i className="fa fa-bell" /></Link></li>
                  <li><Link to="/account">My Account <i className="fa fa-user" /></Link></li>
                  <li><a href="javascript:void(0)" onClick={this._logout}>Logout <i className="fa fa-sign-out" /></a></li>
                </ul>
              </div>
            </li>
            <li className="create">
              <Link to="/post/create">
                <i className="fa fa-pencil" />
                Create
              </Link>
            </li>
          </ul>
        </nav>
    );
  }
});

let Nav = React.createClass({
  render: function () {
    return (
      <nav className={this.props.classType}>
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/pricing">Pricing</Link></li>
          <li><Link to="/docs">Docs</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
    );
  }
});
