import { call, put, take, spawn } from 'redux-saga/effects'

import account from '../../../api/account'

export default function* init() {
  yield take('RECEIVE_SESSION_GET')
  yield [
    spawn(notifications),
    spawn(history)
  ]
}

function* notifications() {
  try {
    const data = yield call(account.notifications, {})
    yield put({type: 'ACTIVITY_NOTIFICATIONS', notifications: data})
  } catch(code) {
    const alert = {
      action: 'notifications',
      color: 'yellow',
      code,
      msg: 'Notifications could not be loaded'
    }
    yield put({type: 'ALERT', alert})
  }
}

function* history() {
  try {
    const data = yield call(account.history, {})
    yield put({type: 'ACTIVITY_HISTORY', history: data})
  } catch(code) {
    const alert = {
      action: 'history',
      color: 'yellow',
      code,
      msg: 'History could not be loaded'
    }
    yield put({type: 'ALERT', alert})
  }
}
