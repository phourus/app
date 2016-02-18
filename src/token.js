"use strict";
let storage = {};
if (typeof document !== 'undefined') {
  let Client = require('cross-storage').CrossStorageClient;
  storage = new Client('/hub.html');
}

module.exports = storage;
