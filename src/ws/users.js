let config = require('../../config').get("socket");
let token = require('../lib/token');
let socket = require('socket.io-client')(`${config.url}:${config.port}/users`, {query: 'token=' + token.get()});

socket.single = function (id) {
    socket.emit('getSingle', id);
    return new Promise(function (resolve, reject) {
      socket.on('single', function (code, data) {
         if (code != 200) {
             reject(code);
         }
         resolve(data);
      });
    });
};
socket.collection = function (params) {
    socket.emit('getCollection', params);
    return new Promise(function (resolve, reject) {
      socket.on('collection', function (code, data) {
         if (code != 200) {
             reject(code);
         }
         resolve(data);
      });
    });
};
module.exports = socket;
