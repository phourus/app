let token = require('../token');
let socket = require('socket.io-client')('http://localhost:3000/orgs', {query: 'token=' + token.get()});

socket.single = function (id) {
    socket.emit('getSingle', id);
};
socket.collection = function (params) {
    socket.emit('getCollection', params);
};
socket.create = function (model) {
    socket.emit('postCreate', model);
};
socket.update = function (id, model) {
    socket.emit('putUpdate', id, model);
};
socket.remove = function (id) {
    socket.emit('delRemove', id);
};

module.exports = socket;
