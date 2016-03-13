"use strict";
import users from '../api/users'
import account from '../api/account'

export function change(key, value) {
  return (dispatch, getState) => {
    let changes = getState().changes;
    changes[key] = value;
    dispatch({type: 'CHANGE_USER', changes});
  }
}

export function single(id) {
  return (dispatch) => {
    dispatch({type: 'REQUEST_SINGLE_USER'});
    users.single(id)
    .then(data => {
      dispatch({type: 'RECEIVE_SINGLE_USER', data, id});
    })
    .catch(code => {
      if (code != 200) {
        let alert = {
          action: 'load',
          color: 'red',
          code: code,
          msg: 'User could not be loaded'
        };
        dispatch({type: 'ALERT', alert});
        console.warn(alert);
      }
    });
  }
}

export function save() {
  return (dispatch, getState) => {
    let changes = getState().changes;
    account.edit(changes)
    .then(data => {
      if (code == 204) {
        let alert = {
          action: 'save',
          color: 'green',
          code: code,
          msg: 'Account updated'
        };
        dispatch({type: 'ALERT', alert});
      }
    })
    .catch(code => {
      let alert = {
        action: 'save',
        color: 'red',
        code: code,
        msg: 'Account could not be updated'
      };
      dispatch({type: 'ALERT', alert});
      console.warn(alert);
    });
  }
}

export function deactivate() {
  return (dispatch) => {
    account.deactivate
    .then(code => {
      if (code == 202) {
        let alert = {
          action: 'deactivate',
          color: 'green',
          code: code,
          msg: 'Account deactivated'
        };
        dispatch({type: 'ALERT', alert});
      }
    })
    .catch(code => {
      let alert = {
        action: 'deactivate',
        color: 'red',
        code: code,
        msg: 'Account could not be deactivated'
      };
      dispatch({type: 'ALERT', alert});
      console.warn(alert);
    });
  }
}
