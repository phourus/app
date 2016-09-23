import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Info from './info'
import Orgs from './organizations'
import * as actions from './redux/actions'
import styles from './styles.less'

class Account extends React.Component {

  render() {
    // 401
    if (!this.props.session.authenticated) {
      return (<div className="account 401">
        <h2>You need to login first to manage your account</h2>
        <p>Please log in or create an account to access this page.</p>
      </div>)
    }

    return (
      <div className="account">
        <h2>My Account</h2>
        <Info {...this.props} />
        <Orgs {...this.props} />
      </div>
    )
  }
}

const mapState = (state) => {
  const {
    changes,
    lookup
  } = state.account

  return {
    session: state.session,
    changes,
    lookup,
  }
}

const mapDispatch = (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapState, mapDispatch)(Account)
