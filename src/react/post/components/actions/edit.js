import React from 'react'

export default ({route, post, owner}) => {
  let username = 'post'
  if (!owner) {
    return false
  }
  if (route.type === 'edit' || route.type === 'create') {
    return false
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
