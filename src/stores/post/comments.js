"use strict";
let Reflux = require('reflux');

let Actions = require('../../actions/post/comments');

let comments = require('../../api/comments');

let msg = require("../../actions/alerts").add;

module.exports = Reflux.createStore({
  init: function () {
    this.listenTo(Actions.collection, this._collection);
    this.listenTo(Actions.add, this._add);
    this.listenTo(Actions.save, this._save);
    this.listenTo(Actions.remove, this._remove);
  },
  _collection: function (params) {
    this.params = params;
    comments.collection(params)
    .then(data => {
      this.trigger(data);
    })
    .catch(code => {
      msg('yellow', 'Comments could not be loaded', code);
    });
  },
  _add: function (model) {
    comments.add(model)
    .then(data => {
      this.trigger({added: data});
    })
    .catch(code => {
      msg('red', 'Comment could not be created', code);
    });
  },
  _save: function (id, model) {
    comments.save(id, model)
    .then(data => {
      this.trigger({saved: data});
    })
    .catch(code => {
      msg('red', 'Comment could not be updated', code);
    });
  },
  _remove: function (id) {
    comments.remove(id)
    .then(data => {
      this.trigger({removed: id});
    })
    .catch(code => {
      msg('red', 'Comment could not be removed', code);
    });
  }
});
