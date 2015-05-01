let config = require('../../config').get("socket");
let token = require('../token');
let socket = require('socket.io-client')(`${config.url}:${config.port}/comments`, {query: 'token=' + token.get()});

socket.collection = function (params) {
    socket.emit('getCollection', params);
};
socket.add = function (model) {
    socket.emit('postAdd', model);
};
socket.save = function (id, model) {
    socket.emit('putSave', id, model);
};
socket.remove = function (id) {
    socket.emit('delRemove', id);
};
module.exports = socket;
