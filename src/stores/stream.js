"use strict";
let Reflux = require('reflux');

let Actions = require('../actions/stream');

let posts = require('../api/posts');
let account = require('../api/account');
let users = require('../api/users');
let orgs = require('../api/orgs');

let msg = require("../actions/alerts").add;

let Stream = Reflux.createStore({
  posts: null,
  total: 0,
  selected: 0,
  scroll: false,
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
    this.listenTo(Actions.select, this._select);
    this.listenTo(Actions.single, this._single);
    this.listenTo(Actions.search, this._search);
    this.listenTo(Actions.nextPage, this._nextPage);
    this.listenTo(Actions.previousPage, this._previousPage);
    this.listenTo(Actions.more, this._more);
    this.listenTo(Actions.limit, this._limit);
    this.listenTo(Actions.sortBy, this._sortBy);
    this.listenTo(Actions.direction, this._direction);
    this.listenTo(Actions.exclude, this._exclude);
    this.listenTo(Actions.type, this._type);
    this.listenTo(Actions.context, this._context);
  },
  _collection: function () {
    posts.collection(this.params)
    .then(data => {
      this.total = data.count;
      if (this.posts) {
        this.posts = this.posts.concat(data.rows);
      } else {
        this.posts = data.rows;
      }
      if (this.single) {
        this.posts.unshift(this.single);
        this.single = null;
      }
      this.trigger({posts: this.posts, total: data.count, params: this.params, scroll: this.scroll});
    })
    .catch(code => {
      if (code != 200) {
         console.error(code);
         msg('red', 'Posts could not be loaded', code);
      }
    });
  },
  _select: function (id) {
    this.selected = id;
    this.scroll = false;
    this.trigger({selected: this.selected, scroll: this.scroll});
  },
  _single: function (id) {
    let local = this._local(id);
    if (local) {
      this.single = local;
    }
    posts.single(id)
    .then(data => {
      this.single = data;
      this._collection();
    })
    .catch(code => {
      if (code != 200) {
         console.error(code);
         msg('red', 'Post could not be loaded', code);
      }
    });
  },
  _local: function (id) {
    // check local posts indexed by id for match
    // closed post, read post status
    return false;
  },
  _search: function (search) {
    this.posts = [];
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
  _more: function () {
    this.params.page++;
    this.scroll = true;
    this._collection();
  },
  _limit: function (limit) {
    this.params.limit = limit;
    this._collection();
  },
  _sortBy: function (sortBy) {
    this.posts = [];
    this.params.sortBy = sortBy;
    this._collection();
  },
  _direction: function (direction) {
    this.posts = [];
    this.params.direction = direction;
    this._collection();
  },
  _exclude: function (type) {
    this.posts = [];
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
  _type: function (type) {
    let types = ['blog', 'event', 'subject', 'question', 'debate', 'poll', 'belief', 'quote'];
    if (this.params.exclude.length === 7) {
      this.params.exclude = [];
    } else {
      let index = types.indexOf(type);
      if (index !== -1) {
        types.splice(index, 1);
        this.params.exclude = types;
      }
    }
    this.posts = [];
    this._collection();
  },
  _context: function (type, id) {
    this.params.page = 1;
    this.params.context = {
      type: type,
      id: id,
      profile: {}
    }
    this.trigger({context: this.params.context});
    this.posts = [];
    // no context
    if (type === null) {
      this._collection();
      return;
    }
    // post || edit
    if (type === 'post' || type === 'edit') {
      this._single(id);
      return;
    }

    // me
    if (type === 'myPosts') {
      account.get()
        .then(data => {
          this.params.context.profile = data;
          this.trigger({context: this.params.context});
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
    if (type === 'orgs') {
      profile = orgs;
    }
    profile.single(id)
      .then(data => {
        this.params.context.profile = data;
        this.trigger({context: this.params.context});
        this._collection();
      })
      .catch(code => {
        if (code != 200) {
           msg('red', 'Could not load posts for this profile', code);
        }
      });
  }
});

module.exports = Stream;
