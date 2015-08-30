let Reflux = require('reflux');
let posts = require('../api/posts');
let thumbs = require('../api/thumbs');
let msg = require("../actions/alerts").add;
let Actions = require('../actions/post');
let { Comments, Thumbs, Tags, Links } = Actions;

let Post = Reflux.createStore({
  init: function () {
    let self = this;
    this.listenTo(Actions.single, this._single);
  },
  _single: function (id) {
    posts.single(id)
    .then(data => {
      this.trigger({post: data, user: data.user});
    })
    .catch(code => {
      console.error(code);
      msg('red', 'Post could not be loaded', code);
    });
  },
  Comments: Reflux.createStore({}),
  Thumbs: Reflux.createStore({}),
  Tags: Reflux.createStore({
    tags: [],
    init: function () {
      let self = this;
      this.listenTo(Tags.collection, this._collection)
      this.listenTo(Tags.add, this._add);
      this.listenTo(Tags.remove, this._remove);
    },
    _collection: function (params) {
      tags.collection(params)
      .then(data => {

      })
      .catch(code => {
        msg('yellow', 'Tags could not be loaded', code);
      });
    },
    _add: function (model) {
      tags.add(model)
      .then(data => {
        Editor._refresh();
      })
      .catch(code => {
        msg('red', 'Tag could not be created', code);
      });
    },
    _remove: function (id) {
      tags.remove(id)
      .then(data => {
        Editor._refresh();
      })
      .catch(code => {
        msg('red', 'Tag could not be removed', code);
      });
    }
  }),
  Links: Reflux.createStore({
    links: [],
    init: function () {
      this.listenTo(Links.collection, this._collection);
      this.listenTo(Links.add, this._add);
      this.listenTo(Links.save, this._save);
      this.listenTo(Links.remove, this._remove);
    },
    _collection: function (params) {
      links.collection(params)
      .then(data => {

      })
      .catch(code => {
        msg('yellow', 'Links could not be loaded', code);
      });
    },
    _add: function (model) {
      links.add(model)
      .then(data => {
        Editor._single(model.postId);
      })
      .catch(code => {
        msg('red', 'Link could not be created', code);
      });
    },
    _save: function (id, model) {
      links.save(id, model)
      .then(data => {
        this.trigger({id: null, url: '', caption: '', mode: 'add'});
        Editor._refresh();
      })
      .catch(code => {
        msg('red', 'Link could not be saved', code);
      });
    },
    _remove: function (id) {
      links.remove(id)
      .then(data => {
        Editor._refresh();
      })
      .catch(code => {
        msg('red', 'Link could not be removed', code);
      });
    }
  })
});

module.exports = Post;
