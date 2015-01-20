var token = require('../token');
var socket = require('socket.io-client')('http://localhost:3000/orgs', {query: 'token=' + token.get()});

socket.single = function (id) {
    socket.emit('single', id);
};
socket.collection = function (params) {        
    socket.emit('collection', params);
};
socket.create = function (model) {
    socket.emit('create', model);
};
socket.update = function (id, model) {
    socket.emit('update', id, model);
};
socket.remove = function (id) {
    socket.emit('remove', id);
};

module.exports = socket;