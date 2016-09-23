import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import ga from '../../../lib/analytics'
import util from '../../../lib/util'
import Search from '../../stream/search'
import Home from './home'
import Static from './static'
import Private from './private'

import styles from './styles.less'

class Header extends React.Component {
  render() {
    const { url, session } = this.props
    const r = url.root
    if (['product', 'pricing', 'help'].indexOf(r) > -1) {
      return <Static />
    }
    if (r === 'home') {
      return <Home />
    }
    if (!r && !url.subdomain) {
      return <Home />
    }
    //<Search />
    return  (
      <header className="header">
        { !session.authenticated
          ?  <nav>
                <ul>
                  <li className="create">
                    <Link to="/home">
                      <i className="fa fa-sign-in" />
                      Login
                    </Link>
                  </li>
                </ul>
              </nav>
          : <Private logout={this._logout.bind(this)} />
        }
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
