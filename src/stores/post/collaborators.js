"use strict";
let Reflux = require('reflux');

let Actions = require('../../actions/post/collaborators');

let collaborators = require('../../api/collaborators');

module.exports = Reflux.createStore({
  init: function () {
    this.listenTo(Actions.collection, this._collection);
    this.listenTo(Actions.add, this._add);
    this.listenTo(Actions.remove, this._remove);
    this.listenTo(Actions.lookup, this._lookup);
  },
  _collection: function (postId) {
    this.postId = postId;
    collaborators.collection(postId)
    .then(data => {
      this.trigger({list: data});
    })
    .catch(code => {
      msg('red', 'Collaborators could not be loaded', code);
    });
  },
  _add: function (model) {
    collaborators.add(model)
    .then(data => {
      this._refresh();
    })
    .catch(code => {
      msg('red', 'Collaborator could not be added', code);
    });
  },
  _remove: function (type, id) {
    collaborators.remove(type, id)
    .then(data => {
      this._refresh();
    })
    .catch(code => {
      msg('red', 'Collaborator could not be removed', code);
    });
  },
  _lookup: function (orgId) {
    collaborators.lookup(orgId)
    .then(data => {
      this.trigger({lookup: data});
    })
    .catch(code => {
      msg('red', 'Lookup could not be loaded', code);
    });
  },
  _refresh: function () {
    this._collection(this.postId);
  }
});
