import { call, put, take, spawn } from 'redux-saga/effects'

import tags from '../../../../rest/tags'

export default function* init() {
  yield [
    spawn(add),
    spawn(remove)
  ]
}

function* add() {
  while(true) {
    const action = yield take('TAG_ADD')
    yield put({type: 'REQUEST_TAG_ADD'})
    try {
      const data = yield call(tags.add, action.model)
      yield put({type: 'RECEIVE_TAG_ADD', data})
    } catch(code) {
      const alert = {
        action: 'add',
        color: 'red',
        code,
        msg: 'Tag could not be created'
      }
      yield put({type: 'ALERT', alert})
    }
  }
}

function* remove() {
  while(true) {
    const action = yield take('TAG_REMOVE')
    yield put({type: 'REQUEST_TAG_REMOVE'})
    try {
      const data = yield call(tags.remove, action.id)
      yield put({type: 'RECEIVE_TAG_REMOVE', id})
    } catch(code) {
      const alert = {
        action: 'remove',
        color: 'red',
        code,
        msg: 'Tag could not be removed'
      }
      yield put({type: 'ALERT', alert})
    }
  }
}
