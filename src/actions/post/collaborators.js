"use strict";
let Reflux = require('reflux');

module.exports = {
  collection: Reflux.createAction(),
  add: Reflux.createAction(),
  remove: Reflux.createAction(),
  lookup: Reflux.createAction()
};
