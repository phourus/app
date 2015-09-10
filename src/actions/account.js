"use strict";
let Reflux = require('reflux');

module.exports = {
  change: Reflux.createAction(),
  get: Reflux.createAction(),
  edit: Reflux.createAction(),
  password: Reflux.createAction(),
  deactivate: Reflux.createAction(),
  history: Reflux.createAction(),
  notifications: Reflux.createAction(),
  orgs: Reflux.createAction(),
  login: Reflux.createAction(),
  register: Reflux.createAction(),
  request: Reflux.createAction(),
  forgot: Reflux.createAction(),
  reset: Reflux.createAction(),
  logout: Reflux.createAction()
};
