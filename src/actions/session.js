"use strict";
let Reflux = require('reflux');

module.exports = {
  get: Reflux.createAction(),
  login: Reflux.createAction(),
  logout: Reflux.createAction(),
  orgs: Reflux.createAction()
};
