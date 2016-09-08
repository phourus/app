import React from 'react'
import { Link } from 'react-router'

export default ({url, post, owner}) => {
  let username = 'post'
  if (!owner) {
    return <span></span>
  }
  if (url.type === 'edit' || url.type === 'create') {
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
