let config = require('../../config').get("socket");
let token = require('../lib/token');
let socket = require('socket.io-client')(`${config.url}:${config.port}/thumbs`, {query: 'token=' + token.get()});

socket.single = function (id) {
    socket.emit('getSingle', id);
};
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
