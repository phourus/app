import { call, put, take, spawn } from 'redux-saga/effects'

import members from './sagas/members'

import orgs from '../../../api/orgs'

export default function* init() {
  yield [
    spawn(create),
    spawn(single),
    spawn(save),
    spawn(lookup),
    spawn(deactivate),
    spawn(members)
  ]
}

function* create(shortname) {
  while (true) {
    const action = yield take('ADMIN_CREATE')
    try {
      yield put({type: 'REQUEST_ADMIN_CREATE'})
      const data = yield call(orgs.add, action.shortname)
      yield put({type: 'RECEIVE_ADMIN_CREATE', org: data})
    } catch (code) {
      const alert = {
        action: 'organization',
        color: 'red',
        code,
        msg: 'Organization could not be created'
      }
      yield put({type: 'ALERT', alert})
    }
  }
}

function* single(id) {
  while (true) {
    const action = yield take('ADMIN_SINGLE')
    try {
      const data = yield call(orgs.single, action.id)
      yield put({type: 'RECEIVE_ADMIN_SINGLE', org: data})
    } catch(code) {
      if (code != 200) {
        const alert = {
          action: 'load',
          color: 'red',
          code,
          msg: 'Organization could not be loaded'
        };
        yield put({type: 'ALERT', alert})
      }
    }
  }
}

function* save() {
  while (true) {
    const action = yield take('ADMIN_SAVE')
    try {
      yield put({type: 'REQUEST_ADMIN_SAVE'})
      yield call(orgs.save, action.orgId, action.changes)
      yield put({type: 'RECEIVE_ADMIN_SAVE'})
    } catch (code) {
      const alert = {
        action: 'save',
        color: 'red',
        code,
        msg: 'Organization details could not be saved'
      }
      yield put({type: 'ALERT', alert})
    }
  }
}

function* lookup(name) {
  while (true) {
    const action = yield take('ADMIN_LOOKUP')
    try {
      yield put({type: 'REQUEST_ADMIN_LOOKUP'})
      const data = yield call(orgs.lookup, action.name)
      yield put({type: 'RECEIVE_ADMIN_LOOKUP', lookup: data})
    } catch (code) {
      const alert = {
        action: 'lookup',
        color: 'yellow',
        code,
        msg: 'Organizations lookup could not be loaded'
      }
      yield put({type: 'ALERT', alert})
    }
  }

}

function* deactivate() {
  while (true) {
    const action = yield take('ADMIN_DEACTIVATE')
    try {
      yield put({type: 'REQUEST_ADMIN_DEACTIVATE'})
      const data = yield call(orgs.deactivate)
      if (data == 202) {
        yield put({type: 'ALERT', alert: {
          action: 'deactivate',
          color: 'green',
          code: code,
          msg: 'Account deactivated'
        }})
      }
      yield put({type: 'RECEIVE_ADMIN_DEACTIVATE'})
    } catch (code) {
      const alert = {
        action: 'deactivate',
        color: 'red',
        code,
        msg: 'Account could not be deactivated'
      }
      yield put({type: 'ALERT', alert})
    }
  }
}
