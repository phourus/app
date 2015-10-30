var sql = require('sequelize');
var db = require('../db');

var posts = require('../models/posts');
var tags = require('../models/tags');
var links = require('../models/links');
var comments = require('../models/comments');

var search = db.define('search', {
  postSearch: {type: sql.TEXT, defaultValue: "", allowNull: false},
  tagSearch: {type: sql.TEXT, defaultValue: "", allowNull: false},
  linkSearch: {type: sql.TEXT, defaultValue: "", allowNull: false},
  commentSearch: {type: sql.TEXT, defaultValue: "", allowNull: false}
}, {
  classMethods: {
    add: function (post) {
      var a = [post.title, post.slug, post.content, post.author, post.poll, post.location];
      var postSearch = a.join(" ");
      var model = {id: post.id, postId: post.id, postSearch: postSearch};
      return this.create(model)
      .catch(function (err) {
        console.log(err);
      });
    },
    save: function (post) {
      var a = [post.title, post.slug, post.content, post.author, post.poll, post.location];
      var postSearch = a.join(" ");
      return this.update({postSearch: postSearch}, {where: {id: post.id}})
      .catch(function (err) {
        console.log(err);
      });
    },
    populate: function (postId) {
      return sql.Promise.join(
        tags.findAll({where: {postId: postId}}),
        links.findAll({where: {postId: postId}}),
        comments.findAll({where: {postId: postId}}),
        (tags, links, comments) => {
          var model = {
            tagSearch: "",
            linkSearch: "",
            commentSearch: ""
          };

          // tags
          tags.forEach(function (item) {
            model.tagSearch += " " + item.tag;
          });

          // links
          links.forEach(function (item) {
            model.linkSearch += " " + item.title + " " + item.caption;
          });

          // comments
          comments.forEach(function (item) {
            model.commentSearch += " " + item.content;
          });
          return this.update(model, {where: {id: postId}});
        }
      )
      .catch(function (err) {
        console.log(err);
      });
    }
  }
});

module.exports = search;
