let w = require('window-or-global');
var http = require('../lib/xhr');
var base = '/rest/pages/';
var settings = require('../lib/settings');

module.exports = {
  get: function (page) {
    return http.get(base + page, settings());
  }
};
