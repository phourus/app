import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import activity from './reducers/activity'
import auth from './reducers/auth'
import collaborators from './reducers/post/collaborators'
import comments from './reducers/post/comments'
import folders from './reducers/post/folders'
import links from './reducers/post/links'
import members from './reducers/members'
import orgs from './reducers/orgs'
import pages from './reducers/pages'
import post from './reducers/post'
import session from './reducers/session'
import stream from './reducers/stream'
import tags from './reducers/post/tags'
import thumbs from './reducers/post/thumbs'
import tutorial from './reducers/tutorial'
import users from './reducers/users'
import util from './reducers/util'

const reducers = combineReducers({
  activity,
  auth,
  collaborators,
  comments,
  folders,
  links,
  members,
  orgs,
  pages,
  post,
  session,
  stream,
  tags,
  thumbs,
  tutorial,
  users,
  util
})

const store = Store()

export default function Store(initialState) {
  return createStore(
    reducers,
    initialState,
    applyMiddleware(thunkMiddleware, createLogger())
  )
}
