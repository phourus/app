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
      let alert = {
        action: 'collection',
        color: 'red',
        code: code,
        msg: 'Collaborators could not be loaded'
      };
      this.trigger({alert: alert});
      console.warn(alert);
    });
  },
  _add: function (model) {
    collaborators.add(model)
    .then(data => {
      this._refresh();
    })
    .catch(code => {
      let alert = {
        action: 'add',
        color: 'red',
        code: code,
        msg: 'Collaborator could not be added'
      };
      this.trigger({alert: alert});
      console.warn(alert);
    });
  },
  _remove: function (type, id) {
    collaborators.remove(type, id)
    .then(data => {
      this._refresh();
    })
    .catch(code => {
      let alert = {
        action: 'remove',
        color: 'red',
        code: code,
        msg: 'Collaborator could not be removed'
      };
      this.trigger({alert: alert});
      console.warn(alert);
    });
  },
  _lookup: function (orgId) {
    collaborators.lookup(orgId)
    .then(data => {
      this.trigger({lookup: data});
    })
    .catch(code => {
      let alert = {
        action: 'lookup',
        color: 'red',
        code: code,
        msg: 'Lookup could not be loaded'
      };
      this.trigger({alert: alert});
      console.warn(alert);
    });
  },
  _refresh: function () {
    this._collection(this.postId);
  }
});
