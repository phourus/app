let w = require('window-or-global');
var http = require('../xhr')(w);
var base = '/rest/pages/';
var settings = require('../settings');

module.exports = {
  get: function (page) {
    return http.get(base + page, settings());
  }
};
