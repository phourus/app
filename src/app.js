"use strict";
let React = require('react');

let { Link } = require('react-router');
var ga = require('./analytics');
var Initializer = ga.Initializer;

let Header = require('./react/header');
let Profile = require('./react/profile');
let Tutorial = require('./react/tutorial');

let Actions = require('./actions/session');
let Store = require('./stores/session');

let TutorialActions = require('./actions/tutorial');

let HTML5Backend = require('react-dnd-html5-backend');
let { DragDropContext } = require('react-dnd');

let App = React.createClass({
  childContextTypes: {
    session: React.PropTypes.object,
    route: React.PropTypes.object
  },
  getChildContext: function () {
    return {
      session: this.state.session,
      route: this.state.route
    };
  },
  getInitialState: function () {
    return {
      sidebarVisible: false,
      tint: null,
      session: {
        authenticated: false,
        user: {
          SESSION_ADMIN: [],
          SESSION_ORGANIZATIONS: [],
          SESSION_POSTS: [],
          SESSION_TEAMS: [],
          SESSION_USER: 0
        },
        orgs: []
      },
      route: {
        route: [],
        params: {},
        query: {},
        root: '',
        id: '',
        type: ''
      }
    };
  },
  componentDidMount: function () {
    this.unsubscribe = Store.listen(data => {
      let session = this.state.session;

      // get
      if (data.authenticated === true) {
        session.authenticated = true;
        session.user = data.user;
      }

      // orgs
      if (data.orgs) {
        session.orgs = data.orgs;
      }

      this.setState({session: session});
    });
    Actions.get();
    this._route(this.props);
  },
  componentWillUnmount: function () {
    this.unsubscribe();
  },
  componentWillReceiveProps: function (nextProps) {
    this._route(nextProps);
  },
  render: function () {
    let className = "main";
    let route = this.state.route;
    let root = route.root;

    if (root === 'stream') {
      className += " sidebar";

      if (this.state.sidebarVisible) {
        className += " visible";
      }
    }
    return  (
      <div id="app">
        <Tutorial />
        <Initializer />
        <Header tintOn={this._tintOn} tintOff={this._tintOff} tint={this.state.tint} />
        {this.state.tint ? <div className="tint" onClick={this._tintOff}></div> : false}
        <div className="spacer"></div>
        <Profile />
        <div>
          <div id="content">
            {React.cloneElement(this.props.children, {})}
          </div>
        </div>
        <Helper />
        <footer className="footer">
          <strong>1-844-PHOURUS</strong><br />
          <span className="muted">(1-844-746-8787)</span><br />
          <a href="mailto:info@phourus.com&Subject=">info@phourus.com</a><br /><br />
          <span>© 2015 Phourus Inc. All Rights Reserved.</span><br />
          <span className="muted">1411 7th St. #305, Santa Monica, CA 90401</span><br />
          <Link to="/terms" className="muted">Terms</Link> |
          <Link to="/privacy" className="muted">Privacy</Link>
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
  _route: function (nextProps) {
    let context = {
      route: nextProps.routes || [],
      params: nextProps.params || {},
      createOrgLink: function (shortname) {
        let protocol = location.protocol;
        let host = location.host;
        let parts = host.split('.');
        // www.phourus.com/.local, phourus.com/.local, phourus-staging
        if (['www', 'phourus', 'phourus-staging'].indexOf(parts[0]) === -1) {
          parts.shift();
          host = parts.join('.');
        }
        return `${protocol}//${shortname}.${host}`
      },
      //query: this.props.location.query || {},
      root: '',
      id: '',
      type: '',
    };

    let roots = {
      'docs/:id': 'docs',
      ':user': 'stream',
      ':user/:post': 'post'
    };

    let types = {
      ':user/:post/edit': 'edit',
    };

    // ROOT
    if (context.route[1]) {
      context.root = context.route[1].path;
      if (roots[context.route[1].path]) {
        context.root = roots[context.route[1].path];
      }
    }

    // ID
    if (context.params.id) {
      context.id = context.params.id;
    }

    if (context.params.user) {
      context.id = context.params.user;
    }

    if (context.params.post) {
      context.id = context.params.post;
    }

    // TYPE
    if (context.route[2]) {
      context.type = context.route[2].path;
      if (types[context.route[2].path]) {
        context.type = types[context.route[2].path];
      }
    }

    if (context.type === 'create') {
      context.id = 'create';
    }

    if (context.root === 'edit' || context.root === 'post' || context.root === 'create') {
      context.type = context.root;
    }

    if (context.root === 'me') {
      context.root = 'stream';
      context.type = 'me';
    }

    let subdomain = location.hostname.split('.').shift();
    if (subdomain !== 'www') {
      //context.id = subdomain;
      //context.type = 'orgs';
    }
    this.setState({route: context});
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
              <li><Link to="/about">About Us</Link></li>
              <li><a href="javascript:void(0)" onClick={this._tutorial}>Tutorial</a></li>
              <li><Link to="/docs">Documentation</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
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
  },
  _tutorial: function () {
    ga('send', 'event', 'helper', 'tutorial');
    TutorialActions.reset();
  }
});

module.exports = DragDropContext(HTML5Backend)(App);
