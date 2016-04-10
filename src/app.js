import React from 'react';
import { Link } from 'react-router';
import ga from './analytics';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Header from './react/header';
import Profile from './containers/Profile';
import Tutorial from './containers/Tutorial';
import Menu from './react/menu';

import Actions from './actions/session';
import Store from './stores/session';
import TutorialActions from './actions/tutorial';

const Initializer = ga.Initializer;

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
    let classType = "product";
    let className = "main";
    let route = this.state.route;
    let root = route.root;

    if (root === 'stream') {
        className += " sidebar";
    }
    if (this.state.sidebarVisible) {
      className += " visible";
    }
    if (['product', 'pricing', 'help'].indexOf(root) > -1) {
      classType = "static";
    }
    if (root === 'home') {
      classType = "home";
    }
    if (!root && !route.subdomain) {
      classType = "home";
    }
    return  (
      <div id="app" className={classType}>
        <Menu />
        <div className="container">
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
      root: '',
      id: '',
      type: '',
    };
    let parts = location.hostname.split('.');
    if (['phourus', 'www', 'phourus-staging'].indexOf(parts[0]) === -1) {
      context.subdomain = parts[0];
    }
        context.route = nextProps.routes || [];
        context.params = nextProps.params || {};
        context.query = this.props.location.query || {};

        // index, stream, home?,
        // account, me, create,
        // activity, notifications, history
        // admin,
        // :user/:post -> edit, :user
        let route = context.route;
        switch (route[1].path) {
            case 'stream':
            context.root = 'stream',
            context.type = '';
            context.id = 0;
            break;
            case 'account':
            context.root = 'account';
            context.type = 'account';
            context.id = 0;
            break;
            case 'me':
            context.root = 'stream';
            context.type = 'me';
            context.id = 0;
            break;
            case 'create':
            context.root = 'create';
            context.type = 'create';
            context.id = 0;
            break;
            case 'activity':
            context.root = 'activity';
            context.type = 'activity';
            context.id = 0;
            break;
            case 'notifications':
            context.root = 'activity';
            context.type = 'activity';
            context.id = 0;
            break;
            case 'history':
            context.root = 'activity';
            context.type = 'activity';
            context.id = 0;
            break;
            case 'admin':
            context.root = 'admin';
            context.type = 'admin';
            context.id = context.subdomain;
            if (route[2] && route[2].path) {
                context.type = route[2].path;
            }
            break;
            case ':user/:post':
            context.root = 'post';
            context.type = 'post';
            context.id = context.params.post;

            if (route[2] && route[2].path === 'edit') {
                context.type = 'edit';
            }
            break;
            case ':user':
            context.root = 'stream';
            context.type = 'user';
            context.id = context.params.user;
            break;
            default:
            context.root = route[1] ? route[1].path : '';
            context.type = route[2] ? route[2].path : '';
            break;
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
                <div className="popout">
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
                        <button className="blue button" onClick={this._chat}><i className="fa fa-comment" /> Chat with us</button>
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
    },
    _chat: function () {
        ga('send', 'event', 'helper', 'chat');
    }
});

module.exports = DragDropContext(HTML5Backend)(App);
