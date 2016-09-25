import { call, put, take, spawn } from 'redux-saga/effects'

import account from '../../../api/account'

export default function* init() {
  yield [
    spawn(lookup)
  ]
}

function* lookup() {
  while (true) {
    const action = yield take('ORGANIZATIONS_LOOKUP')
    yield put({type: 'REQUEST_ORGANIZATIONS_LOOKUP'})
    try {
      const data = yield call(account.lookup, action.value)
      yield put({type: 'RECEIVE_ORGANIZATIONS_LOOKUP', lookup: data})
    } catch(code) {
      const alert = {
        action: 'lookup',
        color: 'red',
        code,
        msg: 'Organizations could not be found'
      }
    }
    yield put({type: 'ALERT', alert})
  }
}
