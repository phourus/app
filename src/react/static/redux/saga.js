import { call, put, take, spawn } from 'redux-saga/effects'

import account from '../../../api/account'
import pages from '../../../api/pages'

export default function* init() {
  yield [
    spawn(contact),
    spawn(page)
  ]
}

function* contact(email, message) {
  while (true) {
    const action = yield take('CONTACT_SUBMIT')
    try {
      yield put({type: 'REQUEST_CONTACT_SUBMIT'})
      yield call(account.contact, action.email, action.message)
      yield put({type: 'RECEIVE_CONTACT_SUBMIT'})
      yield put({type: 'ALERT', alert: {
        action: 'contact',
        color: 'green',
        code: 200,
        msg: 'Message sent'
      }})
    } catch (code) {
      const alert = {
        action: 'contact',
        color: 'red',
        code,
        msg: 'Message could not be sent'
      }
      yield put({type: 'ALERT', alert})
    }
  }
}

function* page(id) {
  while (true) {
    const action = yield take('PAGE_GET')
    try {
      yield put({type: 'REQUEST_PAGE_GET'})
      const data = yield call(pages.get, action.page)
      yield put({type: 'RECEIVE_PAGE_GET', page: data, id: action.page})
    } catch (code) {
      const alert = {
        action: 'load',
        color: 'yellow',
        code,
        msg: 'Page could not be loaded'
      }
      yield put({type: 'ALERT', alert})
    }
  }
}
