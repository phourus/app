"use strict";
let Reflux = require('reflux');

let Actions = require('../../actions/post/folders');

let folders = require('../../api/folders');

module.exports = Reflux.createStore({
  init: function () {
    this.listenTo(Actions.collection, this._collection);
    this.listenTo(Actions.add, this._add);
    this.listenTo(Actions.remove, this._remove);
  },
  _collection: function () {
    folders.collection({})
    .then(data => {
      this.trigger({folders: data});
    })
    .catch(code => {
      if (code != 200) {
       let alert = {
         action: 'collection',
         color: 'red',
         code: code,
         msg: 'Folders could not be loaded'
       };
       this.trigger({alert: alert});
       console.warn(alert);
      }
    });
  },
  _add: function (model) {
    folders.add(model)
    .then(data => {
      this.trigger({added: data});
    })
    .catch(code => {
      let alert = {
        action: 'add',
        color: 'red',
        code: code,
        msg: 'Folder could not be created'
      };
      this.trigger({alert: alert});
      console.warn(alert);
    });
  },
  _remove: function (id) {
    folders.remove(id)
    .then(data => {
      this.trigger({removed: id});
    })
    .catch(code => {
      let alert = {
        action: 'remove',
        color: 'red',
        code: code,
        msg: 'Folder could not be removed'
      };
      this.trigger({alert: alert});
      console.warn(alert);
    });
  }
});
