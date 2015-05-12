let Reflux = require('reflux');
let posts = require('../api/posts');
let comments = require('../api/comments');
let thumbs = require('../api/thumbs');
let msg = require("../actions/alerts").add;
let Actions = require('../actions/post');
let { Comments, Thumbs } = Actions;

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
  }
});

Post.Comments = Reflux.createStore({
  init: function () {

  }
});

Post.Thumbs = Reflux.createStore({
  init: function () {
    this.listenTo(Thumbs.single, this._single);
  },
  _single: function () {
    thumbs.single()
    .then(data => {

    })
    .catch(code => {
      msg('red', 'Thumbs could not be loaded', code);
    })
  }
});

module.exports = Post;
