import { call, put, take, spawn } from 'redux-saga/effects'

import posts from '../../../../api/posts'

export default function* post() {
  yield [
    spawn(single),
    spawn(create),
    spawn(save),
    spawn(trash)
  ]
}

function* single() {
  const action = yield take('POST_SINGLE')
  yield put({type: 'REQUEST_POST_SINGLE'})
  const post = yield call(posts.single, action.id)
  yield put({type: 'RECEIVE_POST_SINGLE', id: action.id, post})
}

function* create() {
  const action = yield take('POST_CREATE')
}

function* save() {
  const action = yield take('POST_SAVE')
}

function* trash() {
  const action = yield take('POST_TRASH')
}
