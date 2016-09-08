import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Tabs from './tabs';

import styles from './styles.less'

class Admin extends React.Component {

  render() {
    let route = this.props.route

    return (
      <div className="admin">
        <Tabs {...this.state} />
        {React.cloneElement(this.props.children, route)}
      </div>
    )
  }
}

const mapState = (state) => {
  return {}
}

const mapDispatch = (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapState, mapDispatch)(Admin)
