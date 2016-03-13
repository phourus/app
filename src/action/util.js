"use strict";
import account from '../api/account'

export function contact(email, message) {
  return (dispatch) => {
    account.contact(email, message)
    .then(data => {
      let alert = {
        action: 'contact',
        color: 'green',
        code: 200,
        msg: 'Message sent'
      };
      dispatch({type: 'ALERT', alert});
    })
    .catch(code => {
      let alert = {
        action: 'contact',
        color: 'red',
        code: code,
        msg: 'Message could not be sent'
      };
      dispatch({type: 'ALERT', alert});
      console.warn(alert);
    });
  }
}
