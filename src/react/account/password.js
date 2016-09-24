import React from 'react'

export default class Password extends React.Component {

  render() {
    const match = (this.refs.new.value === this.refs.confirm.value)
    return (
      <div id="password">
        <h3>Change Password</h3>
        <div id="user_password" type="password">
          <label>
            Current Password
            <input ref="current" placeholder="current password" type="password" />
          </label>
          <label>
            New Password
            <input ref="new" placeholder="set new password" type="password" />
          </label>
          <label className={match ? "" : "error"}>
            Confirm New Password&nbsp;
            {match ? "" : <span className="error">This field should match your new password</span>}
            <input ref="confirm" placeholder="confirm new password" type="password" />
          </label>
        </div>
        <button id="save_password" className="button green save" onClick={this._submit.bind(this)} disabled={!match}>Update Password</button>
      </div>
    )
  }

  _submit() {
    if (this.refs.new.value !== this.refs.confirm.value) {
      // alert user
      return
    }
    this.props.actions.changePassword()
  }
}
