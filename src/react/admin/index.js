import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Tabs from './tabs'

import * as actions from './redux/actions'
import styles from './styles.less'

class Admin extends React.Component {

  render() {
    // {React.cloneElement(this.props.children, this.props)}
    return (
      <div className="admin">
        <Tabs {...this.props} />
        
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    session: {},
    route: {},
    org: {},
    members: []
  }
}

const mapDispatch = (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapState, mapDispatch)(Admin)
