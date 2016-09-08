import { call, put, take, spawn } from 'redux-saga/effects'

import collaborators from '../../../../api/collaborators'

export default function* init() {
  yield [
    spawn(collection),
    spawn(add),
    spawn(remove),
    spawn(lookup)
  ]
}

function* collection() {
  while (true) {
    const action = yield take('COLLABORATORS_LIST')
    yield put({type: 'REQUEST_COLLABORATORS_LIST'})
    try {
      const data = yield call(collaborators.collection, action.postId)
      yield put({type: 'RECEIVE_COLLABORATORS_LIST', data})
    } catch(code) {
      const alert = {
        action: 'collection',
        color: 'red',
        code,
        msg: 'Collaborators could not be loaded'
      }
      yield put({type: 'ALERT', alert})
    }
  }
}

function* add() {
  while (true) {
    const action = yield take('COLLABORATORS_ADD')
    yield put({type: 'REQUEST_COLLABORATORS_ADD'})
    try {
      const data = yield call(collaborators.add, action.model)
      yield put({type: 'RECEIVE_COLLABORATORS_ADD', data})
    } catch(code) {
      const alert = {
        action: 'add',
        color: 'red',
        code,
        msg: 'Collaborator could not be added'
      }
      yield put({type: 'ALERT', alert: alert})
    }
  }
}

function* remove() {
  while (true) {
    const action = yield take('COLLABORATORS_REMOVE')
    yield put({type: 'REQUEST_COLLABORATORS_REMOVE'})
    try {
      const data = yield call(collaborators.remove, action.type, action.id)
      yield put({type: 'RECEIVE_COLLABORATORS_REMOVE', data})
      //this._refresh();
    } catch(code) {
      const alert = {
        action: 'remove',
        color: 'red',
        code,
        msg: 'Collaborator could not be removed'
      };
      dispatch({type: 'ALERT', alert})
    }
  }
}

function* lookup() {
  while (true) {
    const action = yield take('COLLABORATORS_LOOKUP')
    yield put({type: 'REQUEST_COLLABORATORS_LOOKUP'})
    try {
      const data = yield call(collaborators.lookup, action.orgId)
      yield put({type: 'RECEIVE_COLLABORATORS_LOOKUP', data})
    } catch(code) {
      const alert = {
        action: 'lookup',
        color: 'red',
        code,
        msg: 'Lookup could not be loaded'
      }
      yield put({type: 'ALERT', alert})
    }
  }
}
