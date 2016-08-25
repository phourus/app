let config = require('../../config').get("socket");
let token = require('../lib/token');
let socket = require('socket.io-client')(`${config.url}:${config.port}/account`, {query: 'token=' + token.get()});

socket.register = function (email, password) {
    socket.emit('postRegister', email, password);
    return new Promise(function (resolve, reject) {
      socket.on('register', function (code, data) {
         if (code != 200) {
             reject(code);
         }
         resolve(data);
      });
    });
};
socket.login = function (username, password) {
    socket.emit('postLogin', username, password);
    return new Promise(function (resolve, reject) {
      socket.on('login', function (code, data) {
         if (code != 200) {
             reject(code);
         }
         resolve(data);
      });
    });
};
socket.get = function () {
    socket.emit('getGet');
    return new Promise(function (resolve, reject) {
      socket.on('get', function (code, data) {
         if (code != 200) {
             reject(code);
         }
         resolve(data);
      });
    });
};
socket.edit = function (model) {
    socket.emit('putEdit', model);
    return new Promise(function (resolve, reject) {
      socket.on('edit', function (code, data) {
         if (code != 200) {
             reject(code);
         }
         resolve(data);
      });
    });
};
socket.deactivate = function () {
    socket.emit('delDeactivate');
    return new Promise(function (resolve, reject) {
      socket.on('deactivate', function (code, data) {
         if (code != 200) {
             reject(code);
         }
         resolve(data);
      });
    });
};
socket.password = function (current, changed) {
    socket.emit('putPassword', current, changed);
    return new Promise(function (resolve, reject) {
      socket.on('password', function (code, data) {
         if (code != 200) {
             reject(code);
         }
         resolve(data);
      });
    });
};
socket.notifications = function (params) {
    socket.emit('getNotifications', params);
    return new Promise(function (resolve, reject) {
      socket.on('notifications', function (code, data) {
         if (code != 200) {
             reject(code);
         }
         resolve(data);
      });
    });
};
socket.history = function (params) {
    socket.emit('getHistory', params);
    return new Promise(function (resolve, reject) {
      socket.on('history', function (code, data) {
         if (code != 200) {
             reject(code);
         }
         resolve(data);
      });
    });
};

module.exports = socket;
