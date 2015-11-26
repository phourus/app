"use strict";
let Reflux = require('reflux');

module.exports = {
  collection: Reflux.createAction(),
  add: Reflux.createAction(),
  save: Reflux.createAction(),
  remove: Reflux.createAction()
};
