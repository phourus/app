import Reflux from 'reflux';

export default {
  collection: Reflux.createAction(),
  add: Reflux.createAction(),
  remove: Reflux.createAction(),
  lookup: Reflux.createAction()
};
