import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Select from 'react-select'
import { Link } from 'react-router'

import * as actions from './redux/actions'
import Search from './search'
import Create from './create'
import List from './list'

import styles from './styles.less'

class Orgs extends React.Component {

  render() {

    // 401
    if (!this.props.session.authenticated) {
      return (<div className="orgs 401">
        <h2>You need to login first to view your organizations</h2>
        <p>Please log in or create an account to access this page.</p>
      </div>)
    }

    return (
      <div className="organizations">
        <h3>My Organizations</h3>
        <Search {...this.props} />
        <Create {...this.props} />
        <List {...this.props} />
      </div>
    )
  }
}

const mapState = (state) => {
  const {
    lookup
  } = state.organizations
  return {
    session: state.session,
    lookup,
  }
}

const mapDispatch = (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapState, mapDispatch)(Orgs)
