var http = require('../lib/xhr');
var base = '/rest/account/';

module.exports = {
  get: function () {
    return http.get(base);
  },
  edit: function (model) {
    return http.put(base, model);
  },
  password: function (model) {
    return http.put(base + 'password', model);
  },
  deactivate: function () {
    return http.del(base);
  },
  notifications: function() {
    return http.get(base + 'notifications');
  },
  history: function () {
    return http.get(base + 'history');
  },
  orgs: function () {
    return http.get(base + 'orgs');
  },
  login: function (email, password) {
    var headers = {
      Authorization: "Basic " + new Buffer(email + ':' + password).toString('base64')
    }
    return http.post(base + 'login', {}, headers);
  },
  register: function (email, password, username) {
    var headers = {
      Authorization: "Basic " + new Buffer(email + ':' + password).toString('base64')
    }
    return http.post(base + 'register', {username: username}, headers);
  },
  forgot: function (email) {
    return http.post('/rest/passwords/forgot', {email: email});
  },
  reset: function (email, password, token, userId) {
    var headers = {
      Authorization: "Basic " + new Buffer(email + ':' + password).toString('base64')
    }
    var model = {
      token: token,
      userId: userId
    };
    return http.post('/rest/passwords/reset', model, headers);
  },
  contact: function (email, message) {
    return http.post(base + 'contact', {email: email, message: message});
  }
};
