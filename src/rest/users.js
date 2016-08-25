let w = require('window-or-global');
var http = require('../lib/xhr')(w);
var base = '/rest/users/';
var settings = require('../lib/settings');

module.exports = {
  single: function (id) {
    return http.get(base + id, settings());
  }
};
