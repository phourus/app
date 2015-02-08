var token = require('../token');
var io = require('socket.io-client');
var socket = io('http://localhost:3000/account', {query: 'token=' + token.get()});

socket.register = function (email, password) {
    socket.emit('register', email, password);
};
socket.login = function (username, password) {
    socket.emit('login', username, password);
};
socket.get = function () {
    socket.emit('get');  
};
socket.edit = function (model) {
    socket.emit('edit', model);
};
socket.deactivate = function () {
    socket.emit('deactivate');
};
socket.password = function (current, changed) {
    socket.emit('password', current, changed);  
};
socket.notifications = function (params) {
    socket.emit('notifications', params);
};
socket.history = function (params) {
    socket.emit('history', params);  
};

module.exports = socket;