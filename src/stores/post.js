"use strict";
let Reflux = require('reflux');

let Actions = require('../actions/post');
let posts = require('../api/posts');

let msg = require("../actions/alerts").add;

module.exports = Reflux.createStore({
  init: function () {
    this.post = {};
    this.changes = {};
    this.listenTo(Actions.single, this._single);
    this.listenTo(Actions.refresh, this._refresh);
    this.listenTo(Actions.change, this._change);
    this.listenTo(Actions.add, this._add);
    this.listenTo(Actions.save, this._save);
    this.listenTo(Actions.trash, this._trash);
    this.listenTo(Actions.poll, this._poll);
    this.listenTo(Actions.vote, this._vote);
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
    let model = this.changes;
    posts.add(model)
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
    })
    .catch(code => {
      if (code != 204) {
        msg('red', 'Post could not be saved', code);
        return;
      }
    });
  },
  _trash: function () {
    posts.save(this.post.id, {privacy: 'trash'})
    .then(data => {
      this.trigger({deleted: true});
    })
    .catch(code => {
      if (code != 204) {
        msg('red', 'Post could not be deleted', code);
        return;
      }
    });
  },
  _change: function (key, value) {
    this.changes[key] = value;
    this.trigger({changes: this.changes});
  },
  _poll: function (id) {
    posts.poll(id)
    .then(data => {
      let votes = {};
      let postId = 0;
      if (data[0]) {
        postId = data[0].postId;
      }
      data.forEach((item) => {
        votes[item.option] = item.count;
      });
      this.trigger({votes: votes, postId: postId});
    })
    .catch(code => {
      if (code != 200) {
        msg('red', 'Poll could not be loaded', code);
        return;
      }
    });
  },
  _vote: function (postId, option) {
    posts.vote(postId, option)
    .then(data => {
      this._poll(postId);
      this.trigger({selected: option});
    })
    .catch(code => {
      if (code != 202) {
        msg('red', 'Vote could not be saved', code);
        return;
      }
    });
  }
});
