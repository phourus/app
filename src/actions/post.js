"use strict";
let Reflux = require('reflux');

module.exports = {
  single: Reflux.createAction(),
  refresh: Reflux.createAction(),
  change: Reflux.createAction(),
  add: Reflux.createAction(),
  save: Reflux.createAction(),
  trash: Reflux.createAction(),
  poll: Reflux.createAction(),
  vote: Reflux.createAction(),
  Comments: {
    collection: Reflux.createAction(),
    add: Reflux.createAction(),
    save: Reflux.createAction(),
    remove: Reflux.createAction()
  },
  Thumbs: {
    post: Reflux.createAction(),
    add: Reflux.createAction(),
    save: Reflux.createAction(),
    remove: Reflux.createAction()
  },
  Tags: {
    add: Reflux.createAction(),
    remove: Reflux.createAction()
  },
  Links: {
    add: Reflux.createAction(),
    save: Reflux.createAction(),
    remove: Reflux.createAction()
  },
  Collaborators: {
    add: Reflux.createAction(),
    remove: Reflux.createAction()
  }
};
