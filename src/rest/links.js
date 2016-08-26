var http = require('../lib/xhr');
var base = '/rest/links/';

module.exports = {
  collection: function (params) {
    return http.get(base);
  },
  add: function (model) {
    return http.post(base, model);
  },
  save: function (id, model) {
    return http.put(base + id, model);
  },
  remove: function(id) {
    return http.del(base + id);
  }
};
