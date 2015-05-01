"use strict";
let Reflux = require('reflux');

module.exports = {
  single: Reflux.createAction(),
  Comments: {
    collection: Reflux.createAction(),
    add: Reflux.createAction()
  },
  Thumbs: {
    single: Reflux.createAction()
  }
}
