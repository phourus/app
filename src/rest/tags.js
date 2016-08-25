let w = require('window-or-global');
var http = require('../lib/xhr')(w);
var base = '/rest/tags/';
var settings = require('../lib/settings');

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
