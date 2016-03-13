"use strict";
import account from '../api/account'

export function notifications() {
  return (dispatch) => {
     dispatch({type: 'REQUEST_NOTIFICATIONS'});
     account.notifications({})
     .then(data => {
       dispatch({type: 'RECEIVE_NOTIFICATIONS', data});
     })
     .catch(code => {
       let alert = {
         action: 'notifications',
         color: 'yellow',
         code: code,
         msg: 'Notifications could not be loaded'
       };
       dispatch({type: 'ALERT', alert});
     });
  }
}

export function history() {
  return (dispatch) => {
    dispatch({type: 'REQUEST_HISTORY'});
    account.history({})
    .then(data => {
      dispatch({type: 'RECEIVE_HISTORY', data});
    })
    .catch(code => {
      let alert = {
        action: 'history',
        color: 'yellow',
        code: code,
        msg: 'History could not be loaded'
      };
      dispatch({type: 'ALERT', alert});
      console.warn(alert);
    });
  }
}
