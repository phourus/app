"use strict";
let Reflux = require('reflux');
let msg = require("../actions/alerts").add;

let { User, Org } = require('../actions/profile');
let users = require('../api/users');
let orgs = require('../api/orgs');

let Profile = Reflux.createStore({
  init: function () {
    let self = this;
    this.listenTo(User.single, this._user);
    this.listenTo(Org.single, this._org);
  },
  _user: function (id) {
    users.single(id)
      .then(data => {
        this.trigger(data);
      })
      .catch(code => {
        if (code != 200) {
           msg('red', 'User could not be loaded', code);
        }
      });
  },
  _org: function (id) {
    orgs.single(id)
      .then(data => {
        this.trigger(data);
      })
      .catch(code => {
        if (code != 200) {
           msg('red', 'Organization could not be loaded', code);
        }
      });
  }
});

module.exports = Profile;
