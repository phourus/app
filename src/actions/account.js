"use strict";
let Reflux = require('reflux');

module.exports = {
  get: Reflux.createAction(),
  edit: Reflux.createAction(),
  password: Reflux.createAction(),
  deactivate: Reflux.createAction(),
  history: Reflux.createAction(),
  notifications: Reflux.createAction()
}
