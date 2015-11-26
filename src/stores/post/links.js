"use strict";
let Reflux = require('reflux');

let Actions = require('../../actions/post/links');

let links = require('../../api/links');

module.exports = Reflux.createStore({
  init: function () {
    this.listenTo(Actions.add, this._add);
    this.listenTo(Actions.save, this._save);
    this.listenTo(Actions.remove, this._remove);
  },
  _add: function (model) {
    links.add(model)
    .then(data => {
      this.trigger({id: null, title: '', url: '', caption: '', mode: null, added: data});
    })
    .catch(code => {
      this.trigger({code: code, action: 'add'});
      msg('red', 'Link could not be created', code);
    });
  },
  _save: function (id, model) {
    links.save(id, model)
    .then(data => {
      this.trigger({id: null, title: '', url: '', caption: '', mode: null, saved: id});
    })
    .catch(code => {
      this.trigger({code: code, action: 'save'});
      msg('red', 'Link could not be saved', code);
    });
  },
  _remove: function (id) {
    links.remove(id)
    .then(data => {
      this.trigger({removed: id});
    })
    .catch(code => {
      this.trigger({code: code, action: 'remove'});
      msg('red', 'Link could not be removed', code);
    });
  }
});
