"use strict";
let Reflux = require('reflux');
let posts = require('../sockets/posts');
let comments = require('../sockets/comments');
let thumbs = require('../sockets/thumbs');
let msg = require("../actions/alerts").add;
let Actions = require('../actions/post');
let { Comments, Thumbs } = Actions;

let Post = Reflux.createStore({
  init: function () {
    let self = this;
    this.listenTo(Actions.single, this._single);
    posts.on('single', function (code, data) {
       if (code != 200) {
           msg('red', 'Post could not be loaded', code);
           return;
       }
       self.trigger({post: data, user: data.user});
    });
  },
  _single: function (id) {
      posts.single(id);
  }
});

Post.Comments = Reflux.createStore({
  init: function () {
    comments.on('collection', function (code, data) {
       if (code != 200) {
           msg('yellow', 'Comments could not be loaded', code);
           return;
       }
       self.trigger({comments: data});
    });
    comments.on('add', function (code, data) {
       if (code != 201) {
           msg('red', 'Comment could not be created', code);
           return;
       }
    });
  }
});

Post.Thumbs = Reflux.createStore({
  init: function () {
    this.listenTo(Thumbs.single, this._single);
    thumbs.on('single', function (code, data) {
        if (code != 200) {
           msg('yellow', 'Thumbs could not be loaded', code);
           return;
        }
    });
  },
  _single: function () {
    thumbs.single();
  }
});

module.exports = Post;
