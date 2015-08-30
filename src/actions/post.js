"use strict";
let Reflux = require('reflux');

module.exports = {
  single: Reflux.createAction(),
  Comments: {
    collection: Reflux.createAction(),
    add: Reflux.createAction()
  },
  Thumbs: {
    single: Reflux.createAction(),
    collection: Reflux.createAction()
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
