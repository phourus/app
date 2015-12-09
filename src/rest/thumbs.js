let w = require('window-or-global');
var http = require('../xhr')(w);
var base = '/rest/thumbs/';
var settings = require('../settings');

module.exports = {
  post: function (postId) {
    return http.get(base + 'post/' + postId, settings());
  },
  user: function () {
    return http.get(base + 'user/', settings());
  },
  add: function (model) {
    return http.post(base, model, settings());
  },
  save: function (id, model) {
    return http.put(base + id, model, settings());
  },
  remove: function (id) {
    return http.delete(base + id, settings());
  },
};
