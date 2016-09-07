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
      let alert = {
        action: 'add',
        color: 'red',
        code: code,
        msg: 'Tag could not be created'
      };
      this.trigger({alert: alert});
      console.warn(alert);
    });
  },
  _remove: function (id) {
    tags.remove(id)
    .then(data => {
      this.trigger({removed: id});
    })
    .catch(code => {
      let alert = {
        action: 'remove',
        color: 'red',
        code: code,
        msg: 'Tag could not be removed'
      };
      this.trigger({alert: alert});
      console.warn(alert);
    });
  }
});
