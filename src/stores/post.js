"use strict";
let Reflux = require('reflux');

let Actions = require('../actions/post');
let { Comments, Thumbs, Tags, Links } = Actions;

let posts = require('../api/posts');
let comments = require('../api/comments');
let thumbs = require('../api/thumbs');
let tags = require('../api/tags');
let links = require('../api/links');

let msg = require("../actions/alerts").add;

let Post = Reflux.createStore({
  init: function () {
    let self = this;
    this.post = {};
    this.changes = {};
    this.listenTo(Actions.single, this._single);
    this.listenTo(Actions.account, this._account);
    this.listenTo(Actions.add, this._add);
    this.listenTo(Actions.save, this._save);
    this.listenTo(Actions.remove, this._remove);
    this.listenTo(Actions.reset, this._reset);
    this.listenTo(Actions.change, this._change);
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
  Comments: Reflux.createStore({
    tags: [],
    init: function () {
      let self = this;
      this.listenTo(Comments.collection, this._collection);
      this.listenTo(Comments.add, this._add);
      this.listenTo(Comments.save, this._save);
      this.listenTo(Comments.remove, this._remove);
    },
    _collection: function (params) {
      comments.collection(params)
      .then(data => {

      })
      .catch(code => {
        msg('yellow', 'Tags could not be loaded', code);
      });
    },
    _add: function (model) {
      comments.add(model)
      .then(data => {

      })
      .catch(code => {
        msg('red', 'Tag could not be created', code);
      });
    },
    _remove: function (id) {
      comments.remove(id)
      .then(data => {

      })
      .catch(code => {
        msg('red', 'Tag could not be removed', code);
      });
    },
    _update: function (id, model) {
      comments.update(id, model)
      .then(data => {
        this.trigger({account: data});
      })
      .catch(code => {
        msg('red', 'Tag could not be removed', code);
      });
    }
  }),
  Thumbs: Reflux.createStore({
    tags: [],
    init: function () {
      let self = this;
      this.listenTo(Thumbs.post, this._post);
      this.listenTo(Thumbs.save, this._save);
      this.listenTo(Thumbs.remove, this._remove);
    },
    _post: function (id) {
      thumbs.post(id)
      .then(data => {
        this.trigger({account: data});
      })
      .catch(code => {
        msg('red', 'Tag could not be created', code);
      });
    },
    _remove: function (id) {
      thumbs.remove(id)
      .then(data => {
        this.trigger({account: null});
      })
      .catch(code => {
        msg('red', 'Tag could not be removed', code);
      });
    },
    _update: function (id, model) {
      thumbs.update(id, model)
      .then(data => {
        this.trigger({account: data});
      })
      .catch(code => {
        msg('red', 'Tag could not be removed', code);
      });
    }
  }),
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

      })
      .catch(code => {
        msg('red', 'Tag could not be created', code);
      });
    },
    _remove: function (id) {
      tags.remove(id)
      .then(data => {

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
    _remove: function (id) {
      links.remove(id)
      .then(data => {

      })
      .catch(code => {
        msg('red', 'Link could not be removed', code);
      });
    },
    _update: function (id, model) {
      links.save(id, model)
      .then(data => {
        this.trigger({id: null, url: '', caption: '', mode: 'add'});
      })
      .catch(code => {
        msg('red', 'Link could not be saved', code);
      });
    }
  })
});

module.exports = Post;
