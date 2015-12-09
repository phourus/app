let w = require('window-or-global');
var http = require('../xhr')(w);
var base = '/rest/users/';
var settings = require('../settings');

module.exports = {
  single: function (id) {
    return http.get(base + id, settings());
  }
};
