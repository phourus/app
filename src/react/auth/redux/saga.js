import { call, put, take, spawn } from 'redux-saga/effects'

import moment from 'moment'
import storage from '../../../lib/storage'
import ga from '../../../lib/analytics'

// ms * sec * min * hours * days;
const TTL = 1000 * 60 * 60 * 24 * 30

let gaDimensions = function (user) {
  let age = moment().diff(user.dob, "years")
  ga('set', 'dimension1', user.id)
  ga('set', 'dimension2', user.createdAt)
  ga('set', 'dimension3', age)
  ga('set', 'dimension4', user.gender)
  ga('set', 'dimension5', user.occupation)
  ga('set', 'dimension6', user.city)
  ga('set', 'dimension7', user.state)
}

import account from '../../../api/account'

export default function* init() {
  yield [
    spawn(get),
    spawn(login),
    spawn(logout),
    spawn(orgs),
    spawn(request),
    spawn(forgot),
    spawn(reset),
    spawn(password),
    spawn(register)
  ]
}

function* get() {
  while (true) {
    yield put({type: 'REQUEST_SESSION_GET'})
    try {
      const token = yield call(storage.get, 'token')
      const session = yield call(account.get)
      yield put({type: 'RECEIVE_SESSION_GET', session})
      yield put({type: 'SESSION_ORGS'})
      gaDimensions(session)
    } catch(code) {
      if (code !== 401) {
        const alert = {
          action: 'get',
          color: 'yellow',
          code,
          msg: 'Account could not be loaded'
        }
        yield put({type: 'ALERT', alert})
      }
    }
    yield take('SESSION_GET')
  }
}

function* login() {
  while (true) {
    const action = yield take('SESSION_LOGIN')
    try {
      yield put({type: 'REQUEST_SESSION_LOGIN'})
      const data = yield call(account.login, action.email, action.password)
      yield call(storage.set, 'token', data, TTL)
      yield put({type: 'SESSION_GET'})
    } catch(code) {
      const alert = {
        action: 'login',
        color: 'red',
        code: code,
        msg: 'Login unsuccessful'
      }
      yield put({type: 'ALERT', alert})
    }
  }
}

function* logout() {
  while (true) {
    yield take('SESSION_LOGOUT')
    try {
      yield call(storage.del('token'))
    } catch(code) {
      const alert = {
        action: 'logout',
        color: 'red',
        code,
        msg: 'Logout unsuccessful'
      }
      yield put({type: 'ALERT', alert})
    }
  }
}

function* orgs() {
  while (true) {
    const action = yield take('SESSION_ORGS')
    try {
      yield put({type: 'REQUEST_SESSION_ORGS'})
      const data = yield call(account.orgs)
      yield put({type: 'RECEIVE_SESSION_ORGS', orgs: data})
    } catch(code) {
      if (code !== 401) {
        const alert = {
          action: 'organizations',
          color: 'yellow',
          code,
          msg: 'Organizations could not be loaded'
        }
        yield put({type: 'ALERT', alert})
      }
    }
  }
}

function* request(email) {
  while (true) {
    const action = yield take('AUTH_REGISTER')
    try {
      const password = Math.random().toString(36).slice(2)
      yield put({type: 'REQUEST_AUTH_REGISTER'})
      yield call(account.register, action.email, action.password)
      yield put({type: 'ALERT', alert: {
        action: 'request',
        color: 'green',
        code: 202,
        msg: 'Request complete'
      }})
      yield put({type: 'RECEIVE_AUTH_REGISTER'})
    } catch (code) {
      const alert = {
        action: 'request',
        color: 'red',
        code,
        msg: 'Request unsuccessful'
      }
      yield put({type: 'ALERT', alert})
    }
  }
}

function* forgot(email) {
  while (true) {
    const action = yield take('AUTH_FORGOT')
    try {
      yield put({type: 'REQUEST_AUTH_FORGOT'})
      yield call(account.forgot, action.email)
      yield put({type: 'RECEIVE_AUTH_FORGOT'})
    } catch (code) {
      const alert = {
        action: 'forgot',
        color: 'red',
        code,
        msg: 'Password reset link could not be sent'
      }
      yield put({type: 'ALERT', alert})
    }
  }
}

function* reset(email, password, token, userId) {
  while (true) {
    const action = yield take('AUTH_RESET')
    try {
      yield put({type: 'REQUEST_AUTH_RESET'})
      yield call(account.reset, action.email, action.password, action.token, action.userId)
      yield put({type: 'RECEIVE_AUTH_RESET'})
    } catch (code) {
      const alert = {
        action: 'reset',
        color: 'red',
        code,
        msg: 'Password reset link could not be sent'
      }
      yield put({type: 'ALERT', alert})
    }
  }
}

function* password(current, updated) {
  while (true) {
    const action = yield take('AUTH_PASSWORD')
    try {
      yield put({type: 'REQUEST_AUTH_PASSWORD'})
      yield call(account.password, action.current, action.updated)
      yield put({type: 'RECEIVE_AUTH_PASSWORD'})
    } catch (code) {
      const alert = {
        action: 'password',
        color: 'red',
        code,
        msg: 'Password could not be updated'
      }
      yield put({type: 'ALERT', alert})
    }
  }
}

function* register(email, password, username) {
  while (true) {
    const action = yield take('AUTH_REGISTER')
    try {
      yield put({type: 'REQUEST_AUTH_REGISTER'})
      yield call(account.register, action.email, action.password, action.username)
      yield put({type: 'RECEIVE_AUTH_REGISTER'})
    } catch (code) {
      const alert = {
        action: 'register',
        color: 'red',
        code,
        msg: 'Registration unsuccessful'
      }
      yield put({type: 'ALERT', alert})
    }
  }
}
