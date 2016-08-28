import { call, put, take, spawn } from 'redux-saga/effects'

import thumbs from '../../../../rest/thumbs'

export default function* init() {
  yield [
    spawn(post),
    spawn(add),
    spawn(save),
    spawn(remove)
  ]
}

function* post() {
  while(true) {
    const action = yield take('THUMB_POST')
    yield put({type: 'REQUEST_THUMB_POST'})
    try {
      const data = yield call(thumbs.post, action.id)
      yield put({type: 'RECEIVE_THUMB_POST', data, id})
    } catch(code) {
      const alert = {
        action: 'load',
        color: 'red',
        code: code,
        msg: 'Thumbs could not be loaded'
      }
      yield put({type: 'ALERT', alert})
    }
  }
}

function* add() {
  while(true) {
    const action = yield take('THUMB_ADD')
    yield put({type: 'REQUEST_THUMB_ADD'})
    try {
      const data = yield call(thumbs.add, action.model)
      yield put({type: 'RECEIVE_THUMB_ADD', data})
    } catch(code) {
      const alert = {
        action: 'add',
        color: 'red',
        code: code,
        msg: 'Thumb could not be added'
      }
      yield put({type: 'ALERT', alert})
    }
  }
}

function* save() {
  while(true) {
    const action = yield take('THUMB_SAVE')
    yield put({type: 'REQUEST_THUMB_SAVE'})
    try {
      const data = yield call(thumbs.save, action.id, action.model)
      yield put({type: 'RECEIVE_THUMB_SAVE', data})
    } catch(code) {
      const alert = {
        action: 'save',
        color: 'red',
        code: code,
        msg: 'Thumb could not be saved'
      }
      yield put({type: 'ALERT', alert})
    }
  }
}

function* remove() {
  while(true) {
    const action = yield take('THUMB_REMOVE')
    yield put({type: 'REQUEST_THUMB_REMOVE'})
    try {
      const data = yield call(thumbs.remove, action.id)
      yield put({type: 'RECEIVE_THUMB_REMOVE', data, id})
    } catch(code) {
      const alert = {
        action: 'remove',
        color: 'red',
        code: code,
        msg: 'Thumb could not be removed'
      }
      yield put({type: 'ALERT', alert})
    }
  }
}
