var http = require('../ajax')(window);
var base = '/rest/orgs/';
var settings = require('../settings');

module.exports = {
  single: function (id) {
    return http.get(base + id, settings());
  }
};
