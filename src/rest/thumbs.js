var http = require('../lib/xhr');
var base = '/rest/thumbs/';

module.exports = {
  post: function (postId) {
    return http.get(base + 'post/' + postId);
  },
  user: function () {
    return http.get(base + 'user/');
  },
  add: function (model) {
    return http.post(base, model);
  },
  save: function (id, model) {
    return http.put(base + id, model);
  },
  remove: function (id) {
    return http.del(base + id);
  },
};
