"use strict";
let Reflux = require('reflux');
let moment = require('moment');

let token = require('../token');
let ga = require('../analytics');

let Actions = require('../actions/session');

let account = require('../api/account');

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
};

module.exports = Reflux.createStore({
  init: function () {
    this.listenTo(Actions.register, this._register);
    this.listenTo(Actions.get, this._get);
    this.listenTo(Actions.login, this._login);
    this.listenTo(Actions.logout, this._logout);
    this.listenTo(Actions.orgs, this._orgs);
  },
  _register: function (email, password, username) {
    account.register(email, password, username)
    .then((data) => {
      this._login(email, password);
      this.trigger({action: 'register'});
    })
    .catch((code) => {
      this.trigger({code: code, action: 'register'});
      let alert = {
        action: 'register',
        color: 'red',
        code: code,
        msg: 'Registration unsuccessful'
      };
      this.trigger({alert: alert});
      console.warn(alert);
    });
  },
  _get: function () {
    token.onConnect()
    .then(() => {
      token.get('token')
      .then((data) => {
        account.get()
        .then(data => {
          this._orgs();
          this.trigger({authenticated: true, user: data, action: 'get'});
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
            this.trigger({alert: alert});
          }
        });
      });
    });
  },
  _login: function (email, password) {
    account.login(email, password)
    .then((data) => {
      token.onConnect()
      .then(() => {
        token.set('token', data, TTL)
        .then(() => {
          this._get();
          this.trigger({code: 200, action: 'login'});
        });
      })
    })
    .catch((code) => {
      this.trigger({code: code, action: 'login'});
      let alert = {
        action: 'login',
        color: 'red',
        code: code,
        msg: 'Login unsuccessful'
      };
      this.trigger({alert: alert});
      console.warn(alert);
    });
  },
  _logout: function () {
    token.onConnect()
    .then(() => {
      token.del('token')
      .then(() => {
        this._get();
        this.trigger({authenticated: false, user: {}, action: 'logout'});
      });
    });
  },
  _orgs: function () {
    account.orgs()
    .then(data => {
      this.trigger({orgs: data});
    })
    .catch(code => {
      this.trigger({code: code});
      let alert = {
        action: 'organizations',
        color: 'yellow',
        code: code,
        msg: 'Organizations could not be loaded'
      };
      this.trigger({alert: alert});
      console.warn(alert);
    });
  },
});
