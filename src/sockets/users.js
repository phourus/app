let config = require('../../config').get("socket");
let token = require('../token');
let socket = require('socket.io-client')(`${config.url}:${config.port}/users`, {query: 'token=' + token.get()});

socket.single = function (id) {
    socket.emit('getSingle', id);
};
socket.collection = function (params) {
    socket.emit('getCollection', params);
};
module.exports = socket;
