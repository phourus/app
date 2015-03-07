let token = require('../token');
let socket = require('socket.io-client')('http://localhost:3000/users', {query: 'token=' + token.get()});

socket.single = function (id) {
    socket.emit('getSingle', id);
};
socket.collection = function (params) {
    socket.emit('getCollection', params);
};
module.exports = socket;
