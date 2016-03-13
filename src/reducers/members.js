"use strict";
let Reflux = require('reflux');

let Actions = require('../actions/members');

let members = require('../api/members');

module.exports = Reflux.createStore({
  init: function () {
    this.listenTo(Actions.collection, this._collection);
    this.listenTo(Actions.request, this._request);
    this.listenTo(Actions.approve, this._approve);
    this.listenTo(Actions.admin, this._admin);
    this.listenTo(Actions.revoke, this._revoke);
    this.listenTo(Actions.deny, this._deny);
    this.listenTo(Actions.remove, this._remove);
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
           let alert = {
             action: 'load',
             color: 'red',
             code: code,
             msg: 'Members could not be loaded'
           };
           this.trigger({alert: alert});
           console.warn(alert);
        }
      });
  },
  _request: function (orgId) {
    members.request(orgId)
      .then(data => {
        this.trigger(data);
        // this.trigger({request: data});
        // this._orgs();
      })
      .catch(code => {
        if (code != 200) {
           let alert = {
             action: 'request',
             color: 'red',
             code: code,
             msg: 'Request could not be sent'
           };
           this.trigger({alert: alert});
           console.warn(alert);
        }

        // this.trigger({code: code});
        // let alert = {
        //   action: 'join',
        //   color: 'red',
        //   code: code,
        //   msg: 'Organization access could not be requested'
        // };
        // this.trigger({alert: alert});
        // console.warn(alert);
      });
  },
  _approve: function (id) {
    members.approve(id)
      .then(data => {
        this._collection(this.orgId);
      })
      .catch(code => {
        if (code != 200) {
         let alert = {
           action: 'approve',
           color: 'red',
           code: code,
           msg: 'Membership could not be granted'
         };
         this.trigger({alert: alert});
         console.warn(alert);
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
          let alert = {
            action: 'grant',
            color: 'red',
            code: code,
            msg: 'Admin privileges could not be granted'
          };
          this.trigger({alert: alert});
          console.warn(alert);
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
          let alert = {
            action: 'revoke',
            color: 'red',
            code: code,
            msg: 'Admin privileges could not be revoked'
          };
          this.trigger({alert: alert});
          console.warn(alert);
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
          let alert = {
            action: 'deny',
            color: 'red',
            code: code,
            msg: 'Member could not be denied'
          };
          this.trigger({alert: alert});
          console.warn(alert);
        }
      });
  },
  _remove: function (orgId) {
    members.remove(orgId)
    .then(data => {
      this.trigger({remove: data});
      this._orgs();
    })
    .catch(code => {
      this.trigger({code: code});
      let alert = {
        action: 'remove',
        color: 'red',
        code: code,
        msg: 'Organization could not be removed'
      };
      this.trigger({alert: alert});
      console.warn(alert);
    });
  }
})
