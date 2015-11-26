"use strict";
let Reflux = require('reflux');

let Actions = require('../../actions/post/thumbs');

let thumbs = require('../../api/thumbs');

let msg = require("../../actions/alerts").add;

module.exports = Reflux.createStore({
  postId: null,
  init: function () {
    // Thumbs.post responsible for retrieving user + post value
    this.listenTo(Actions.post, this._post);
    this.listenTo(Actions.add, this._add);
    this.listenTo(Actions.save, this._save);
    this.listenTo(Actions.remove, this._remove);
  },
  _post: function (id) {
    this.postId = id;
    thumbs.post(id)
    .then(data => {
      if (data) {
        this.trigger(data);
      }
    })
    .catch(code => {
      msg('red', 'Thumbs could not be loaded', code);
    });
  },
  _add: function (model) {
    thumbs.add(model)
    .then(data => {
      this._post(this.postId);
    })
    .catch(code => {
      msg('red', 'Thumb could not be added', code);
    });
  },
  _save: function (id, model) {
    thumbs.save(id, model)
    .then(data => {
      this._post(this.postId);
    })
    .catch(code => {
      msg('red', 'Thumb could not be saved', code);
    });
  },
  _remove: function (id) {
    thumbs.remove(id)
    .then(data => {
      this.trigger({id: null, positive: null});
    })
    .catch(code => {
      msg('red', 'Thumb could not be removed', code);
    });
  }
});
