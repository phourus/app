import React from 'react'
import { Link } from 'react-router'
import ga from '../../lib/analytics'

import styles from './css/forgot.module.css'

export default class Reset extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    if (!this.props.show) {
      return false
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
    )
  }

  _email(e) {
    this.setState({email: e.currentTarget.value })
  }

  _password(e) {
    this.setState({password: e.currentTarget.value })
  }

  _confirm(e) {
    this.setState({confirm: e.currentTarget.value })
  }

  _reset() {
    let query = this.props.location.query
    if (this.state.password === this.state.confirm && query.token) {
      this.props.actions.reset(this.state.email, this.state.password, query.token, query.userId)
      ga('send', 'event', 'account', 'reset')
    }
  }

  _clear() {
    this.setState({code: null})
  }
}
