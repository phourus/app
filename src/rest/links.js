let w = require('window-or-global');
var http = require('../xhr')(w);
var base = '/rest/links/';
var settings = require('../settings');

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
    return http.delete(base + id, settings());
  }
};
