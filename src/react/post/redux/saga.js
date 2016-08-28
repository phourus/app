import { spawn } from 'redux-saga/effects'

import collaborators from './sagas/collaborators'
import comments from './sagas/comments'
import folders from './sagas/folders'
import links from './sagas/links'
import posts from './sagas/posts'
import tags from './sagas/tags'
import thumbs from './sagas/thumbs'

export default function* post() {
  yield [
    spawn(collaborators),
    spawn(comments),
    spawn(folders),
    spawn(links),
    spawn(posts),
    spawn(tags),
    spawn(thumbs)
  ]
}
