import React from 'react'
import { Link } from 'react-router'

export default ({route, post, owner}) => {
  let username = 'post'
  if (!owner) {
    return <span></span>
  }
  if (route.type === 'edit' || route.type === 'create') {
    return <span></span>
  }
  if (post.user && post.user.username) {
    username = post.user.username;
  }
  return (
    <Link to={`/${username}/${post.slug}/edit`} className="edit">
      <i className="fa fa-pencil" /><br />Edit
    </Link>
  )
}
