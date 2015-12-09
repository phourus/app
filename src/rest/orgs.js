let w = require('window-or-global');
var http = require('../xhr')(w);
var base = '/rest/orgs/';
var settings = require('../settings');

module.exports = {
  single: function (id) {
    return http.get(base + id, settings());
  },
  lookup: function (name) {
    return http.get(base + 'lookup/?name=' + name, settings());
  },
  add: function (name) {
    let model = {name: name};
    return http.post(base, model, settings());
  },
  save: function (id, model) {
    return http.put(base + id, model, settings());
  }
};
