let w = require('window-or-global');
var http = require('../lib/xhr')(w);
var base = '/rest/collaborators/';
var settings = require('../lib/settings');

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
