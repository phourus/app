var http = require('../ajax')(window);
var config = require('../../config');
var base = '/rest/users/';
var settings = {
  headers: {
    "Authorization": require('../token').get()
  },
  promise: true
}

module.exports = {
  single: function (id) {
    return http.get(base + id, settings);
  }
};
