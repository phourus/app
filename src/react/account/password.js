"use strict";
let React = require('react');

Account.Password = React.createClass({
  getInitialState: function () {
    return {
        current: "",
        new: "",
        confirm: ""
    }
  },
  render: function () {
    let match = (this.state.new === this.state.confirm);
    return (
      <div id="password">
        <h3>Change Password</h3>
        <div id="user_password" type="password">
          <label>
            Current Password
            <input placeholder="current password" value={this.state.password} onChange={this._changePassword} type="password" />
          </label>
          <label>
            New Password
            <input placeholder="set new password" value={this.state.new} onChange={this._changeNew} type="password" />
          </label>
          <label className={match ? "" : "error"}>
            Confirm New Password&nbsp;
            {match ? "" : <span className="error">This field should match your new password</span>}
            <input placeholder="confirm new password" value={this.state.confirm} onChange={this._changeConfirm} type="password" />
          </label>
        </div>
        <button id="save_password" className="button green save" onClick={this._submit} disabled={!match}>Update Password</button>
      </div>
    );
  },
  _changeCurrent: function (e) {
    let value = e.currentTarget.value;
    this.setState({current: value});
  },
  _changeNew: function (e) {
    let value = e.currentTarget.value;
    this.setState({new: value});
  },
  _changeConfirm: function (e) {
    let value = e.currentTarget.value;
    this.setState({confirm: value});
  },
  _submit: function () {
    if (this.state.new !== this.state.confirm) {
      // alert user
      return;
    }
    Actions.changePassword();
  }
});
