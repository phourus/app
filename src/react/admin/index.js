import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Tabs from './tabs'

import * as actions from './redux/actions'
import styles from './styles.less'

class Admin extends React.Component {

  render() {
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
