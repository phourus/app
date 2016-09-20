import { call, put, take, spawn } from 'redux-saga/effects'

import members from '../../../../api/members'

export default function* init() {
  yield [
    spawn(collection),
    spawn(request),
    spawn(approve),
    spawn(admin),
    spawn(revoke),
    spawn(deny),
    spawn(remove)
  ]
}

function* collection() {
  while (true) {
    const action = yield take('MEMBERS_COLLECTION')
    try {
      const data = yield call(members.collection, {orgId: action.id})
      yield put({type: 'RECEIVE_MEMBERS_COLLECTION', members: data})
    } catch(code) {
      if (code != 200) {
         const alert = {
           action: 'load',
           color: 'red',
           code,
           msg: 'Members could not be loaded'
         }
         yield put({type: 'ALERT', alert})
      }
    }
  }
}

function* request() {
  while (true) {
    const action = yield take('MEMBERS_REQUEST')
    try {
      yield put({type: 'REQUEST_MEMBERS_REQUEST'})
      yield call(members.request, action.orgId)
      yield put({type: 'RECEIVE_MEMBERS_REQUEST'})
    } catch (code) {
      const alert = {
        action: 'request',
        color: 'red',
        code,
        msg: 'Organization access could not be requested'
      }
      yield put({type: 'ALERT', alert})
    }
  }
}

function* approve() {
  while (true) {
    const action = yield take('MEMBERS_APPROVE')
    try {
      yield put({type: 'REQUEST_MEMBERS_APPROVE'})
      yield call(members.approve, action.id)
      yield put({type: 'RECEIVE_MEMBERS_APPROVE'})
    } catch (code) {
      const alert = {
        action: 'approve',
        color: 'red',
        code,
        msg: 'Membership could not be granted'
      }
      yield put({type: 'ALERT', alert})
    }
  }
}

function* admin() {
  while (true) {
    const action = yield take('MEMBERS_ADMIN')
    try {
      yield put({type: 'REQUEST_MEMBERS_ADMIN'})
      yield call(members.admin, action.id)
      yield put({type: 'RECEIVE_MEMBERS_ADMIN'})
    } catch (code) {
      const alert = {
        action: 'grant',
        color: 'red',
        code,
        msg: 'Admin privileges could not be granted'
      }
      yield put({type: 'ALERT', alert})
    }
  }
}

function* revoke() {
  while (true) {
    const action = yield take('MEMBERS_REVOKE')
    try {
      yield put({type: 'REQUEST_MEMBERS_REVOKE'})
      yield call(members.revoke, action.id)
      yield put({type: 'RECEIVE_MEMBERS_REVOKE'})
    } catch (code) {
      const alert = {
        action: 'revoke',
        color: 'red',
        code,
        msg: 'Admin privileges could not be revoked'
      }
      yield put({type: 'ALERT', alert})
    }
  }
}

function* deny() {
  while (true) {
    const action = yield take('MEMBERS_DENY')
    try {
      yield put({type: 'REQUEST_MEMBERS_DENY'})
      yield call(members.deny, action.id)
      yield put({type: 'RECEIVE_MEMBERS_DENY'})
    } catch (code) {
      const alert = {
        action: 'deny',
        color: 'red',
        code,
        msg: 'Member could not be denied'
      }
      yield put({type: 'ALERT', alert})
    }
  }
}

function* remove() {
  while (true) {
    const action = yield take('MEMBERS_REMOVE')
    try {
      yield put({type: 'REQUEST_MEMBERS_REMOVE'})
      yield call(members.remove, action.orgId)
      yield put({type: 'RECEIVE_MEMBERS_REMOVE'})
    } catch (code) {
      const alert = {
        action: 'remove',
        color: 'red',
        code,
        msg: 'Organization could not be removed'
      }
      yield put({type: 'ALERT', alert})
    }
  }
}
