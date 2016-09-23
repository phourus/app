import React from 'react'
import { Link } from 'react-router'

import homeStyles from './css/home.module.css'
import privateStyles from './css/private.module.css'
import standardStyles from './css/standard.module.css'
import staticStyles from './css/static.module.css'

export default ({ classType, logout }) => {
  let links = (<ul>
      <li className="create">
        <Link to="/home">
          <i className="fa fa-sign-in" />
          Login
        </Link>
      </li>
    </ul>)

  if (classType === 'private') {
    links = (<span className={privateStyles.links}>
      <Link to="/me" className={privateStyles.link}>My Posts</Link>
      <Link to="/account" className={privateStyles.link}>My Account</Link>
      <Link to="/home" onClick={logout.bind(this)} className={privateStyles.link}>Logout</Link>
    </span>)
  }

  if (classType === 'home' || classType === 'static') {
    const styles = classType === 'home' ? homeStyles : staticStyles
    links = (<ul>
        <li><Link to="/product" className={styles.link}>Product</Link></li>
        <li><Link to="/pricing" className={styles.link}>Pricing</Link></li>
        <li><a href="//phourusinc.phourus.com" className={styles.link}>Blog</a></li>
        <li><Link to="/help" className={styles.link}>Help</Link></li>
    </ul>)
  }
  return (
    <nav className={classType}>
      {links}
    </nav>
  )
}
