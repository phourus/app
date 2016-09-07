let React = require('react');
let Router = require('react-router');
let { History, Link } = Router;
let Actions = require('../../actions/auth');
let Store = require('../../stores/auth');
let ga = require('../../lib/analytics');

module.exports = React.createClass({
  getDefaultProps: function () {
    return {
      show: false
    };
  },
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
    if (!this.props.show) {
      return false;
    }
    return (
    <div className="reset">
      <p>To reset your password, please enter your email and new password below:</p>
      <label>
        Email:
        <input onChange={this._email} placeholder="your email login" />
      </label>
      <label>
        New Password:
        <input onChange={this._password} type="password" placeholder="new password" />
      </label>
      <label>
        Confirm Password:
        <input onChange={this._confirm} type="password" placeholder="confirm password" />
      </label>
      <button onClick={this._reset} className="blue button submit">Reset my Password</button>
      <a href="javascript:void(0)" onClick={this.props.showLogin}>Cancel</a>
      {this.state.code === 403 && this.state.action === 'reset'
        ? <div className="message red" onClick={this._clear}>There was an error resetting your password. Please try again or <a href="mailto:info@phourus.com&subject=Error">contact us.</a></div>
        : false
      }
      {this.state.code === 200 && this.state.action === 'reset'
        ? <div className="message green" onClick={this._clear}>Your password has been reset. You can now <a href="javascript:void(0)" onClick={this.props.showLogin}>login with your new password here.</a></div>
        : false
      }
    </div>
    );
  },
  _email: function (e) { this.setState({email: e.currentTarget.value }); },
  _password: function (e) { this.setState({password: e.currentTarget.value }); },
  _confirm: function (e) { this.setState({confirm: e.currentTarget.value }); },
  _reset: function () {
    let query = this.props.location.query;
    if (this.state.password === this.state.confirm && query.token) {
      Actions.reset(this.state.email, this.state.password, query.token, query.userId);
      ga('send', 'event', 'account', 'reset');
    }
  },
  _clear: function () {
    this.setState({code: null});
  }
});
