import { createSelector } from 'reselect'

export const session = state => state.session
export const post = state => state.post.post
export const id = state => state.post.post.id
export const changes = state => state.post.changes

export const owner = createSelector(
  [session, post],
  (session, post) => {
    return false
    const { user } = session
    if (!session.authenticated || !user.id) {
      return false
    }
    const sharedPosts = user && user.SESSION_POSTS && user.SESSION_POSTS.constructor === Array ? user.SESSION_POSTS : []
    return (post.user && post.user.id == user.id) || sharedPosts.indexOf(post.id) !== -1
  }
)
