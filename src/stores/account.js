"use strict";
let Reflux = require('reflux');
let account = require('../sockets/account');
let { get, edit, password, deactivate, history, notifications } = require('../actions/account');
let msg = require("../actions/alerts").add;

module.exports = Reflux.createStore({
  user: {
      id: null,
      pic: "",
      username: "",
      first: "",
      last: "",
      email: "",
      phone: "",
      company: "",
      occupation: "",
      website: "",
      dob: "",
      gender: "",
      address: {
          street: "",
          city: "",
          state: "",
          zip: ""
      }
  },
  notifications: [],
  history: [],
  init: function () {
    let self = this;
    this.listenTo(get, this._get);
    this.listenTo(edit, this._edit);
    this.listenTo(password, this._search);
    this.listenTo(deactivate, this._page);
    this.listenTo(history, this._history);
    this.listenTo(notifications, this._notifications);

    account.on('get', function (code, data) {
        if (code != 200) {
            msg('yellow', 'Account could not be loaded', code);
            return;
        }
        self.trigger({user: data});
    });
    account.on('edit', function (code, data) {
       if (code == 204) {
           msg('green', 'Account updated', code);
           return;
       }
       msg('red', 'Account could not be updated', code);
    });
    account.on('password', function (code, data) {
       if (code == 204) {
           msg('green', 'Password updated', code);
           return;
       }
       msg('red', 'Password could not be updated', code);
    });
    account.on('deactivate', function (code, data) {
       if (code == 202) {
           msg('green', 'Account deactivated', code);
           return;
       }
       msg('red', 'Account could not be deactivated', code);
    });
    account.on('notifications', function (code, data) {
         if (code != 200) {
            msg('yellow', 'Notifications could not be loaded', code);
            return;
         }
         self.trigger({notifications: data});
     });
     account.on('history', function (code, data) {
          if (code != 200) {
             msg('yellow', 'History could not be loaded', code);
             return;
          }
          self.trigger({history: data});
      });
  },
  _get: function () {
    account.get();
  },
  _edit: function (update) {
    account.edit(update);
  },
  _password: function (current, updated) {
    account.password(current, updated);
  },
  _deactivate: function () {
    account.deactive();
  },
  _notifications: function () {
     account.notifications({});
  },
  _history: function () {
     account.history({});
  }
});
