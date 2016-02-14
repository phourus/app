"use strict";
let storage = {};
if (typeof document !== 'undefined') {
  let Client = require('cross-storage').CrossStorageClient;
  storage = new Client('http://phourus.local:3000/hub.html');
}

module.exports = storage;
