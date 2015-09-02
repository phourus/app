"use strict";
let Reflux = require('reflux');
let account = require('../api/account');
let Actions = require('../actions/account');
let msg = require("../actions/alerts").add;
let token = require('../token');

module.exports = Reflux.createStore({
  authenticated: false,
  changes: {},
  user: null,
  notifications: [],
  history: [],
  init: function () {
    if (token.get()) {
      this.authenticated = true;
    }
    this.listenTo(Actions.change, this._change);
    this.listenTo(Actions.get, this._get);
    this.listenTo(Actions.edit, this._edit);
    this.listenTo(Actions.password, this._search);
    this.listenTo(Actions.deactivate, this._page);
    this.listenTo(Actions.history, this._history);
    this.listenTo(Actions.notifications, this._notifications);
    this.listenTo(Actions.orgs, this._orgs);
    this.listenTo(Actions.login, this._login);
    this.listenTo(Actions.register, this._register);
    this.listenTo(Actions.logout, this._logout);
  },
  _change: function (key, value) {
    this.changes[key] = value;
    this.trigger({changes: this.changes});
  },
  _get: function () {
    account.get()
    .then(data => {
      this.user = data;
      this.trigger({user: data});
    })
    .catch(code => {
      this.authenticated = false;
      this.user = null;
      if (code != 200) {
        msg('yellow', 'Account could not be loaded', code);
      }
    });
  },
  _edit: function () {
    account.edit(this.changes)
    .then(data => {
      if (code == 204) {
        msg('green', 'Account updated', code);
      }
    })
    .catch(code => {
      msg('red', 'Account could not be updated', code);
    });
  },
  _password: function (current, updated) {
    account.password(current, updated)
    .then(code => {
      if (code == 204) {
          msg('green', 'Password updated', code);
      }
    })
    .catch(code => {
      msg('red', 'Password could not be updated', code);
    });
  },
  _deactivate: function () {
    account.deactive
    .then(code => {
      if (code == 202) {
          msg('green', 'Account deactivated', code);
      }
    })
    .catch(code => {
      msg('red', 'Account could not be deactivated', code);
    });
  },
  _notifications: function () {
     account.notifications({})
     .then(data => {
       this.trigger({notifications: data});
     })
     .catch(code => {
       if (code != 200) {
          msg('yellow', 'Notifications could not be loaded', code);
       }
     });
  },
  _history: function () {
    account.history({})
    .then(data => {
      this.trigger({history: data});
    })
    .catch(code => {
      if (code != 200) {
        msg('yellow', 'History could not be loaded', code);
      }
    });
  },
  _orgs: function () {
    account.orgs()
    .then(data => {
      this.trigger({orgs: data});
    })
    .catch(code => {
      if (code != 200) {
        msg('yellow', 'Organizations could not be loaded', code);
      }
    });
  },
  _login: function (email, password) {
    account.login(email, password)
    .then((data) => {
      this.authenticated = true;
      token.save(data);
      this._get();
    })
    .catch((code) => {
      msg('red', 'Login unsuccessful', code);
    });
  },
  _register: function (email, password) {
    account.register(email, password)
    .then((data) => {
      this._login(email, password);
      msg('green', 'Registration complete', code);
    })
    .catch((code) => {
      msg('red', 'Registration unsuccessful', code);
    });
  },
  _logout: function () {
    token.remove();
    this.user = null;
    this.authenticated = false;
    this.trigger({user: this.user});
  }
});
