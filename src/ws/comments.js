let config = require('../../config').get("socket");
let token = require('../token');
let socket = require('socket.io-client')(`${config.url}:${config.port}/comments`, {query: 'token=' + token.get()});

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
socket.add = function (model) {
    socket.emit('postAdd', model);
    return new Promise(function (resolve, reject) {
      socket.on('add', function (code, data) {
         if (code != 200) {
             reject(code);
         }
         resolve(data);
      });
    });
};
socket.save = function (id, model) {
    socket.emit('putSave', id, model);
    return new Promise(function (resolve, reject) {
      socket.on('save', function (code, data) {
         if (code != 200) {
             reject(code);
         }
         resolve(data);
      });
    });
};
socket.remove = function (id) {
    socket.emit('delRemove', id);
    return new Promise(function (resolve, reject) {
      socket.on('remove', function (code, data) {
         if (code != 200) {
             reject(code);
         }
         resolve(data);
      });
    });
};
module.exports = socket;
