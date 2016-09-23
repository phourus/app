import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Router from 'react-router'
import Login from './login'
import Signup from './signup'
import Forgot from './forgot'
import Reset from './reset'
import * as actions from './redux/actions'

import styles from './styles.less'

class Auth extends React.Component {

  render() {
    let mode = this.props.session.mode
    const query = this.props.url.query
    if (query && query.reset && query.token) {
      mode = 'reset'
    }
    return (
      <div className="auth">
        <Signup {...this.props} show={mode === 'signup'} showLogin={this._mode.bind(this, 'login')} />
        <Login {...this.props} show={mode === 'login'} showForgot={this._mode.bind(this, 'forgot')} />
        <Forgot {...this.props} show={mode === 'forgot'} showLogin={this._mode.bind(this, 'login')} showReset={this._mode.bind(this, 'reset')} />
        <Reset {...this.props} show={mode === 'reset'} showLogin={this._mode.bind(this, 'login')} />
      </div>
    )
  }

  _mode(mode) {
    console.log(mode)
    this.props.actions.mode(mode)
  }
}

const mapState = (state, props) => {
  return {
    url: props.url,
    session: state.session
  }
}

const mapDispatch = (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapState, mapDispatch)(Auth)
