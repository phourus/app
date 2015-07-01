"use strict";
let Reflux = require('reflux');
let posts = require('../api/posts');
let users = require('../api/users');
let orgs = require('../api/orgs');
let { collection, search, page, limit, sortBy, direction, types, context } = require('../actions/search');
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
    this.listenTo(collection, this._collection);
    this.listenTo(search, this._search);
    this.listenTo(page, this._page);
    this.listenTo(limit, this._limit);
    this.listenTo(sortBy, this._sortBy);
    this.listenTo(direction, this._direction);
    this.listenTo(types, this._types);
    this.listenTo(context, this._context);
  },
  _collection: function () {
    posts.collection(this.params)
    .then(data => {
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
  _page: function (page) {
    this.params.page = page;
    this._collection();
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
  _types: function (types) {
    this.params.types = types;
    this._collection();
  },
  _context: function (type, id) {
    let profile = users;
    if (type === 'orgPosts') {
      profile = orgs;
    }
    if (type === null) {
      this.params.context = {
        type: null,
        id: null
      }
      this.trigger({context: this.params.context});
      return;
    }
    profile.single(id)
      .then(data => {
        let context = data;
        context.type = type;
        context.id = id;
        this.params.context = context;
        this.trigger({context: context});
      })
      .catch(code => {
        if (code != 200) {
           msg('red', 'Could not load posts for this profile', code);
        }
      });
  }
});
