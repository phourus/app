var type = 'sockets';
var comments = require('../rest/comments');

module.exports = {
  collection: comments.collection,
  add: comments.add,
  save: comments.save,
  remove: comments.remove
};
