"use strict";
let Reflux = require('reflux');
let msg = require("../actions/alerts").add;

let Actions = require('../actions/admin');
let { Members, Categories } = Actions;

let orgs = require('../api/orgs');
let members = require('../api/members');

let Admin = Reflux.createStore({
  org: {},
  changes: {},
  init: function () {
    this.listenTo(Actions.single, this._single);
    this.listenTo(Actions.save, this._save);
    this.listenTo(Actions.change, this._change);
  },
  _single: function (id) {
    orgs.single(id)
      .then(data => {
        this.org = data;
        this.trigger({org: data});
      })
      .catch(code => {
        if (code != 200) {
           msg('red', 'Organization could not be loaded', code);
        }
      });
  },
  _save: function () {
    orgs.save(this.org.id, this.changes)
      .then(data => {
        this._single(id);
      })
      .catch(code => {
        if (code != 200) {
           msg('red', 'Organization details could not be saved', code);
        }
      });
  },
  _change: function (key, value) {
    this.changes[key] = value;
    this.trigger({changes: this.changes});
  },
  Members: Reflux.createStore({
    init: function () {
      this.listenTo(Members.collection, this._collection);
      this.listenTo(Members.request, this._request);
      this.listenTo(Members.approve, this._approve);
      this.listenTo(Members.admin, this._admin);
      this.listenTo(Members.revoke, this._revoke);
      this.listenTo(Members.deny, this._deny);
    },
    _collection: function (id) {
      let params = {
        orgId: id
      };
      this.orgId = id;
      members.collection(params)
        .then(data => {
          this.trigger(data);
        })
        .catch(code => {
          if (code != 200) {
             msg('red', 'Members could not be loaded', code);
          }
        });
    },
    _request: function (orgId) {
      members.request(orgId)
        .then(data => {
          this.trigger(data);
        })
        .catch(code => {
          if (code != 200) {
             msg('red', 'Request could not be sent', code);
          }
        });
    },
    _approve: function (id) {
      members.approve(id)
        .then(data => {
          this._collection(this.orgId);
        })
        .catch(code => {
          if (code != 200) {
             msg('red', 'Membership could not be granted', code);
          }
        });
    },
    _admin: function (id) {
      members.admin(id)
        .then(data => {
          this._collection(this.orgId);
        })
        .catch(code => {
          if (code != 200) {
             msg('red', 'Admin privileges could not be granted', code);
          }
        });
    },
    _revoke: function (id) {
      members.revoke(id)
        .then(data => {
          this._collection(this.orgId);
        })
        .catch(code => {
          if (code != 200) {
             msg('red', 'Admin privileges could not be revoked', code);
          }
        });
    },
    _deny: function (id) {
      members.deny(id)
        .then(data => {
          this._collection(this.orgId);
        })
        .catch(code => {
          if (code != 200) {
             msg('red', 'Member could not be denied', code);
          }
        });
    },
  })
});

module.exports = Admin;
