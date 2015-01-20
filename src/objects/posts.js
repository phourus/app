var token = require('../token');
var io = require('socket.io-client');
var socket = io('http://localhost:3000/posts', {query: 'token=' + token.get()});

socket.single = function (id) {
    socket.emit('single', id);
};
socket.collection = function (params) {        
    socket.emit('collection', params);
};
socket.add = function (model) {
    socket.emit('add', model);
};
socket.save = function (id, model) {
    socket.emit('save', id, model);
};
socket.remove = function (id) {
    socket.emit('remove', id);
};
socket.account = function () {
    socket.emit('account');
};

module.exports = socket;