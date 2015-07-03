"use strict";
let Reflux = require('reflux');

module.exports = {
  collection: Reflux.createAction(),
  search: Reflux.createAction(),
  page: Reflux.createAction(),
  limit: Reflux.createAction(),
  sortBy: Reflux.createAction(),
  direction: Reflux.createAction(),
  exclude: Reflux.createAction(),
  context: Reflux.createAction()
}
