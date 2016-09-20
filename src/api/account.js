import * as http from '../lib/xhr'
let base = '/rest/account/';

export default {
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
    let headers = {
      Authorization: "Basic " + new Buffer(email + ':' + password).toString('base64')
    };
    return http.token(base + 'login', {}, headers);
  },
  register: function (email, password, username) {
    let headers = {
      Authorization: "Basic " + new Buffer(email + ':' + password).toString('base64')
    };
    return http.post(base + 'register', {username: username}, headers);
  },
  forgot: function (email) {
    return http.post('/rest/passwords/forgot', {email: email});
  },
  reset: function (email, password, token, userId) {
    let headers = {
      Authorization: "Basic " + new Buffer(email + ':' + password).toString('base64')
    };
    let model = {
      token: token,
      userId: userId
    };
    return http.post('/rest/passwords/reset', model, headers);
  },
  contact: function (email, message) {
    return http.post(base + 'contact', {email: email, message: message});
  }
};
