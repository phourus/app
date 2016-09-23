import { call, put, take, spawn, select } from 'redux-saga/effects'

import * as selectors from './selectors'

import orgs from '../../../../api/orgs'
import users from '../../../../api/users'

const MAP = {
  org: orgs.single,
  user: users.single
}

export default function* init() {
  yield [
    spawn(profile)
  ]
}

function* profile() {
  while(true) {
    const action = yield take('PROFILE_GET')
    try {
      yield put({type: 'REQUEST_PROFILE_GET'})
      let cb = MAP[action.context]
      let data = yield select(selectors.session)
      if (cb) {
        data = yield call(cb, action.id)
      }
      yield put({type: 'RECEIVE_PROFILE_GET', profile: data})
    } catch(code) {
      const alert = {
        action: 'profile',
        color: 'red',
        code,
        msg: 'Profile could not be loaded'
      }
      yield put({type: 'ALERT', alert})
    }
  }
}
