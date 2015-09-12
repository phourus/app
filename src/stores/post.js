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
    this.post = {};
    this.changes = {};
    this.listenTo(Actions.single, this._single);
    this.listenTo(Actions.refresh, this._refresh);
    this.listenTo(Actions.change, this._change);
    this.listenTo(Actions.add, this._add);
    this.listenTo(Actions.save, this._save);
    this.listenTo(Actions.remove, this._remove);
  },
  _single: function (id) {
    if (!id) {
      this.post = {};
      return;
    }
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
  _add: function () {
    posts.add({title: 'New Post'})
    .then(data => {
      this.trigger({add: true, post: data});
    })
    .catch(code => {
       msg('red', 'Post could not be created', code);
       return;
    });
  },
  _save: function () {
    posts.save(this.post.id, this.changes)
    .then(data => {
      this.trigger({saving: false});
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
    init: function () {
      this.listenTo(Comments.collection, this._collection);
      this.listenTo(Comments.add, this._add);
      this.listenTo(Comments.save, this._save);
      this.listenTo(Comments.remove, this._remove);
    },
    _collection: function (params) {
      this.params = params;
      comments.collection(params)
      .then(data => {
        this.trigger(data);
      })
      .catch(code => {
        msg('yellow', 'Comments could not be loaded', code);
      });
    },
    _add: function (model) {
      comments.add(model)
      .then(data => {
        this._collection(this.params);
      })
      .catch(code => {
        msg('red', 'Comment could not be created', code);
      });
    },
    _save: function (id, model) {
      comments.save(id, model)
      .then(data => {
        this._collection(this.params);
        Post._refresh();
      })
      .catch(code => {
        msg('red', 'Comment could not be updated', code);
      });
    },
    _remove: function (id) {
      comments.remove(id)
      .then(data => {
        this._collection(this.params);
      })
      .catch(code => {
        msg('red', 'Comment could not be removed', code);
      });
    }
  }),
  Thumbs: Reflux.createStore({
    postId: null,
    init: function () {
      // Thumbs.collection not needed
      // Thumbs.post responsible for retrieving user + post value
      this.listenTo(Thumbs.post, this._post);
      this.listenTo(Thumbs.add, this._add);
      this.listenTo(Thumbs.save, this._save);
      this.listenTo(Thumbs.remove, this._remove);
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
        msg('red', 'Thumbs could not be loaded', code);
      });
    },
    _add: function (model) {
      thumbs.add(model)
      .then(data => {
        this._post(this.postId);
      })
      .catch(code => {
        msg('red', 'Thumb could not be added', code);
      });
    },
    _save: function (id, model) {
      thumbs.save(id, model)
      .then(data => {
        this._post(this.postId);
      })
      .catch(code => {
        msg('red', 'Thumb could not be saved', code);
      });
    },
    _remove: function (id) {
      thumbs.remove(id)
      .then(data => {
        this.trigger({id: null, positive: null});
      })
      .catch(code => {
        msg('red', 'Thumb could not be removed', code);
      });
    }
  }),
  Tags: Reflux.createStore({
    init: function () {
      // Tags.collection not needed
      this.listenTo(Tags.add, this._add);
      // Tags.save not needed
      this.listenTo(Tags.remove, this._remove);
    },
    _add: function (model) {
      tags.add(model)
      .then(data => {
        Post._refresh();
      })
      .catch(code => {
        msg('red', 'Tag could not be created', code);
      });
    },
    _remove: function (id) {
      tags.remove(id)
      .then(data => {
        Post._refresh();
      })
      .catch(code => {
        msg('red', 'Tag could not be removed', code);
      });
    }
  }),
  Links: Reflux.createStore({
    init: function () {
      // Links.collection not needed
      this.listenTo(Links.add, this._add);
      this.listenTo(Links.save, this._save);
      this.listenTo(Links.remove, this._remove);
    },
    _add: function (model) {
      links.add(model)
      .then(data => {
        this.trigger({id: null, title: '', url: '', caption: '', mode: 'add'});
        Post._refresh();
      })
      .catch(code => {
        this.trigger({code: code, action: 'add'});
        msg('red', 'Link could not be created', code);
      });
    },
    _save: function (id, model) {
      links.save(id, model)
      .then(data => {
        this.trigger({id: null, title: '', url: '', caption: '', mode: 'add'});
        Post._refresh();
      })
      .catch(code => {
        this.trigger({code: code, action: 'save'});
        msg('red', 'Link could not be saved', code);
      });
    },
    _remove: function (id) {
      links.remove(id)
      .then(data => {
        Post._refresh();
      })
      .catch(code => {
        this.trigger({code: code, action: 'remove'});
        msg('red', 'Link could not be removed', code);
      });
    }
  }),
});

module.exports = Post;
