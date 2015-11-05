"use strict";
let React = require('react');
let Router = require('react-router');
let { RouteHandler, State, Navigation, Link } = Router;
let Actions = require('../../actions/account');
let Store = require('../../stores/account');

module.exports = React.createClass({
  mixins: [State],
  getInitialState: function () {
    return {}
  },
  componentDidMount: function () {
    this.unsubscribe = Store.listen(data => {
      this.setState(data);
    });
  },
  componentWillUnmount: function () {
    this.unsubscribe();
  },
  render: function () {
    return (
    <div className="reset">
      <h1>Reset Your Password</h1>
      <label>
        Email:
        <input onChange={this._email} />
      </label>
      <label>
        New Password:
        <input onChange={this._password} type="password" />
      </label>
      <label>
        Confirm Password:
        <input onChange={this._confirm} type="password" />
      </label>
      {this.state.code === 403
        ? <div className="message red" onClick={this._clear}>There was an error resetting your password. Please try again or <a href="mailto:info@phourus.com&subject=Error">contact us.</a></div>
        : false
      }
      {this.state.code === 200
        ? <div className="message green" onClick={this._clear}>Your password has been reset. You can now <a>login with your new password here.</a></div>
        : false
      }
      <button onClick={this._reset} className="blue button submit">Reset my Password</button>
    </div>
    );
  },
  _email: function (e) { this.setState({email: e.currentTarget.value }); },
  _password: function (e) { this.setState({password: e.currentTarget.value }); },
  _confirm: function (e) { this.setState({confirm: e.currentTarget.value }); },
  _reset: function () {
    let query = this.context.router.getCurrentQuery();
    if (this.state.password === this.state.confirm) {
      Actions.reset(this.state.email, this.state.password, query.token, query.userId);
    }
  },
  _clear: function () {
    this.setState({code: null});
  }
});
