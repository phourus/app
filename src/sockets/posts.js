var token = require('../token');
var io = require('socket.io-client');
var socket = io('http://localhost:3000/posts', {query: 'token=' + token.get()});

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
socket.account = function () {
    socket.emit('getAccount');
};

module.exports = socket;