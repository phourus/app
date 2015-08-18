var http = require('../ajax')(window);
var base = '/rest/tags/';
var settings = require('../settings');

module.exports = {
  collection: function (params) {
    return http.get(base, settings());
  },
  add: function (model) {
    return http.post(base, model, settings());
  },
  remove: function(id) {
    return http.delete(base + id, settings());
  }
};
