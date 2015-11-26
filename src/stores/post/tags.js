"use strict";
let Reflux = require('reflux');

let Actions = require('../../actions/post/tags');

let tags = require('../../api/tags');

module.exports = Reflux.createStore({
  init: function () {
    this.listenTo(Actions.add, this._add);
    this.listenTo(Actions.remove, this._remove);
  },
  _add: function (model) {
    tags.add(model)
    .then(data => {
      this.trigger({added: data});
    })
    .catch(code => {
      msg('red', 'Tag could not be created', code);
    });
  },
  _remove: function (id) {
    tags.remove(id)
    .then(data => {
      this.trigger({removed: id});
    })
    .catch(code => {
      msg('red', 'Tag could not be removed', code);
    });
  }
});
