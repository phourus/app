var http = require('../ajax')(window);
var config = require('../../config');
var base = config.get('url') + ':' + config.get('port') + '/rest/tags/';
var settings = {
  headers: {
    "Authorization": require('../token').get()
  },
  promise: true
}

module.exports = {

};
