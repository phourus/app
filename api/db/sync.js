require('../db');
var clout = require('../models/clout');
var comments = require('../models/comments');
var links = require('../models/links');
var locations = require('../models/locations');
var members = require('../models/members');
var orgs = require('../models/orgs');
var passwords = require('../models/passwords');
var posts = require('../models/posts');
var reviews = require('../models/reviews');
var tags = require('../models/tags');
var thumbs = require('../models/thumbs');
var users = require('../models/users');
var views = require('../models/views');

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

users.sync();
passwords.sync();

posts.sync();
links.sync();
tags.sync();
locations.sync();

views.sync();
thumbs.sync();
comments.sync();

orgs.sync();
members.sync();

/*
Clout.sync();
Reviews.sync();
*/