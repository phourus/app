let Reflux = require('reflux');

let Actions = require('../../actions/post/comments');

let comments = require('../../api/comments');

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
      let alert = {
        action: 'collection',
        color: 'yellow',
        code: code,
        msg: 'Comments could not be loaded'
      };
      this.trigger({alert: alert});
      console.warn(alert);
    });
  },
  _add: function (model) {
    comments.add(model)
    .then(data => {
      this.trigger({added: data});
    })
    .catch(code => {
      let alert = {
        action: 'add',
        color: 'red',
        code: code,
        msg: 'Comment could not be created'
      };
      this.trigger({alert: alert});
      console.warn(alert);
    });
  },
  _save: function (id, model) {
    comments.save(id, model)
    .then(data => {
      this.trigger({saved: data});
    })
    .catch(code => {
      let alert = {
        action: 'save',
        color: 'red',
        code: code,
        msg: 'Comment could not be updated'
      };
      this.trigger({alert: alert});
      console.warn(alert);
    });
  },
  _remove: function (id) {
    comments.remove(id)
    .then(data => {
      this.trigger({removed: id});
    })
    .catch(code => {
      let alert = {
        action: 'remove',
        color: 'red',
        code: code,
        msg: 'Comment could not be removed'
      };
      this.trigger({alert: alert});
      console.warn(alert);
    });
  }
});
