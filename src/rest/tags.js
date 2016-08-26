var http = require('../lib/xhr');
var base = '/rest/tags/';

module.exports = {
  collection: function (params) {
    return http.get(base);
  },
  add: function (model) {
    return http.post(base, model);
  },
  remove: function(id) {
    return http.del(base + id);
  }
};
