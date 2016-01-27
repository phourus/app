"use strict";
let React = require('react');

let { Link } = require('react-router');
var ga = require('./analytics');
var Initializer = ga.Initializer;

let Alerts = require('./react/alerts');
let Header = require('./react/header');
let Profile = require('./react/profile');

let HTML5Backend = require('react-dnd-html5-backend');
let { DragDropContext } = require('react-dnd');

let App = React.createClass({
  getInitialState: function () {
    return {
      sidebarVisible: false,
      tint: null
    };
  },
  render: function () {
    let className = "main";
    let _route = this._route();
    let root = _route.root;

    if (root === 'stream') {
      className += " sidebar";

      if (this.state.sidebarVisible) {
        className += " visible";
      }
    }
    // <html lang="en">
    //   <head>
    //     <title>Phourus.com</title>
    //     <meta name="Author" content="Phourus.com" />
    //     <meta name="Description" content="A central place to manage the information, content and ideas for your organization" />
    //     <meta name="Keywords" content="Information,Content,Ideas,Organization" />
    //     <meta charSet="utf-8" />
    //     <meta content="minimum-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=no" name="viewport" />
    //     <link rel="stylesheet" href="/style.css" type="text/css" />
    //     <link rel="stylesheet" href="/quill.base.css" type="text/css" />
    //     <link rel="stylesheet" href="/quill.snow.css" type="text/css" />
    //     <link rel="shortcut icon" href="/assets/favicon.ico" type="image/x-icon" />
    //     <link rel="icon" href="/assets/favicon.ico" type="image/x-icon" />
    //     <link href='http://fonts.googleapis.com/css?family=Rokkitt:400,700|Open+Sans:400,700' rel='stylesheet' type='text/css' />
    //   </head>
    //   <body className="body">
    //     <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />
    //     <script src="http://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js"></script>
    //     <script src="http://cdnjs.cloudflare.com/ajax/libs/c3/0.4.10/c3.min.js"></script>
    //     <script type="text/javascript" src="/app.js"></script>
    //   </body>
    // </html>
    return  (
      <div id="app">
        <Initializer />
        {this.state.tint ? <div className="tint" onClick={this._tintOff}></div> : false}
        <Header _route={_route} tintOn={this._tintOn} tintOff={this._tintOff} tint={this.state.tint} />
        <div className="spacer"></div>
        <Profile _route={_route} />
        <Alerts {...this.props.alerts} />
        <div>
          <div id="content">
            {React.cloneElement(this.props.children,
              {
                _route: _route
              }
            )}
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
  _route: function () {
    let context = {
      route: this.props.routes || [],
      params: this.props.params || {},
      //query: this.props.location.query || {},
      root: '',
      id: '',
      type: '',
    };

    let roots = {
      'docs/:id': 'docs',
      'admin/:id': 'admin',
      '*': '404'
    };

    let types = {
      ':id': 'post',
      'edit/:id': 'edit',
      'org/:id': 'orgs',
      'user/:id': 'users',
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
    return context;
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

module.exports = DragDropContext(HTML5Backend)(App);
