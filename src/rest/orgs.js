var http = require('../ajax')(window);
var config = require('../../config');
var base = config.get('url') + ':' + config.get('port') + '/rest/orgs/';
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
