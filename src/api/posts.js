var type = 'sockets';
import posts from '../rest/posts';

export default {
  single: posts.single,
  collection: posts.collection,
  add: posts.add,
  save: posts.save,
  remove: posts.remove,
  account: posts.account,
  poll: posts.poll,
  vote: posts.vote,
  folder: posts.folder
};
