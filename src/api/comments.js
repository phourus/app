let type = 'sockets';
import comments from '../rest/comments';

export default {
  collection: comments.collection,
  add: comments.add,
  save: comments.save,
  remove: comments.remove
};
