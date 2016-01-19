var type = 'sockets';
var folders = require('../rest/folders');

module.exports = {
  collection: folders.collection,
  add: folders.add,
  save: folders.save,
  remove: folders.remove
};
