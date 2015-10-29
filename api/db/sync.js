require('./connection');
var collaborators = require('../models/collaborators');
var comments = require('../models/comments');
var favorites = require('../models/favorites');
var links = require('../models/links');
var locations = require('../models/locations');
var members = require('../models/members');
var mentions = require('../models/mentions');
var orgs = require('../models/orgs');
var passwords = require('../models/passwords');
var posts = require('../models/posts');
var search = require('../models/search');
var teammates = require('../models/teammates');
var teams = require('../models/teams');
var tags = require('../models/tags');
var thumbs = require('../models/thumbs');
var tokens = require('../models/tokens');
var users = require('../models/users');
var views = require('../models/views');
var votes = require('../models/votes');

// passwords
users.hasOne(passwords);
passwords.belongsTo(users);

// locations
users.hasMany(locations);
locations.belongsTo(users);

// views
users.hasMany(views);
//views.belongsTo(users, {as: "user"});
users.hasMany(views, {foreignKey: {name: 'viewerId'}});
views.belongsTo(users, {as: "viewer"});

// thumbs
users.hasMany(thumbs);
thumbs.belongsTo(users);

// comments
users.hasMany(comments);
comments.belongsTo(users);

// membership
orgs.hasMany(members);
members.belongsTo(orgs);
users.hasMany(members);
members.belongsTo(users);

users.sync()
.then(function () {
  passwords.sync();
  favorites.sync();
  tokens.sync();

  // posts
  posts.sync()
  .then(function () {
    links.sync();
    tags.sync();
    locations.sync();
    views.sync();
    thumbs.sync();
    collaborators.sync();
    votes.sync();
    search.sync();
    comments.sync()
    .then(function () {
      mentions.sync();
    });
  });

  // orgs
  orgs.sync()
  .then(function () {
    members.sync();
    teams.sync()
    .then(function () {
      teammates.sync();
    });
  });
});
