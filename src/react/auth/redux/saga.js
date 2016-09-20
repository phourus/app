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
    spawn(request),
    spawn(forgot),
    spawn(reset),
    spawn(password),
    spawn(register),
    spawn(get),
    spawn(login),
    spawn(logout),
    spawn(orgs)
  ]
}


function* request(email) {
  // let password = Math.random().toString(36).slice(2);
  // account.register(email, password)
  // .then((data) => {
  //   let alert = {
  //     action: 'request',
  //     color: 'green',
  //     code: 202,
  //     msg: 'Request complete'
  //   };
  //   this.trigger({alert: alert});
  //   console.warn(alert);
  // })
  // .catch((code) => {
  //   this.trigger({code: code});
  //   let alert = {
  //     action: 'request',
  //     color: 'red',
  //     code: code,
  //     msg: 'Request unsuccessful'
  //   };
  //   this.trigger({alert: alert});
  //   console.warn(alert);
  // });
}

function* forgot(email) {
  // account.forgot(email)
  // .then(data => {
  //   this.trigger({code: 200, action: 'forgot'});
  // })
  // .catch(code => {
  //   this.trigger({code: code, action: 'forgot'});
  //   let alert = {
  //     action: 'forgot',
  //     color: 'red',
  //     code: code,
  //     msg: 'Password reset link could not be sent'
  //   };
  //   this.trigger({alert: alert});
  //   console.warn(alert);
  // });
}

function* reset(email, password, token, userId) {
  // account.reset(email, password, token, userId)
  // .then(data => {
  //   this.trigger({code: 200, action: 'reset'});
  // })
  // .catch(code => {
  //   this.trigger({code: code, action: 'reset'});
  //   let alert = {
  //     action: 'reset',
  //     color: 'red',
  //     code: code,
  //     msg: 'Password reset link could not be sent'
  //   };
  //   this.trigger({alert: alert});
  //   console.warn(alert);
  // });
}

function* password(current, updated) {
  // account.password(current, updated)
  // .then(data => {
  //   this.trigger({action: 'password'});
  // })
  // .catch(code => {
  //   let alert = {
  //     action: 'password',
  //     color: 'red',
  //     code: code,
  //     msg: 'Password could not be updated'
  //   };
  //   this.trigger({alert: alert});
  //   console.warn(alert);
  // });
}

function* register(email, password, username) {
  // account.register(email, password, username)
  // .then((data) => {
  //   this._login(email, password);
  //   this.trigger({action: 'register'});
  // })
  // .catch((code) => {
  //   this.trigger({code: code, action: 'register'});
  //   let alert = {
  //     action: 'register',
  //     color: 'red',
  //     code: code,
  //     msg: 'Registration unsuccessful'
  //   };
  //   this.trigger({alert: alert});
  //   console.warn(alert);
  // });
}

function* get() {
  while (true) {
    yield put({type: 'REQUEST_SESSION_GET'})
    try {
      const token = yield call(storage.get, 'token')
      const session = yield call(account.get)
      yield call(orgs)
      yield put({type: 'RECEIVE_SESSION_GET', session})
      gaDimensions(user)
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
  yield put({type: 'REQUEST_SESSION_ORGS'})
  try {
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
