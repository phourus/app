_owner() {
  let session = this.props.session
  let user = session.user
  let post = this.state.post
  if (!session.authenticated || !user.id) {
    return false
  }
  let sharedPosts = user && user.SESSION_POSTS && user.SESSION_POSTS.constructor === Array ? user.SESSION_POSTS : []
  return (post.user && post.user.id == user.id) || sharedPosts.indexOf(post.id) !== -1
}
