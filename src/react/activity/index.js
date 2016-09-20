import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'

import Notifications from './notifications'
import History from './history'

import * as actions from './redux/actions'
import styles from './styles.less'

class Activity extends React.Component {

  render() {
    const { routes, session } = this.props
    const selected = routes[1].name === 'history' ? 'history' : 'notifications'

    if (!session.authenticated) {
      return (<div className="activity 401">
				<h2>You need to login first to view activity</h2>
				<p>Please login if you would like to see your account activity.</p>
			</div>)
    }

    return (
      <div className="activity">
        <div className="toggle">
          <h3><Link to="/notifications">Notifications</Link> | <Link to="/history">History</Link></h3>
        </div>
        <Notifications {...this.props} selected={selected} />
        <History {...this.props} selected={selected} />
      </div>
    )
  }
}

const mapState = (state, props) => {
  const {
    notifications,
    history
  } = state.activity

  return {
    routes: props.routes,
    session: state.session,
    notifications,
    history
  }
}

const mapDispatch = (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapState, mapDispatch)(Activity)
