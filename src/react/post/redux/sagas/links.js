import { call, put, take, spawn } from 'redux-saga/effects'

import links from '../../../../rest/links'

export default function* init() {
  yield [
    spawn(add),
    spawn(save),
    spawn(remove)
  ]
}

function* add() {
  while(true) {
    const action = yield take('LINK_ADD')
    yield put({type: 'REQUEST_LINK_ADD'})
    try {
      const data = yield call(links.add, action.model)
      yield put({type: 'RECEIVE_LINK_ADD', data})
    } catch(code) {
      const alert = {
        action: 'add',
        color: 'red',
        code,
        msg: 'Link could not be created'
      }
      yield put({type: 'ALERT', alert})
    }
  }
}

function* save() {
  while(true) {
    const action = yield take('LINK_SAVE')
    yield put({type: 'REQUEST_LINK_SAVE'})
    try {
      const data = yield call(links.save, action.id, action.model)
      yield put({type: 'RECEIVE_LINK_SAVE', data})
    } catch(code) {
      const alert = {
        action: 'save',
        color: 'red',
        code: code,
        msg: 'Link could not be saved'
      }
      yield put({type: 'ALERT', alert})
    }
  }
}

function* remove() {
  while(true) {
    const action = yield take('LINK_REMOVE')
    yield put({type: 'REQUEST_LINK_REMOVE'})
    try {
      const data = yield call(links.remove, action.id)
      yield put({type: 'RECEIVE_LINK_REMOVE', id})
    } catch(code) {
      const alert = {
        action: 'remove',
        color: 'red',
        code,
        msg: 'Link could not be removed'
      }
      yield put({type: 'ALERT', alert})
    }
  }
}
