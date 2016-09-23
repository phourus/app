import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import styles from './styles.less'

class Menu extends React.Component {

  render() {
    const authenticated = this.props.session.authenticated
    return (
      <div className="menu">
        <ul className={authenticated ? "authenticated" : ""}>
          <li><Link to="/stream" activeClassName="active"><i className="fa fa-home" /></Link></li>
          <li><Link to="/create" activeClassName="active"><i className="fa fa-pencil" /></Link></li>
          <li><Link to="/activity" activeClassName="active"><i className="fa fa-line-chart" /></Link></li>
          <li><Link to="/folders" activeClassName="active"><i className="fa fa-folder" /></Link></li>
          <li><Link to="/organizations" activeClassName="active"><i className="fa fa-group" /></Link></li>
          <li><Link to="/links" activeClassName="active"><i className="fa fa-link" /></Link></li>
        </ul>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    session: state.session
  }
}

export default connect(mapState)(Menu)
