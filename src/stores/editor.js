"use strict";
let Reflux = require('reflux');
let Actions = require('../actions/editor');
let { account, single, add, save, remove, reset, change, Tags, Links } = Actions;
let msg = require("../actions/alerts").add;

let posts = require('../api/posts');
let tags = require('../api/tags');
let links = require('../api/links');

let Editor = Reflux.createStore({
  init: function () {
    let self = this;
    this.post = {};
    this.changes = {};
    this.listenTo(account, this._account);
    this.listenTo(single, this._single);
    this.listenTo(add, this._add);
    this.listenTo(save, this._save);
    this.listenTo(remove, this._remove);
    this.listenTo(reset, this._reset);
    this.listenTo(change, this._change);
  },
  _account: function () {
    posts.account()
    .then(data => {
      this.trigger({posts: data.rows, total: data.total});
    })
    .catch(code => {
      if (code != 200) {
         msg('yellow', 'Posts could not be loaded', code);
      }
    });
  },
  _single: function (id) {
    posts.single(id)
    .then(data => {
      this.post = data;
      this.trigger({post: data});
    })
    .catch(code => {
      if (code != 200) {
          msg('yellow', 'Post could not be loaded', code);
       }
    });
  },
  _refresh: function () {
    this._single(this.post.id);
  },
  _add: function (model) {
    posts.add(this.changes)
    .then(data => {
      //msg('green', 'Post created successfully');
      this.trigger({post: data, add: true});
    })
    .catch(code => {
       msg('red', 'Post could not be created', code);
       return;
    });
  },
  _save: function () {
    posts.save(this.post.id, this.changes)
    .then(data => {
      this._single(this.post.id);
    })
    .catch(code => {
      if (code != 204) {
        msg('red', 'Post could not be saved', code);
        return;
      }
    });
  },
  _change: function (key, value) {
    this.changes[key] = value;
    this.trigger({changes: this.changes});
  },
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

module.exports = Editor;
