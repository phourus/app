"use strict";
let Reflux = require('reflux');

let Actions = require('../../actions/post/folders');

let folders = require('../../api/folders');

let msg = require("../../actions/alerts").add;

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
         console.error(code);
         msg('red', 'Folders could not be loaded', code);
      }
    });
  },
  _add: function (model) {
    folders.add(model)
    .then(data => {
      this.trigger({added: data});
    })
    .catch(code => {
      msg('red', 'Folder could not be created', code);
    });
  },
  _remove: function (id) {
    folders.remove(id)
    .then(data => {
      this.trigger({removed: id});
    })
    .catch(code => {
      msg('red', 'Folder could not be removed', code);
    });
  }
});
