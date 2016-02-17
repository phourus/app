"use strict";
let Reflux = require('reflux');

let Actions = require('../actions/profile').Org;

let orgs = require('../api/orgs');

module.exports = Reflux.createStore({
  init: function () {
    this.listenTo(Actions.change, this._change);
    this.listenTo(Actions.create, this._create);
    this.listenTo(Actions.single, this._single);
    this.listenTo(Actions.save, this._save);
    this.listenTo(Actions.lookup, this._lookup);
    this.listenTo(Actions.deactivate, this._deactivate);
  },
  _change: function (key, value) {
    this.changes[key] = value;
    this.trigger({changes: this.changes});
  },
  _create: function (shortname) {
    orgs.add(shortname)
    .then(data => {
      this.trigger({org: data});
    })
    .catch(code => {
      this.trigger({code: code});
      let alert = {
        action: 'organization',
        color: 'red',
        code: code,
        msg: 'Organization could not be created'
      };
      this.trigger({alert: alert});
      console.warn(alert);
    });
  },
  _single: function (id) {
    orgs.single(id)
      .then(data => {
        this.trigger({org: data});
      })
      .catch(code => {
        if (code != 200) {
          let alert = {
            action: 'load',
            color: 'red',
            code: code,
            msg: 'Organization could not be loaded'
          };
          this.trigger({alert: alert});
          console.warn(alert);
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
           let alert = {
             action: 'save',
             color: 'red',
             code: code,
             msg: 'Organization details could not be saved'
           };
           this.trigger({alert: alert});
           console.warn(alert);
        }
      });
  },
  _lookup: function (name) {
    orgs.lookup(name)
    .then(data => {
      this.trigger({lookup: data});
    })
    .catch(code => {
      this.trigger({code: code});
      let alert = {
        action: 'lookup',
        color: 'yellow',
        code: code,
        msg: 'Organizations lookup could not be loaded'
      };
      this.trigger({alert: alert});
      console.warn(alert);
    });
  },
  _deactivate: function () {
    // orgs.deactivate
    // .then(code => {
    //   if (code == 202) {
    //     msg('green', 'Account deactivated', code);
    //     let alert = {
    //       action: 'deactivate',
    //       color: 'green',
    //       code: code,
    //       msg: 'Account deactivated'
    //     };
    //     this.trigger({alert: alert});
    //   }
    // })
    // .catch(code => {
    //   this.trigger({code: code});
    //   let alert = {
    //     action: 'deactivate',
    //     color: 'red',
    //     code: code,
    //     msg: 'Account could not be deactivated'
    //   };
    //   this.trigger({alert: alert});
    //   console.warn(alert);
    // });
  }
});
