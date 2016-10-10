import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import ga from '../../../lib/analytics'
import util from '../../../lib/util'
import Nav from './nav'

import styles from './styles.less'
import nav from './css/nav.less'

class Header extends React.Component {

  render() {
    const { url, session } = this.props
    const r = url.root

    let type = 'default'
    if (session.authenticated) {
      type = 'private'
    }
    if (['product', 'pricing', 'help', 'privacy', 'terms'].indexOf(r) > -1) {
      type = 'static'
    }
    if (r === 'home') {
      type = 'home'
    }
    if (!r && !url.subdomain) {
      type = 'home'
    }
    return  (
      <header className={type === 'home' ? "header home" : "header"}>
        <Nav classType={type} logout={this._logout.bind(this)} />
        <div className="brand">
          {url.subdomain
            ? <a href={util.createHomeURL()}></a>
            : <Link to="/"></Link>
          }
        </div>

      </header>
    )
  }

  _logout() {
    this.props.dispatch({type: 'SESSION_LOGOUT'})
  }
}

const mapState = (state, props) => {
  return {
    url: props.url,
    session: state.session
  }
}

export default connect(mapState)(Header)
