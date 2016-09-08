import { call, put, take, spawn } from 'redux-saga/effects'

import comments from '../../../../api/comments'

export default function* init() {
  yield [
    spawn(collection),
    spawn(add),
    spawn(save),
    spawn(remove)
  ]
}

function* collection() {
  while(true) {
    const action = yield take('COMMENTS_LIST')
    yield put({type: 'REQUEST_COMMENTS_LIST'})
    try {
      const data = yield call(comments.collection, action.params)
      yield put({type: 'RECEIVE_COMMENTS_LIST', params, data})
    } catch(code) {
      const alert = {
        action: 'collection',
        color: 'yellow',
        code,
        msg: 'Comments could not be loaded'
      }
      yield put({type: 'ALERT', alert})
    }
  }
}

function* add() {
  while(true) {
    const action = yield take('COMMENT_ADD')
    yield put({type: 'REQUEST_COMMENT_ADD'});
    try {
      const data = yield call(comments.add, action.model)
      yield put({type: 'RECEIVE_COMMENT_ADD', data})
    } catch(code) {
      const alert = {
        action: 'add',
        color: 'red',
        code,
        msg: 'Comment could not be created'
      }
      yield put({type: 'ALERT', alert})
    }
  }
}

function* save() {
  while(true) {
    const action = yield take('COMMENT_SAVE')
    yield put({type: 'REQUEST_COMMENT_SAVE'});
    try {
      const data = yield call(comments.save, action.id, action.model)
      yield put({type: 'RECEIVE_COMMENT_SAVE', data})
    } catch(code) {
      const alert = {
        action: 'save',
        color: 'red',
        code,
        msg: 'Comment could not be updated'
      }
      yield put({type: 'ALERT', alert})
    }
  }
}

function* remove() {
  while(true) {
    const action = yield take('COMMENT_REMOVE')
    yield put ({type: 'REQUEST_COMMENT_REMOVE'});
    try {
      const data = yield call(comments.remove, action.id)
      yield put({type: 'RECEIVE_COMMENT_REMOVE', id})
    } catch(code) {
      const alert = {
        action: 'remove',
        color: 'red',
        code,
        msg: 'Comment could not be removed'
      }
      yield put({type: 'ALERT', alert})
    }
  }
}
