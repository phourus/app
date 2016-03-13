"use strict";
import account from '../api/account'

export function contact(email, message) {
  account.contact(email, message)
  .then(data => {
    let alert = {
      action: 'contact',
      color: 'green',
      code: 200,
      msg: 'Message sent'
    };
    this.trigger({alert: alert});
  })
  .catch(code => {
    let alert = {
      action: 'contact',
      color: 'red',
      code: code,
      msg: 'Message could not be sent'
    };
    this.trigger({alert: alert});
    console.warn(alert);
  });
}
