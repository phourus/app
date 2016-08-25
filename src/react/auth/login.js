"use strict";
let React = require('react');
let ga = require('../../lib/analytics');

let util = require('../../lib/util');

let Router = require('react-router');
let { History, Link } = Router;

let Actions = require('../../actions/session');
let Store = require('../../stores/session');

let Loader = require('../shared/loader');
let Alert = require('../shared/alert');

module.exports = React.createClass({
  mixins: [History],
  contextTypes: {
    session: React.PropTypes.object,
    route: React.PropTypes.object
  },
  getDefaultProps: function () {
    return {
      clicked: true,
      show: false
    };
  },
  getInitialState: function () {
    return {
      ready: true
    };
  },
  componentDidMount: function () {
    this.unsubscribe = Store.listen(data => {
      if (data.code === 200 && this.state.clicked === true) {
        data.clicked = false;
        let url = util.createHomeURL();
        let route = this.context.route;
        if (!route.subdomain) {
          url = url + '/stream';
        }
        window.location = url;
      }
      if (!data.alert) {
        data.alert = null;
      }
      data.ready = true;
      this.setState(data);
    });
  },
  componentWillUnmount: function () {
    this.unsubscribe();
  },
  render: function () {
    let session = this.context.session;
    let user = session.user;
    if (!this.props.show) {
      return false;
    }
    if (!this.state.ready) {
      return <Loader />
    }
    if (session.authenticated) {
      let name = user.first;
      return (
        <div className="login">
          <span className="welcome">Welcome back{name ? " " + name : ""}! <Link to="/stream">Click here to view posts</Link></span><br />
          <button className="button blue" onClick={this._posts}>View posts</button>
          <button className="button blue" onClick={this._account}>View my account</button>
        </div>
      );
    }
    return (
      <div className="login">
        {this.state.alert
          ? <Alert {...this.state.alert} />
          : false
        }
        <label>
          Email:
          <input ref="username" className="username" placeholder="your email address"/>
        </label>
        <label>
          Password:
          <input ref="password" className="password" type="password" placeholder="your password" />
        </label>
        {this.state.code === 401 && this.state.loaded && this.state.action === 'login'
          ? <div className="message red" onClick={this._clear}>There was an error logging in. Please try again or <a href="mailto:info@phourus.com&subject=Error">contact us.</a></div>
          : false
        }
        <button onClick={this._login} className="green button">Login</button>
        <a href="javascript:void(0)" className="forgotLink" onClick={this.props.showForgot}>Forgot your login information? Click here</a>
      </div>
    );
  },
  _login: function () {
    let username = this.refs.username.getDOMNode().value;
    let password = this.refs.password.getDOMNode().value;
    this._clear();
    this.setState({clicked: true, ready: false});
    Actions.login(username, password);
    ga('send', 'event', 'account', 'login');
  },
  _request: function () {
    //this._clear();
    this.history.pushState(null, "/request");
  },
  _clear: function () {
    this.setState({code: null});
  },
  _posts: function () {
    this.history.pushState(null, "/stream");
  },
  _account: function () {
    this.history.pushState(null, "/account");
  }
});
