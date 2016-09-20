import React from 'react'
import { Link } from 'react-router'

export default ({ classType }) => {
  return (
    <nav className={classType}>
      <ul>
        <li><Link to="/product">Product</Link></li>
        <li><Link to="/pricing">Pricing</Link></li>
        <li><a href="//phourusinc.phourus.com">Blog</a></li>
        <li><Link to="/help">Help</Link></li>
      </ul>
    </nav>
  )
}
