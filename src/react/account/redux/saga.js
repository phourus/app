import { call, put, take, spawn } from 'redux-saga/effects'

import account from '../../../api/account'

export default function* init() {
  yield [
    spawn(save),
    spawn(deactivate)
  ]
}

function* save() {
  let alert = {}
  while (true) {
    const action = yield take('ACCOUNT_SAVE')
    const changes = {} // selector
    yield put({type: 'REQUEST_ACCOUNT_SAVE'})
    try {
      const data = yield call(account.edit, changes)
      if (data == 204) {
        alert = {
          action: 'save',
          color: 'green',
          code: data,
          msg: 'Account updated'
        }
      }
      yield put({type: 'RECEIVE_ACCOUNT_SAVE'})
    } catch(code) {
      alert = {
        action: 'save',
        color: 'red',
        code,
        msg: 'Account could not be updated'
      }
    }
    yield put({type: 'ALERT', alert})
  }
}

function* deactivate() {
  while (true) {
    const action = yield take('ACCOUNT_DEACTIVATE')
    yield put({type: 'REQUEST_ACCOUNT_DEACTIVATE'})
    try {
      const data = yield call(account.deactivate)
      if (data == 202) {
        alert = {
          action: 'deactivate',
          color: 'green',
          code: data,
          msg: 'Account deactivated'
        }
      }
      yield put({type: 'RECEIVE_ACCOUNT_DEACTIVATE'})
    } catch(code) {
      alert = {
        action: 'deactivate',
        color: 'red',
        code,
        msg: 'Account could not be deactivated'
      }
    }
    yield put({type: 'ALERT', alert})
  }
}
