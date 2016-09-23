import React from 'react'
import ga from '../../lib/analytics'

import styles from './css/forgot.module.css'

export default class Forgot extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    if (!this.props.show) {
      return false;
    }
    return (
      <div className={styles.forgot}>
        <input placeholder="your email login" onChange={this._email.bind(this)} className={styles.input} />
        <button onClick={this._forgot} className="blue button submit" style={{display: 'inline-block'}}>Email me a reset link</button>
        <a href="javascript: void(0)" onClick={this.props.showLogin}>Cancel</a>
        {this.state.code === 500 && this.state.action === 'forgot'
          ? <div className="message red" onClick={this._clear}>There was an error sending your reset link. Please try again or <a href="mailto:info@phourus.com&subject=Error">contact us.</a></div>
          : false
        }
        {this.state.code === 200 && this.state.action === 'forgot'
          ? <div className="message green" onClick={this._clear}>Instructions to reset your password have been sent to your email address.</div>
          : false
        }
      </div>
    )
  }

  _email(e) {
    this.setState({email: e.currentTarget.value })
    this._clear()
  }

  _forgot() {
    this.props.actions.forgot(this.state.email)
    this.setState({email: "", code: null})
    ga('send', 'event', 'account', 'forgot')
  }

  _clear() {
    this.setState({code: null})
  }
}
