"use strict";
let Reflux = require('reflux');
let msg = require("../actions/alerts").add;

let { User, Org } = require('../actions/profile');
let users = require('../api/users');
let orgs = require('../api/orgs');

let Profile = {};
Profile.User = Reflux.createStore({
  init: function () {
    let self = this;
    this.listenTo(User.single, this.)
    users.on('single', function (code, data) {
        if (code != 200) {
            msg('yellow', 'User could not be loaded', code);
            return;
        }
        self.trigger({profile: data});
    });
  },
  _single: function (id) {
    users.single(id);
  }
});

Profile.Org = Reflux.createStore({
  init: function () {
    let self = this;
    this.listenTo(Org.single, this._single);
    orgs.on('single', function (code, data) {
        if (code != 200) {
            msg('red', 'Organization could not be loaded', code);
            return;
        }
        self.trigger({profile: data});
    });
  },
  _single: function (id) {
    orgs.single(id);
  }
});

module.exports = Profile;
