require("babel/register");
var express = require('express');
var body = require('body-parser');
var rest = express();
var auth = require('./middleware/auth');
var stats = require('./middleware/stats');

var account = require('./rest/account');
var comments = require('./rest/comments');
var collaborators = require('./rest/collaborators');
var folders = require('./rest/folders');
var links = require('./rest/links');
var locations = require('./rest/locations');
var members = require('./rest/members');
var orgs = require('./rest/orgs');
var pages = require('./rest/pages');
var passwords = require('./rest/passwords');
var posts = require('./rest/posts');
var saved = require('./rest/saved');
var tags = require('./rest/tags');
var thumbs = require('./rest/thumbs');
var users = require('./rest/users');
var views = require('./rest/views');

rest.use(body.json());
rest.use(body.text({limit: '1mb'}));
rest.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Authorization, Content-Type");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  next();
});
rest.use(auth);

rest.use('/account', account);
rest.use('/comments', comments);
rest.use('/collaborators', collaborators);
rest.use('/folders', folders);
rest.use('/links', links);
rest.use('/locations', locations);
rest.use('/members', members);
rest.use('/orgs', orgs);
rest.use('/pages', pages);
rest.use('/passwords', passwords);
rest.use('/posts', posts);
rest.use('/saved', saved);
rest.use('/tags', tags);
rest.use('/thumbs', thumbs);
rest.use('/users', users);
rest.use('/views', views);

rest.use(stats);

module.exports = rest;
