let w = require('window-or-global');
var http = require('../lib/xhr');
var base = '/rest/links/';
var settings = require('../lib/settings');

module.exports = {
  collection: function (params) {
    return http.get(base, settings());
  },
  add: function (model) {
    return http.post(base, model, settings());
  },
  save: function (id, model) {
    return http.put(base + id, model, settings());
  },
  remove: function(id) {
    return http.del(base + id, settings());
  }
};
