"use strict";
import moment from 'moment'

import token from '../token'
import ga from '../analytics'

import account from '../api/account'

// ms * sec * min * hours * days;
const TTL = 1000 * 60 * 60 * 24 * 30;

let gaDimensions = function (user) {
  let age = moment().diff(user.dob, "years");
  ga('set', 'dimension1', user.id);
  ga('set', 'dimension2', user.createdAt);
  ga('set', 'dimension3', age);
  ga('set', 'dimension4', user.gender);
  ga('set', 'dimension5', user.occupation);
  ga('set', 'dimension6', user.city);
  ga('set', 'dimension7', user.state);
}

export function register(email, password, username) {
  return (dispatch) => {
    dispatch({type: 'REQUEST_REGISTER'});
    account.register(email, password, username)
    .then((data) => {
      //this._login(email, password);
      dispatch({type: 'RECEIVE_REGISTER', data});
    })
    .catch((code) => {
      let alert = {
        action: 'register',
        color: 'red',
        code: code,
        msg: 'Registration unsuccessful'
      };
      dispatch({type: 'ALERT', alert});
      console.warn(alert);
    });
  }
}

export function get() {
  return (dispatch) => {
    dispatch({type: 'REQUEST_SESSION'});
    token.onConnect()
    .then(() => {
      token.get('token')
      .then((data) => {
        account.get()
        .then(data => {
          //this._orgs();
          dispatch({type: 'RECEIVE_SESSION', authenticated: true, data});
          gaDimensions(data);
        })
        .catch(code => {
          if (code !== 401) {
            let alert = {
              action: 'get',
              color: 'yellow',
              code: code,
              msg: 'Account could not be loaded'
            };
            dispatch({type: 'ALERT', alert});
          }
        });
      });
    });
  }
}

export function login(email, password) {
  return (dispatch) => {
    dispatch({type: 'REQUEST_LOGIN'});
    account.login(email, password)
    .then((data) => {
      token.onConnect()
      .then(() => {
        token.set('token', data, TTL)
        .then(() => {
          dispatch({type: 'RECEIVE_LOGIN', code: 200});
        });
      })
    })
    .catch((code) => {
      let alert = {
        action: 'login',
        color: 'red',
        code: code,
        msg: 'Login unsuccessful'
      };
      dispatch({type: 'ALERT', alert});
      console.warn(alert);
    });
  }
}

export function logout() {
  return (dispatch) => {
    dispatch({type: 'REQUEST_LOGOUT'});
    token.onConnect()
    .then(() => {
      token.del('token')
      .then(() => {
        this._get();
        dispatch({type: 'RECEIVE_LOGOUT'});
      });
    });
  }
}

export function orgs() {
  return (dispatch) => {
    dispatch({type: 'REQUEST_SESSION_ORGS'});
    account.orgs()
    .then(data => {
      dispatch({type: 'RECEIVE_SESSION_ORGS', data});
    })
    .catch(code => {
      let alert = {
        action: 'organizations',
        color: 'yellow',
        code: code,
        msg: 'Organizations could not be loaded'
      };
      dispatch({type: 'ALERT', alert});
      console.warn(alert);
    });
  }
}
