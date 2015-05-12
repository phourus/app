let config = require('../../config').get("socket");
let token = require('../token');
let socket = require('socket.io-client')(`${config.url}:${config.port}/orgs`, {query: 'token=' + token.get()});

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
socket.create = function (model) {
    socket.emit('postCreate', model);
    return new Promise(function (resolve, reject) {
      socket.on('create', function (code, data) {
         if (code != 200) {
             reject(code);
         }
         resolve(data);
      });
    });
};
socket.update = function (id, model) {
    socket.emit('putUpdate', id, model);
    return new Promise(function (resolve, reject) {
      socket.on('update', function (code, data) {
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
