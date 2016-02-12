"use strict";
let Reflux = require('reflux');

module.exports = {
  register: Reflux.createAction(),
  request: Reflux.createAction(),
  forgot: Reflux.createAction(),
  reset: Reflux.createAction(),
  password: Reflux.createAction()
};
