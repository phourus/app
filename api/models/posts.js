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
var teams = require('./teams');

var search = db.define('search', {
  postSearch: sql.STRING,
  tagSearch: sql.STRING,
  linkSearch: sql.STRING,
  commentSearch: sql.STRING
});

var posts = db.define('posts', {
  // Common
  id: {type: sql.INTEGER, autoIncrement: true, unique: true, primaryKey: true},
  orgId: {type: sql.INTEGER, defaultValue: null},
  privacy: {type: sql.ENUM('public', 'members', 'private', 'trash'), defaultValue: 'private'},
  type: sql.ENUM('blog', 'event', 'subject', 'question', 'debate', 'poll', 'quote', 'belief'),
  title: sql.STRING,
  slug: {type: sql.STRING, unique: true},
  content: sql.TEXT,

  // Meta
  scope: {type: sql.ENUM('local', 'county', 'state', 'national', 'international'), allowNull: true},
  zip: sql.STRING(5),
  author: sql.STRING,
  poll: sql.STRING,
  when: sql.DATE,
  location: sql.STRING,

  // Stats
  totalComments: {type: sql.INTEGER, defaultValue: 0},
  totalViews: {type: sql.INTEGER, defaultValue: 0},
  totalThumbs: {type: sql.INTEGER, defaultValue: 0},
  popularity: {type: sql.INTEGER, defaultValue: 0},
  influence: {type: sql.INTEGER, defaultValue: 0},

  // Location
  lat: sql.FLOAT,
  lng: sql.FLOAT
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
    shared: function () {
      let query = {
        where: {
          $or: []
        }
      };
      if (this.SESSION_TEAMS) {
        query.where.$or.push({teamId: {$in: this.SESSION_TEAMS}});
      }
      if (this.SESSION_USER) {
        query.where.$or.push({userId: this.SESSION_USER});
      }
      return collaborators.findAndCountAll(query)
      .then((data) => {
        let shared = data.rows.map((c) => {
          return c.postId;
        });
        return this.findAndCountAll({where: {id: {$in: shared}}});
      });
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
      var self, where, wherePost, viewTotal, commentTotal, thumbTotal, popularity;
      where = {where: {postId: id}};
      wherePost = {where: {id: id}};
      self = this;
      // views
      views.add({postId: id, viewerId: this.SESSION_USER})
      .then(function (data) {
        views.count(where)
        .then(function (data) {
          var model = {totalViews: data};
          self.update(model, wherePost);
        });
      });
      // comments
      comments.count(where)
      .then(function (data) {
        var model = {totalComments: data};
        self.update(model, wherePost);
      });
      // thumbs && popularity
      thumbs.count(where)
      .then(function (data) {
        var model = {totalThumbs: data};
        self.update(model, wherePost);
        thumbs.count({where: {postId: id, positive: true}})
        .then(function (positive) {
          popularity = positive / data * 100;
          var model = {popularity: popularity};
          self.update(model, wherePost);
        });
      });
    },
    queryize: function (params) {
      var search;
      var Search = function (params) {
        this.params = params;
        this.query = {
          where: {},
          include: []
        };
      };
      Search.prototype = this._methods;
      search = new Search(params);
      search.params.SESSION_USER = this.SESSION_USER;
      search.params.SESSION_POSTS = this.SESSION_POSTS;
      search.params.SESSION_ORGANIZATIONS = this.SESSION_ORGANIZATIONS;

      search._sort();
      search._types();
      search._dates();
      search._context();
      search._privacy();
      search._search();
      search._joins();
      return search.query;
    },
    _methods: {
      _sort: function () {
        this.query.order = [[(this.params.sortBy || 'influence'), (this.params.direction || 'DESC')]];
        this.query.limit = this.params.limit || 10;
        this.query.offset = this.params.limit * ((this.params.page || 1) - 1);
      },
      _types: function () {
        if (this.params.exclude && this.params.exclude.length) {
          this.query.where.type = { not: this.params.exclude.split(',') };
        }
      },
      _dates: function () {
        if (this.params.startDate && this.params.endDate) {
          this.query.where.createdAt = {};
          this.query.where.createdAt.between = [this.params.startDate, this.params.endDate];
        } else {
          if (this.params.startDate) {
            this.query.where.createdAt = {};
            this.query.where.createdAt.gt = this.params.startDate;
          }
          if (this.params.endDate) {
            this.query.where.createdAt = {};
            this.query.where.createdAt.lt = this.params.endDate;
          }
        }
      },
      _joins: function () {
        this.query.include.push({model: users, as: 'user', include: [locations]});
        this.query.include.push({model: orgs, as: 'org'});
        this.query.include.push({model: tags, as: 'tags'});
        this.query.include.push({model: links, as: 'links'});
      },
      _context: function () {
        if (this.params.contextType === 'users') {
          this.query.where.userId = this.params.contextId;
        }

        if (this.params.contextType === 'orgs') {
          this.query.where.orgId = this.params.contextId;
        }
      },
      _search: function () {
        // basic search: title, slug, content, author, poll
        var required = "'0' AS id, '0' AS createdAt, '0' AS updatedAt, posts.id AS postId,";
        var postSearch = "CONCAT(`title`, ' ', `slug`, ' ', `content`, ' ', `author`, ' ', `poll`) AS postSearch,";
        var tagSearch = "(SELECT GROUP_CONCAT(tags.tag SEPARATOR ' ') AS tagGroup FROM tags WHERE tags.postId = posts.id) AS tagSearch,";
        var linkSearch = "'' AS linkSearch,";
        var commentSearch = "'' AS commentSearch";
        var fields = [required, postSearch, tagSearch, linkSearch, commentSearch].join(' ');
        var view = "CREATE OR REPLACE VIEW searches AS SELECT " + fields + " FROM `posts`;";

        // deep search: tags, links, comments
        // tags: SELECT postId, GROUP_CONCAT(tags.tag SEPARATOR ' ') AS tagSearch FROM tags GROUP BY postId;
        // links: SELECT postId, CONCAT(GROUP_CONCAT(`title` SEPARATOR ' '), GROUP_CONCAT(`caption` SEPARATOR ' ')) AS linkSearch FROM links GROUP BY postId;
        // comments:
        // primary search: users, orgs
        if (this.params.search && this.params.search !== '') {
          // Async? Need to build view before querying?
          db.query(view);
          this.query.include.push({
            model: search,
            as: 'search',
            where: ["CONCAT(`postSearch`, ' ', `tagSearch`, ' ', `linkSearch`, ' ', `commentSearch`) LIKE '%" + this.params.search + "%'"]
          });
        }
      },
      _privacy: function () {
        // GUEST
        if (!this.params.SESSION_USER) {
          this.query.where.privacy = 'public';
          return;
        }
        this.query.where.$or = [];

        // AUTHENTICATED
        if (this.params.contextType === 'myPosts') {
          if (this.params.SESSION_POSTS) {
            this.query.where.$or.push({id: {$in: this.params.SESSION_POSTS}});
          }
          if (this.params.SESSION_USER) {
            this.query.where.$or.push({userId: this.params.SESSION_USER});
          }
          return;
        }

        this.query.where.$or = [
          {privacy: {$in: ['public']}},
          {userId: this.params.SESSION_USER, privacy: "private"},
          {privacy: 'members', orgId: null},
          {privacy: 'members', orgId: this.params.SESSION_ORGANIZATIONS},
        ];
      }
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
collaborators.belongsTo(teams);
teams.hasMany(collaborators);

// search
posts.hasOne(search);
search.belongsTo(posts);

module.exports = posts;
