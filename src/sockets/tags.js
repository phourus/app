var token = require('../token');
var socket = require('socket.io-client')('http://localhost:3000/tags', {query: 'token=' + token.get()});

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