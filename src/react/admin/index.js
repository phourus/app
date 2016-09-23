import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Tabs from './tabs'

import * as actions from './redux/actions'
import styles from './styles.less'

class Admin extends React.Component {

  render() {
    // 401
    if (!this.props.session.authenticated) {
      return (<div className="admin 401">
        <h2>You need to login first to manage organizations</h2>
        <p>Please log in or create an account to access this page.</p>
      </div>)
    }

    // 403
    if (!this.props.session.authenticated) {
      return (<div className="admin 403">
        <h2>You need to be an administrator to manage this organization</h2>
        <p>You may need to request administrator access in order to view this page.</p>
      </div>)
    }

    const Children = React.cloneElement(this.props.children, this.props)
    return (
      <div className="admin">
        <Tabs {...this.props} />
        {Children}
      </div>
    )
  }
}

const mapState = (state, props) => {
  const {
    org,
    changes,
    members
  } = state.admin

  return {
    url: props.url,
    session: state.session,
    org,
    changes,
    members
  }
}

const mapDispatch = (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch), dispatch }
}

export default connect(mapState, mapDispatch)(Admin)
