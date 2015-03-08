"use strict";
let Reflux = require('reflux');

module.exports = {
  account: Reflux.createAction(),
  single: Reflux.createAction(),
  add: Reflux.createAction(),
  save: Reflux.createAction(),
  remove: Reflux.createAction(),
  reset: Reflux.createAction(),
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
}
