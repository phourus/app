import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Info from './info'
import Orgs from './organizations'
import * as actions from './redux/actions'
import styles from './styles.less'

class Account extends React.Component {

  render() {
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
  return {
    session: {
      user: {},
      orgs: []
    },
    changes: {},
    lookup: []
  }
}

const mapDispatch = (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapState, mapDispatch)(Account)
