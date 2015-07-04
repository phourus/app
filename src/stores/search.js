"use strict";
let Reflux = require('reflux');
let posts = require('../api/posts');
let account = require('../api/account');
let users = require('../api/users');
let orgs = require('../api/orgs');
let Actions = require('../actions/search');
let msg = require("../actions/alerts").add;

module.exports = Reflux.createStore({
  posts: [],
  total: 0,
  params: {
    exclude: [],
    search: '',
    sortBy: 'influence',
    direction: 'DESC',
    page: 1,
    limit: 10,
    context: {
      type: '',
      id: null
    }
  },
  init: function () {
    this.listenTo(Actions.collection, this._collection);
    this.listenTo(Actions.search, this._search);
    this.listenTo(Actions.nextPage, this._nextPage);
    this.listenTo(Actions.previousPage, this._previousPage);
    this.listenTo(Actions.limit, this._limit);
    this.listenTo(Actions.sortBy, this._sortBy);
    this.listenTo(Actions.direction, this._direction);
    this.listenTo(Actions.exclude, this._exclude);
    this.listenTo(Actions.context, this._context);
  },
  _collection: function () {
    posts.collection(this.params)
    .then(data => {
      this.total = data.count;
      this.posts = data.rows;
      this.trigger({posts: data.rows, total: data.count, params: this.params});
    })
    .catch(code => {
      if (code != 200) {
         msg('red', 'Posts could not be loaded', code);
      }
    });
  },
  _search: function (search) {
    this.params.search = search;
    this._collection();
  },
  _nextPage: function () {
    if ( Math.ceil(this.params.page * this.params.limit) < this.total ) {
      this.params.page++;
      this._collection();
    }
  },
  _previousPage: function () {
    if (this.params.page > 1) {
      this.params.page--;
      this._collection();
    }
  },
  _limit: function (limit) {
    this.params.limit = limit;
    this._collection();
  },
  _sortBy: function (sortBy) {
    this.params.sortBy = sortBy;
    this._collection();
  },
  _direction: function (direction) {
    this.params.direction = direction;
    this._collection();
  },
  _exclude: function (type) {
    let exclude = this.params.exclude;
    let index = exclude.indexOf(type);
    if (index > -1) {
      exclude.splice(index, 1);
    } else {
      exclude.push(type);
    }
    this.params.exclude = exclude;
    this._collection();
  },
  _context: function (type, id) {
    this.params.context = {
      type: type,
      id: id,
      profile: null
    }
    // no context
    if (type === null) {
      this.params.context = {
        type: null,
        id: null,
        profile: null
      }
      this._collection();
      return;
    }
    // me
    if (type === 'myPosts') {
      account.get()
        .then(data => {
          this.params.context.profile = data;
          this._collection();
        })
        .catch(code => {
          if (code != 200) {
             msg('red', 'Could not load posts for this profile', code);
          }
        });
      return;
    }
    // users/orgs
    let profile = users;
    if (type === 'orgPosts') {
      profile = orgs;
    }
    profile.single(id)
      .then(data => {
        this.params.context.profile = data;
        this._collection();
      })
      .catch(code => {
        if (code != 200) {
           msg('red', 'Could not load posts for this profile', code);
        }
      });
  }
});
