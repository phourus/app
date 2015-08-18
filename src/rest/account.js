var http = require('../ajax')(window);
var token = require('../token');
var base = '/rest/account/';
var settings = require('../settings');

module.exports = {
  get: function () {
    return http.get(base, settings());
  },
  edit: function (model) {
    return http.put(base, model, settings());
  },
  password: function (model) {
    return http.put(base + 'password', model, settings());
  },
  deactivate: function () {
    return http.delete(base, settings());
  },
  notifications: function() {
    return http.get(base + 'notifications', settings());
  },
  history: function () {
    return http.get(base + 'history', settings());
  },
  orgs: function () {
    return http.get(base + 'orgs', settings());
  },
  login: function (email, password) {
    var _settings = settings();
    _settings.headers.Authorization = "Basic " + new Buffer(email + ':' + password).toString('base64');
    return http.post(base + 'login', {}, _settings);
  },
  register: function (email, password) {
    var _settings = settings();
    _settings.headers.Authorization = "Basic " + new Buffer(email + ':' + password).toString('base64');
    return http.post(base + 'register', {}, _settings);
  }
};
