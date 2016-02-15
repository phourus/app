"use strict";
let Reflux = require('reflux');

let Actions = require('../actions/auth');

let account = require('../api/account');

module.exports = Reflux.createStore({
  init: function () {
    this.listenTo(Actions.request, this._request);
    this.listenTo(Actions.forgot, this._forgot);
    this.listenTo(Actions.reset, this._reset);
    this.listenTo(Actions.password, this._password);
  },
  _request: function (email) {
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
  },
  _forgot: function (email) {
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
  },
  _reset: function (email, password, token, userId) {
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
  },
  _password: function (current, updated) {
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
});
