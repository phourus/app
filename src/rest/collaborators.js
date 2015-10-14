var http = require('../ajax')(window);
var base = '/rest/collaborators/';
var settings = require('../settings');

module.exports = {
  collection: function (postId) {
    return http.get(base + postId, settings());
  },
  add: function (model) {
    return http.post(base, model, settings());
  },
  remove: function(type, id) {
    return http.delete(base + type + '/' + id, settings());
  },
  lookup: function (orgId) {
    return http.get(base + 'lookup/' + orgId, settings());
  }
};
