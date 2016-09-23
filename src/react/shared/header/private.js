import React from 'react'
import { Link } from 'react-router'

export default ({ logout }) => {
  return (
    <span className="mylinks">
      <Link to="/me">My Posts</Link>
      <Link to="/account">My Account</Link>
      <Link to="/home" onClick={logout.bind(this)}>Logout</Link>
    </span>
  )
}
