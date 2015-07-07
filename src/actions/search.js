"use strict";
let Reflux = require('reflux');

module.exports = {
  collection: Reflux.createAction(),
  search: Reflux.createAction(),
  nextPage: Reflux.createAction(),
  previousPage: Reflux.createAction(),
  more: Reflux.createAction(),
  limit: Reflux.createAction(),
  sortBy: Reflux.createAction(),
  direction: Reflux.createAction(),
  exclude: Reflux.createAction(),
  context: Reflux.createAction(),
  comments: Reflux.createAction(),
  thumb: Reflux.createAction(),
  thumbs: Reflux.createAction()
}
