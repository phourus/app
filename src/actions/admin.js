"use strict";
let Reflux = require('reflux');

module.exports = {
  single: Reflux.createAction(),
  change: Reflux.createAction(),
  save: Reflux.createAction(),
  Members: {
    collection: Reflux.createAction(),
    request: Reflux.createAction(),
    approve: Reflux.createAction(),
    admin: Reflux.createAction(),
    revoke: Reflux.createAction(),
    deny: Reflux.createAction()
  },
  Categories: {

  }
};
