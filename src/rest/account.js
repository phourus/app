var http = require('../ajax')(window);
var config = require('../../config').get('rest');
var base = config.url + ':' + config.port + '/account/';
var settings = {
  headers: {
    "Authorization": require('../token').get()
  },
  promise: true
}

module.exports = {
  get: function () {
    return http.get(base, settings);
  },
  edit: function () {
    return http.put(base, settings);
  },
  password: function (model) {
    return http.put(base + 'password', model, settings);
  },
  deactivate: function () {
    return http.delete(base, settings);
  },
  notifications: function() {
    return http.get(base + 'notifications', settings);
  },
  history: function () {
    return http.get(base + 'history', settings);
  },
  login: function (email, password) {
    settings.headers.Authorization = "Basic " + new Buffer(email + ':' + password).toString('base64');
    return http.post(base + 'login', {}, settings);
  },
  register: function () {
    return http.post(base + 'register', {}, settings);
  }
};
