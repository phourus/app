import { call, put, take, spawn } from 'redux-saga/effects'

import folders from '../../../../api/folders'

export default function* init() {
  yield [
    spawn(collection),
    spawn(add),
    spawn(remove)
  ]
}

function* collection() {
  while(true) {
    const action = yield take('FOLDERS_LIST')
    yield put({type: 'REQUEST_FOLDERS_LIST'})
    try {
      const data = yield call(folders.collection, {})
      yield put({type: 'RECEIVE_FOLDERS_LIST', data})
    } catch(code) {
      const alert = {
        action: 'collection',
        color: 'red',
        code,
        msg: 'Folders could not be loaded'
      }
      yield put({type: 'ALERT', alert})
    }
  }
}

function* add() {
  while(true) {
    const action = yield take('FOLDERS_ADD')
    yield put({type: 'REQUEST_FOLDER_ADD'})
    try {
      const data = yield call(folders.add, model)
      yield put({type: 'RECEIVE_FOLDER_ADD', data})
    } catch(code) {
      const alert = {
        action: 'add',
        color: 'red',
        code,
        msg: 'Folder could not be created'
      }
      yield put({type: 'ALERT', alert})
    }
  }
}

function* remove() {
  while(true) {
    const action = yield take('FOLDERS_REMOVE')
    yield put({type: 'REQUEST_FOLDER_REMOVE'})
    try {
      const data = yield call(folders.remove, id)
      yield put({type: 'RECEIVE_FOLDER_REMOVE', id})
    } catch(code) {
      const alert = {
        action: 'remove',
        color: 'red',
        code,
        msg: 'Folder could not be removed'
      }
      yield put({type: 'ALERT', alert})
    }
  }
}
