"use strict";
let token = require('./token');
let Actions = require('../actions/session');
let t = '';
if (token.onConnect) {
  token.onConnect()
  .then(() => {
    token.get('token')
    .then((data) => {
      t = data;
    });
  });
}

module.exports = function () {
  return {
    headers: {
      "Authorization": t
    },
    promise: true
  };
};
