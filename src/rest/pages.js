var http = require('../ajax')(window);
var base = '/rest/pages/';
var settings = require('../settings');

module.exports = {
  get: function (page) {
    return http.get(base + page, settings());
  }
};
