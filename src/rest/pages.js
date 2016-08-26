var http = require('../lib/xhr');
var base = '/rest/pages/';

module.exports = {
  get: function (page) {
    return http.get(base + page);
  }
};
