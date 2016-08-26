var http = require('../lib/xhr');
var base = '/rest/orgs/';

module.exports = {
  single: function (id) {
    return http.get(base + id);
  },
  lookup: function (name) {
    return http.get(base + 'lookup/?name=' + name);
  },
  add: function (shortname) {
    let model = {shortname: shortname};
    return http.post(base, model);
  },
  save: function (id, model) {
    return http.put(base + id, model);
  }
};
