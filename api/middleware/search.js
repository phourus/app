var sql = require('sequelize');

var search = require('../models/search');
var posts = require('../models/posts');
var tags = require('../models/tags');
var links = require('../models/links');
var comments = require('../models/comments');

module.exports = function (postId) {
  return sql.Promise.join(
    posts.find(postId),
    tags.findAll({where: {postId: postId}}),
    links.findAll({where: {postId: postId}}),
    comments.findAll({where: {postId: postId}}),
    function (posts, tags, links, comments) {
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

      return search.upsert({
        id: postId,
        postId: postId,
        postSearch: postSearch,
        tagSearch: tagSearch,
        linkSearch: linkSearch,
        commentSearch: commentSearch
      }, {where: {id: postId, postId: postId}});
    }
  )
  .catch(function (err) {
    console.log(err);
  });
};

// app.post('/rest/posts/', updateSearch);
// app.put('/rest/posts/', updateSearch);
// app.delete('/rest/posts/', updateSearch);
//
// app.post('/rest/tags/', updateSearch);
// app.delete('/rest/tags/', updateSearch);
//
// app.post('/rest/links/', updateSearch);
// app.put('/rest/links/', updateSearch);
// app.delete('/rest/links/', updateSearch);
//
// app.post('/rest/comments/', updateSearch);
// app.put('/rest/comments/', updateSearch);
// app.delete('/rest/comments/', updateSearch);
