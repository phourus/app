var http = require('../lib/xhr');
var base = '/rest/users/';

module.exports = {
  single: function (id) {
    return http.get(base + id);
  }
};
