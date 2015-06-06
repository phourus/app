"use strict";
let Reflux = require('reflux');
let account = require('../api/account');
let { get, edit, password, deactivate, history, notifications, login, register } = require('../actions/account');
let msg = require("../actions/alerts").add;
let token = require('../token');

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
    this.listenTo(get, this._get);
    this.listenTo(edit, this._edit);
    this.listenTo(password, this._search);
    this.listenTo(deactivate, this._page);
    this.listenTo(history, this._history);
    this.listenTo(notifications, this._notifications);
    this.listenTo(login, this._login);
    this.listenTo(register, this._register);
  },
  _get: function () {
    account.get()
    .then(data => {
      this.trigger({user: data});
    })
    .catch(code => {
      if (code != 200) {
          msg('yellow', 'Account could not be loaded', code);
      }
    });
  },
  _edit: function (update) {
    account.edit(update)
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
  _login: function (email, password) {
    account.login(email, password)
    .then((data) => {
      token.save(data);
    })
    .catch((code) => {
      msg('red', 'Login unsuccessful', code);
    });
  },
  _register: function () {
    account.register({})
    .then((data) => {
      msg('green', 'Registration complete', code);
    })
    .catch((err) => {

    });
  }
});
