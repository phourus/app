import { call, put, take, spawn } from 'redux-saga/effects'

import posts from '../../../rest/posts'

export default function* post() {
  yield [
    spawn(single)
  ]
}

function* single() {
  const action = yield take('POST_SINGLE')
  yield put({type: 'REQUEST_POST_SINGLE'})
  const post = yield call(posts.single, action.id)
  yield put({type: 'RECEIVE_POST_SINGLE', id: action.id, post})
}
