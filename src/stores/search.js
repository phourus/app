"use strict";
let Reflux = require('reflux');
let posts = require('../sockets/posts');
let { collection, search, page, limit, sortBy, direction, types } = require('../actions/search');
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
    limit: 10
  },
  init: function () {
    let self = this;

    this.listenTo(collection, this._collection);
    this.listenTo(search, this._search);
    this.listenTo(page, this._page);
    this.listenTo(limit, this._limit);
    this.listenTo(sortBy, this._sortBy);
    this.listenTo(direction, this._direction);
    this.listenTo(types, this._types);

    posts.on('collection', function (code, data) {
        if (code != 200) {
           msg('red', 'Posts could not be loaded', code);
           return;
       }
       self.trigger({posts: data.rows, total: data.count});
    });
  },
  _collection: function (params) {
    posts.collection(this.params);
  },
  _search: function (search) {
    this.params.search = search;
  },
  _page: function (page) {
    this.params.page = page;
  },
  _limit: function (limit) {
    this.params.limit = limit;
  },
  _sortBy: function (sortBy) {
    this.params.sortBy = sortBy;
  },
  _direction: function (direction) {
    this.params.direction = direction;
  },
  _types: function (types) {
    this.params.types = types;
  }
});
