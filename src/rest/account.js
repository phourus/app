var http = require('../ajax')(window);
var token = require('../token');
var base = '/rest/account/';
var settings = {
  headers: {
    "Authorization": token.get()
  },
  promise: true
};

module.exports = {
  get: function () {
    return http.get(base, settings);
  },
  edit: function (model) {
    return http.put(base, model, settings);
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
  orgs: function () {
    return http.get(base + 'orgs', settings);
  },
  login: function (email, password) {
    settings.headers.Authorization = "Basic " + new Buffer(email + ':' + password).toString('base64');
    return http.post(base + 'login', {}, settings);
  },
  register: function (email, password) {
    settings.headers.Authorization = "Basic " + new Buffer(email + ':' + password).toString('base64');
    return http.post(base + 'register', {}, settings);
  },
  refresh: function () {
    settings.headers.Authorization = token.get();
  }
};
