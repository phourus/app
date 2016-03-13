"use strict";
import account from '../api/account'

export function request(email) {
  let password = Math.random().toString(36).slice(2);
  account.register(email, password)
  .then((data) => {
    let alert = {
      action: 'request',
      color: 'green',
      code: 202,
      msg: 'Request complete'
    };
    this.trigger({alert: alert});
    console.warn(alert);
  })
  .catch((code) => {
    this.trigger({code: code});
    let alert = {
      action: 'request',
      color: 'red',
      code: code,
      msg: 'Request unsuccessful'
    };
    this.trigger({alert: alert});
    console.warn(alert);
  });
}

export function forgot(email) {
  account.forgot(email)
  .then(data => {
    this.trigger({code: 200, action: 'forgot'});
  })
  .catch(code => {
    this.trigger({code: code, action: 'forgot'});
    let alert = {
      action: 'forgot',
      color: 'red',
      code: code,
      msg: 'Password reset link could not be sent'
    };
    this.trigger({alert: alert});
    console.warn(alert);
  });
}

export function reset(email, password, token, userId) {
  account.reset(email, password, token, userId)
  .then(data => {
    this.trigger({code: 200, action: 'reset'});
  })
  .catch(code => {
    this.trigger({code: code, action: 'reset'});
    let alert = {
      action: 'reset',
      color: 'red',
      code: code,
      msg: 'Password reset link could not be sent'
    };
    this.trigger({alert: alert});
    console.warn(alert);
  });
}

export function password(current, updated) {
  account.password(current, updated)
  .then(data => {
    this.trigger({action: 'password'});
  })
  .catch(code => {
    let alert = {
      action: 'password',
      color: 'red',
      code: code,
      msg: 'Password could not be updated'
    };
    this.trigger({alert: alert});
    console.warn(alert);
  });
}
