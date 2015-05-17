var type = 'sockets';
var posts = require('../rest/posts');

module.exports = {
  single: posts.single,
  collection: posts.collection,
  add: posts.add,
  save: posts.save,
  remove: posts.remove,
  account: posts.account
};
