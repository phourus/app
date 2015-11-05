"use strict";
let React = require('react');
let Router = require('react-router');
let { RouteHandler, State, Navigation, Link } = Router;
let Actions = require('../../actions/account');
let Store = require('../../stores/account');

module.exports = React.createClass({
  mixins: [State, Navigation],
  getDefaultProps: function () {
    return {
      show: false
    };
  },
  getInitialState: function () {
    return {
      loaded: false
    };
  },
  componentDidMount: function () {
    this.unsubscribe = Store.listen(data => {
      if (data.code === 200 && this.context.router.getCurrentRoutes()[1].name === 'login') {
        this.context.router.transitionTo("activity");
      }
      this.setState(data);
    });
  },
  componentWillUnmount: function () {
    this.unsubscribe();
  },
  componentDidUpdate: function () {
    if (this.state.loaded === false) {
      this.setState({code: null, loaded: true});
    }
  },
  render: function () {
    if (!this.props.show) {
      return false;
    }
    return (
      <div className="login">
        <label>
          Email:
          <input ref="username" className="username" placeholder="your email address"/>
        </label>
        <label>
          Password:
          <input ref="password" className="password" type="password" placeholder="your password" />
        </label>
        {this.state.code === 401 && this.state.loaded
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
    Actions.login(username, password);
  },
  _request: function () {
    //this._clear();
    //this.context.router.transitionTo("request");
  },
  _clear: function () {
    this.setState({code: null});
  }
});
