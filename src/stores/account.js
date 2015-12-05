"use strict";
let Reflux = require('reflux');
let moment = require('moment');
let account = require('../api/account');
let orgs = require('../api/orgs');
let members = require('../api/members');
let Actions = require('../actions/account');
let msg = require("../actions/alerts").add;
let token = require('../token');

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
  authenticated: false,
  changes: {},
  user: null,
  notifications: [],
  history: [],
  init: function () {
    this.listenTo(Actions.change, this._change);
    this.listenTo(Actions.get, this._get);
    this.listenTo(Actions.edit, this._edit);
    this.listenTo(Actions.deactivate, this._page);
    this.listenTo(Actions.history, this._history);
    this.listenTo(Actions.notifications, this._notifications);
    this.listenTo(Actions.password, this._password);
    this.listenTo(Actions.orgs, this._orgs);
    this.listenTo(Actions.lookup, this._lookup);
    this.listenTo(Actions.createOrganization, this._createOrganization);
    this.listenTo(Actions.joinOrganization, this._joinOrganization);
    this.listenTo(Actions.removeOrganization, this._removeOrganization);
    this.listenTo(Actions.login, this._login);
    this.listenTo(Actions.register, this._register);
    this.listenTo(Actions.request, this._request);
    this.listenTo(Actions.forgot, this._forgot);
    this.listenTo(Actions.reset, this._reset);
    this.listenTo(Actions.logout, this._logout);
    this.listenTo(Actions.contact, this._contact);
  },
  _change: function (key, value) {
    this.changes[key] = value;
    this.trigger({changes: this.changes});
  },
  _get: function () {
    account.get()
    .then(data => {
      this.authenticated = true;
      this.user = data;
      this.trigger({user: data, action: 'get'});
      gaDimensions(data);
    })
    .catch(code => {
      this.authenticated = false;
      this.user = null;
      msg('yellow', 'Account could not be loaded', code);
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
      this.trigger({code: code});
      msg('red', 'Account could not be updated', code);
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
      this.trigger({code: code});
      msg('red', 'Account could not be deactivated', code);
    });
  },
  _notifications: function () {
     account.notifications({})
     .then(data => {
       this.trigger({notifications: data});
     })
     .catch(code => {
       this.trigger({code: code});
       msg('yellow', 'Notifications could not be loaded', code);
     });
  },
  _history: function () {
    account.history({})
    .then(data => {
      this.trigger({history: data});
    })
    .catch(code => {
      this.trigger({code: code});
      msg('yellow', 'History could not be loaded', code);
    });
  },
  _password: function (current, updated) {
    account.password(current, updated)
    .then(data => {
      this.trigger({action: 'password'});
    })
    .catch(code => {
      this.trigger({code: code, action: 'password'});
      msg('red', 'Password could not be updated', code);
    });
  },
  _orgs: function () {
    account.orgs()
    .then(data => {
      this.trigger({orgs: data});
    })
    .catch(code => {
      this.trigger({code: code});
      msg('yellow', 'Organizations could not be loaded', code);
    });
  },
  _lookup: function (name) {
    orgs.lookup(name)
    .then(data => {
      this.trigger({lookup: data});
    })
    .catch(code => {
      this.trigger({code: code});
      msg('yellow', 'Organizations lookup could not be loaded', code);
    });
  },
  _createOrganization: function (name) {
    orgs.add(name)
    .then(data => {
      this.trigger({org: data});
    })
    .catch(code => {
      this.trigger({code: code});
      msg('yellow', 'Organization could not be created', code);
    });
  },
  _joinOrganization: function (orgId) {
    members.request(orgId)
    .then(data => {
      this.trigger({request: data});
      this._orgs();
    })
    .catch(code => {
      this.trigger({code: code});
      msg('yellow', 'Organization access could not be requested', code);
    });
  },
  _removeOrganization: function (orgId) {
    members.remove(orgId)
    .then(data => {
      this.trigger({remove: data});
      this._orgs();
    })
    .catch(code => {
      this.trigger({code: code});
      msg('yellow', 'Organization could not be removed', code);
    });
  },
  _login: function (email, password) {
    account.login(email, password)
    .then((data) => {
      this.authenticated = true;
      token.save(data);
      this._get();
      this.trigger({code: 200, action: 'login'});
    })
    .catch((code) => {
      this.trigger({code: code, action: 'login'});
      msg('red', 'Login unsuccessful', code);
    });
  },
  _register: function (email, password) {
    account.register(email, password)
    .then((data) => {
      this._login(email, password);
      this.trigger({action: 'register'});
    })
    .catch((code) => {
      this.trigger({code: code, action: 'register'});
      msg('red', 'Registration unsuccessful', code);
    });
  },
  _request: function (email) {
    let password = Math.random().toString(36).slice(2);
    account.register(email, password)
    .then((data) => {
      this.trigger({code: 202});
      msg('green', 'Request complete', 202);
    })
    .catch((code) => {
      this.trigger({code: code});
      msg('red', 'Request unsuccessful', code);
    });
  },
  _forgot: function (email) {
    account.forgot(email)
    .then(data => {
      this.trigger({code: 200, action: 'forgot'});
    })
    .catch(code => {
      this.trigger({code: code, action: 'forgot'});
      msg('red', 'Password reset link could not be sent', code);
    });
  },
  _reset: function (email, password, token, userId) {
    account.reset(email, password, token, userId)
    .then(data => {
      this.trigger({code: 200, action: 'reset'});
    })
    .catch(code => {
      this.trigger({code: code, action: 'reset'});
      msg('red', 'Password reset link could not be sent', code);
    });
  },
  _logout: function () {
    token.remove();
    this.user = null;
    this.authenticated = false;
    this.trigger({user: this.user});
  },
  _contact: function (email, message) {
    account.contact(email, message)
    .then(data => {
      this.trigger({code: 200, action: 'contact'});
    })
    .catch(code => {
      this.trigger({code: code, action: 'contact'});
      msg('red', 'Message could not be sent', code);
    });
  }
});
