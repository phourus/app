var http = require('../ajax')(window);
var config = require('../../config').get('rest');
var base = config.url + ':' + config.port + '/comments/';
var settings = {
  headers: {
    "Authorization": require('../token').get()
  },
  promise: true
}

module.exports = {

};