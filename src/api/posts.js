var type = 'sockets';
var posts = require('../ws/posts');

module.exports = {
  single: posts.single,
  collection: posts.collection,
  add: posts.add,
  save: posts.save,
  account: posts.account
};
