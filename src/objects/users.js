var token = require('../token');
var socket = require('socket.io-client')('http://localhost:3000/users', {query: 'token=' + token.get()});

socket.single = function (id) {
    socket.emit('single', id);
};
socket.collection = function (params) {        
    socket.emit('collection', params);
};
module.exports = socket;