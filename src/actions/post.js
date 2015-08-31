"use strict";
let Reflux = require('reflux');

module.exports = {
  single: Reflux.createAction(),
  account: Reflux.createAction(),
  add: Reflux.createAction(),
  save: Reflux.createAction(),
  remove: Reflux.createAction(),
  reset: Reflux.createAction(),
  change: Reflux.createAction(),
  Comments: {
    collection: Reflux.createAction(),
    add: Reflux.createAction(),
    save: Reflux.createAction(),
    remove: Reflux.createAction()
  },
  Thumbs: {
    totals: Reflux.createAction(),
    post: Reflux.createAction(),
    save: Reflux.createAction(),
    remove: Reflux.createAction()
  },
  Tags: {
    collection: Reflux.createAction(),
    add: Reflux.createAction(),
    remove: Reflux.createAction()
  },
  Links: {
    collection: Reflux.createAction(),
    add: Reflux.createAction(),
    save: Reflux.createAction(),
    remove: Reflux.createAction()
  }
};
