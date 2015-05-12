"use strict";
let Reflux = require('reflux');
let Actions = require('../actions/editor');
let { account, single, add, save, remove, reset, Tags, Links } = Actions;
let msg = require("../actions/alerts").add;

let posts = require('../api/posts');

let Editor = Reflux.createStore({
  init: function () {
    let self = this;
    this.listenTo(account, this._account);
    this.listenTo(single, this._single);
    this.listenTo(add, this._add);
    this.listenTo(save, this._save);
    this.listenTo(remove, this._remove);
    this.listenTo(reset, this._reset);
  },
  _account: function () {
    posts.account()
    .then(data => {
      this.trigger({posts: data.rows, total: data.total});
    })
    .catch(code => {
      if (code != 200) {
         msg('yellow', 'Posts could not be loaded', code);
      }
    });
  },
  _single: function (id) {
    posts.single(id)
    .then(data => {
      this.trigger(data);
    })
    .catch(code => {
      if (code != 200) {
          msg('yellow', 'Post could not be loaded', code);
       }
    });
  },
  _add: function (model) {
    posts.add(model)
    .then(data => {
      msg('green', 'Post created successfully', code);
      this._reset();
    })
    .catch(code => {
      if (code != 201) {
         msg('red', 'Post could not be created', code);
         return;
      }
    });
  },
  _save: function (id, model) {
    posts.save(id, model)
    .then(data => {
      this._reset();
    })
    .catch(code => {
      if (code != 204) {
        msg('red', 'Post could not be saved', code);
        return;
      }
    });
  },
  _reset: function () {
    this.trigger({post: {}});
  }
  /*,
  Tags: Reflux.createStore({
    tags: [],
    init: function () {
      let self = this;
      this.listenTo(Tags.collection, this._collection)
      this.listenTo(Tags.add, this._add);
      this.listenTo(Tags.remove, this._remove);

      tags.on('collection', function (code, data) {
          if (code != 200) {
              msg('yellow', 'Tags could not be loaded', code);
              return;
          }
          this.tags = data;
          self.trigger({tags: this.tags});
      });
      tags.on('add', function (code, data) {
          if (code != 201) {
              msg('yellow', 'Tag could not be created', code);
              return;
          }
          this.tags.push(data);
          self.trigger({tags: this.tags});
      });
      tags.on('remove', function (code, data) {
          if (code != 204) {
              msg('yellow', 'Tag could not be removed', code);
              return;
          }
      });
    },
    _collection: function (params) {
      tags.collection(params);
    },
    _add: function (model) {
      tags.add(model);
    },
    _remove: function (id) {
      tags.remove(id);
    }
  }),
  Links: Reflux.createStore({
    links: [],
    init: function () {
      let self = this;
      this.listenTo(Links.collection, this._collection)
      this.listenTo(Links.add, this._add);
      this.listenTo(Links.save, this._save);
      this.listenTo(Links.remove, this._remove);

      links.on('collection', function (code, data) {
          if (code != 200) {
              msg('yellow', 'Links could not be loaded', code);
              return;
          }
          this.links = data;
          self.trigger({links: this.links});
      });
      links.on('add', function (code, data) {
          if (code != 201) {
              msg('yellow', 'Link could not be created', code);
              return;
          }
          this.links.push(data);
          self.trigger({links: this.links});
      });
      links.on('save', function (code, data) {
          if (code != 201) {
              msg('yellow', 'Link could not be saved', code);
              return;
          }
          this.links.push(data);
          self.trigger({links: this.links});
          msg('green', 'Link saved successfully', code);
      });
      links.on('remove', function (code, data) {
          if (code != 204) {
              msg('red', 'Link could not be removed', code);
              return;
          }
      });
    },
    _collection: function (params) {
      tags.collection(params);
    },
    _add: function (model) {
      tags.add(model);
    },
    _save: function (id, model) {
      tags.save(id, model);
    },
    _remove: function (id) {
      tags.remove(id);
    }
  })*/
});

module.exports = Editor;
