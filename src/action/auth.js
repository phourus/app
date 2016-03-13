"use strict";
import account from '../api/account'
//??let password = Math.random().toString(36).slice(2);

export function request(email) {
  return (dispatch) => {
    account.register(email, password)
    .then((data) => {
      let alert = {
        action: 'request',
        color: 'green',
        code: 202,
        msg: 'Request complete'
      };
      dispatch({type: 'ALERT', alert});
      console.warn(alert);
    })
    .catch((code) => {
      let alert = {
        action: 'request',
        color: 'red',
        code: code,
        msg: 'Request unsuccessful'
      };
      dispatch({type: 'ALERT', alert});
      console.warn(alert);
    });
  }
}

export function forgot(email) {
  return (dispatch) => {
    account.forgot(email)
    .then(data => {
      dispatch({code: 200, type: 'FORGOT_PASSWORD'});
    })
    .catch(code => {
      let alert = {
        action: 'forgot',
        color: 'red',
        code: code,
        msg: 'Password reset link could not be sent'
      };
      dispatch({type: 'ALERT', alert});
      console.warn(alert);
    });
  }
}

export function reset(email, password, token, userId) {
  return (dispatch) => {
    account.reset(email, password, token, userId)
    .then(data => {
      dispatch({code: 200, type: 'RESET_PASSWORD'});
    })
    .catch(code => {
      let alert = {
        action: 'reset',
        color: 'red',
        code: code,
        msg: 'Password reset link could not be sent'
      };
      dispatch({type: 'ALERT', alert});
      console.warn(alert);
    });
  }
}

export function password(current, updated) {
  return (dispatch) => {
    account.password(current, updated)
    .then(data => {
      dispatch({type: 'SET_PASSWORD'});
    })
    .catch(code => {
      let alert = {
        action: 'password',
        color: 'red',
        code: code,
        msg: 'Password could not be updated'
      };
      dispatch({alert, type: 'ALERT'});
      console.warn(alert);
    });
  }
}
