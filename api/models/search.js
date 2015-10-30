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
    update: function (postId) {
      return sql.Promise.join(
        posts.findOne(postId),
        tags.findAll({where: {postId: postId}}),
        links.findAll({where: {postId: postId}}),
        comments.findAll({where: {postId: postId}}),
        (posts, tags, links, comments) => {
          var postSearch = "";
          var tagSearch = "";
          var linkSearch = "";
          var commentSearch = "";

          // posts
          var a = [posts.title, posts.slug, posts.content, posts.author, posts.poll, posts.location];
          postSearch = a.join(" ");

          // tags
          tags.forEach(function (item) {
            tagSearch += " " + item.tag;
          });

          // links
          links.forEach(function (item) {
            linkSearch += " " + item.title + " " + item.caption;
          });

          // comments
          comments.forEach(function (item) {
            commentSearch += " " + item.content;
          });

          return this.upsert({
            postSearch: postSearch,
            tagSearch: tagSearch,
            linkSearch: linkSearch,
            commentSearch: commentSearch
          }, {where: {id: postId}});
        }
      )
      .catch(function (err) {
        console.log(err);
      });
    }
  }
});

module.exports = search;
