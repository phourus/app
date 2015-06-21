require("babel/register");
var config = require("../config");
var express = require('express');
var jwt = require('jsonwebtoken');
var body = require('body-parser');
var rest = express();

var account = require('./rest/account');
var clout = require('./rest/clout');
var comments = require('./rest/comments');
var links = require('./rest/links');
var locations = require('./rest/locations');
var members = require('./rest/members');
var orgs = require('./rest/orgs');
var passwords = require('./rest/passwords');
var posts = require('./rest/posts');
var reviews = require('./rest/reviews');
var tags = require('./rest/tags');
var thumbs = require('./rest/thumbs');
var users = require('./rest/users');
var views = require('./rest/views');

rest.use(body.json());
rest.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Authorization, Content-Type");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  next();
});
rest.use(function (req, res, next) {
   var token = req.headers.authorization;
   // skip jwt verification if login/Basic auth
   //if (token.match(/^Basic $/)) { next(); }
   req.user_id = false;
   try {
      jwt.verify(token, config.get('salt'));
      var decoded = jwt.decode(token);
      req.user_id = decoded.user_id;
   } catch(err) {
      console.log(err);
   }
   return next();
});

rest.use('/account', account);
rest.use('/clout', clout);
rest.use('/comments', comments);
rest.use('/links', links);
rest.use('/locations', locations);
rest.use('/members', members);
rest.use('/orgs', orgs);
rest.use('/passwords', passwords);
rest.use('/posts', posts);
rest.use('/reviews', reviews);
rest.use('/tags', tags);
rest.use('/thumbs', thumbs);
rest.use('/users', users);
rest.use('/views', views);

module.exports = rest;
