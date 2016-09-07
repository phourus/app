let Reflux = require('reflux');

let Actions = require('../../actions/post/thumbs');

let thumbs = require('../../api/thumbs');

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
      let alert = {
        action: 'load',
        color: 'red',
        code: code,
        msg: 'Thumbs could not be loaded'
      };
      this.trigger({alert: alert});
      console.warn(alert);
    });
  },
  _add: function (model) {
    thumbs.add(model)
    .then(data => {
      this._post(this.postId);
    })
    .catch(code => {
      let alert = {
        action: 'add',
        color: 'red',
        code: code,
        msg: 'Thumb could not be added'
      };
      this.trigger({alert: alert});
      console.warn(alert);
    });
  },
  _save: function (id, model) {
    thumbs.save(id, model)
    .then(data => {
      this._post(this.postId);
    })
    .catch(code => {
      let alert = {
        action: 'save',
        color: 'red',
        code: code,
        msg: 'Thumb could not be saved'
      };
      this.trigger({alert: alert});
      console.warn(alert);
    });
  },
  _remove: function (id) {
    thumbs.remove(id)
    .then(data => {
      this.trigger({id: null, positive: null});
    })
    .catch(code => {
      let alert = {
        action: 'remove',
        color: 'red',
        code: code,
        msg: 'Thumb could not be removed'
      };
      this.trigger({alert: alert});
      console.warn(alert);
    });
  }
});
