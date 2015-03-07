let token = require('../token');
let io = require('socket.io-client');
let socket = io('http://localhost:3000/account', {query: 'token=' + token.get()});

socket.register = function (email, password) {
    socket.emit('postRegister', email, password);
};
socket.login = function (username, password) {
    socket.emit('postLogin', username, password);
};
socket.get = function () {
    socket.emit('getGet');
};
socket.edit = function (model) {
    socket.emit('putEdit', model);
};
socket.deactivate = function () {
    socket.emit('delDeactivate');
};
socket.password = function (current, changed) {
    socket.emit('putPassword', current, changed);
};
socket.notifications = function (params) {
    socket.emit('getNotifications', params);
};
socket.history = function (params) {
    socket.emit('getHistory', params);
};

module.exports = socket;
