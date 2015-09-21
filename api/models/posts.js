var sql = require('sequelize');
var db = require('../db');

var users = require('./users');
var orgs = require('./orgs');
var members = require('./members');
var tags = require('./tags');
var links = require('./links');
var locations = require('./locations');
var views = require('./views');
var thumbs = require('./thumbs');
var comments = require('./comments');
var votes = require('./votes');
var favorites = require('./favorites');
var mentions = require('./mentions');
var collaborators = require('./collaborators');

var posts = db.define('posts', {
  // Common
  id: {type: sql.INTEGER, autoIncrement: true, unique: true, primaryKey: true},
  privacy: {type: sql.ENUM('public', 'members', 'private', 'trash'), defaultValue: 'private'},
  type: sql.ENUM('blog', 'event', 'subject', 'question', 'debate', 'poll', 'quote', 'belief'),
  title: sql.STRING,
  slug: sql.STRING,
  content: sql.TEXT,
  lat: sql.FLOAT,
  lng: sql.FLOAT,

  // Stats
  totalComments: {type: sql.INTEGER, defaultValue: 0},
  totalViews: {type: sql.INTEGER, defaultValue: 0},
  totalThumbs: {type: sql.INTEGER, defaultValue: 0},
  popularity: {type: sql.INTEGER, defaultValue: 0},
  influence: {type: sql.INTEGER, defaultValue: 0},

  // Meta
  scope: {type: sql.ENUM('local', 'county', 'state', 'national', 'international'), allowNull: true},
  zip: sql.STRING(5),
  author: sql.STRING,
  orgId: {type: sql.INTEGER, defaultValue: null}
}, {
  classMethods: {
    single: function (id) {
      return this.findOne({where: {id: id, privacy: {$notIn: ['trash']}},
        include: [
          {model: users, as: 'user'},
          {model: tags, as: 'tags'},
          {model: links, as: 'links'}
        ]
      });
    },
    collection: function (params) {
      return this.findAndCountAll(this.queryize(params));
    },
    add: function (model) {
      model.userId = this.SESSION_USER;
      return this.create(model);
    },
    save: function (id, model) {
      model.userId = this.SESSION_USER;
      if (model.orgId === 'null') {
        model.orgId = null;
      }
      return this.update(model, {where: {id: id, userId: model.userId}});
    },
    remove: function (id) {
      //return this.destroy({where: {id: id, userId: model.userId}});
    },
    account: function () {
      return this.findAndCountAll({where: {userId: model.userId}});
    },
    updateStats: function (id) {
      var self, where, viewTotal, commentTotal, thumbTotal;
      where = {where: {postId: id}};
      wherePost = {where: {id: id}};
      self = this;
      // views
      viewTotal = views.count(where)
      .then(function (data) {
        var model = {views: data};
        self.update(model, wherePost);
      });
      // comments
      commentTotal = comments.count(where)
      .then(function (data) {
        var model = {comments: data};
        self.update(model, wherePost);
      });
      // thumbs
      thumbTotal = thumbs.count({where: {id: id}})
      .then(function (data) {
        var model = {thumbs: data};
        self.update(model, wherePost);
      });
    },
    queryize: function (params) {
      var defaults = {};
      var query = {};

      /** DEFAULTS **/
      // sort: influence, comments, views, popularity, thumbs, date, location
      defaults.sort = 'influence';
      defaults.direction = 'DESC';
      defaults.page = 1;
      defaults.limit = 10;

      /** STANDARD **/
      query.order = [[(params.sortBy || defaults.sortBy), (params.direction || defaults.direction)]];
      query.offset = ((params.page || defaults.page) - 1) * (defaults.limit || params.limit);
      query.limit = params.limit || defaults.limit;
      query.where = {};

      /** WHERE **/
      // EXCLUDE
      if (params.exclude && params.exclude.length) {
          query.where.type = { not: params.exclude.split(',') };
      }

      // SEARCH
      // basic search: title, content
      // advanced search: category, subcategory
      // specific search: question, author
      if (params.search && params.search !== '') {
          var term = { like:  '%' + params.search + '%' };
          query.where = sql.or(
              { title: term },
              { content: term }
          );
      }

      // DATE
      if (params.startDate && params.endDate) {
          query.where.createdAt = {};
          query.where.createdAt.between = [params.startDate, params.endDate];
      }
      if (params.startDate) {
          query.where.createdAt = {};
          query.where.createdAt.gt = params.startDate;
      }
      if (params.endDate) {
          query.where.createdAt = {};
          query.where.createdAt.lt = params.endDate;
      }

      // PRIVACY
      var privacy = ['public'];
      if (this.SESSION_USER !== false) {
        //privacy.push('members');
      }

      // CONTEXT
      if (params.contextType === 'myPosts' && this.SESSION_USER) {
        query.where.userId = this.SESSION_USER;
        //privacy.push('org');
        privacy.push('private');
      }

      if (params.contextType === 'users') {
        query.where.userId = params.contextId;
      }

      if (params.contextType === 'orgs') {
        query.where.orgId = params.contextId;
        privacy = ['public'];
        // if member
        /** NEED TO CREATE ASYNC SOLUTION **/
        members.isMember(this.SESSION_USER, params.contextId)
        .then((data) => {
          if (!data) {
            return false;
          }
          if (data.userId === parseInt(this.SESSION_USER) && data.orgId === parseInt(params.contextId) && data.approved === true) {
            privacy.push('private');
            return true;
          }
          return false;
        })
        .catch((err) => {
          console.error(err);
        });
      }

      query.where.privacy = {
        $in: privacy
      };
      /** ADVANCED **/
      // groups, location, org_id

      /** USER ASSOCIATION **/
      query.include = [
          {model: users, as: 'user', include: [locations]},
          {model: orgs, as: 'org'},
          {model: tags, as: 'tags'},
          {model: links, as: 'links'}
      ];
      return query;
    }
  }
});

// users
// users.hasOne posts gives postId on user
posts.belongsTo(users);
posts.belongsTo(orgs);

// links
posts.hasMany(links);
links.belongsTo(posts);

// tags
posts.hasMany(tags);
tags.belongsTo(posts);

// views
posts.hasMany(views);
views.belongsTo(posts);

// thumbs
posts.hasMany(thumbs);
thumbs.belongsTo(posts);

// votes
posts.hasMany(votes);
votes.belongsTo(posts);
users.hasMany(votes);
votes.belongsTo(users);

// favorites
users.hasMany(favorites);
favorites.belongsTo(users);

// comments
posts.hasMany(comments);
comments.belongsTo(posts);

// mentions
comments.hasMany(mentions);
mentions.belongsTo(comments);
users.hasMany(mentions);
mentions.belongsTo(users);

// collaborators
collaborators.belongsTo(users);
users.hasMany(collaborators);
collaborators.belongsTo(posts);
posts.hasMany(collaborators);

module.exports = posts;
