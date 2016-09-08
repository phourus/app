import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'

import Notifications from './notifications'
import History from './history'

import * as actions from './redux/actions'
import styles from './styles.less'

class Activity extends React.Component {

  componentDidMount() {
    this._route()
  }

  componentWillReceiveProps() {
    this._route()
  }

  render() {
    let session = this.props.session
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
        <Notifications {...this.props} />
        <History {...this.props} />
      </div>
    )
  }

  _route() {
    let route = this.props.routes
    if (route[1].name === 'history') {
      //this.setState({selected: 'history'})
    } else {
      //this.setState({selected: 'notifications'})
    }
  }
}

const mapState = (state, props) => {
  const {
    selected,
    notifications,
    history
  } = state.activity

  return {
    routes: props.routes,
    session: state.session,
    selected,
    notifications,
    history
  }
}

const mapDispatch = (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapState, mapDispatch)(Activity)
