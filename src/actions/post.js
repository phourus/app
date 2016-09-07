import Reflux from 'reflux';

export default {
  single: Reflux.createAction(),
  refresh: Reflux.createAction(),
  change: Reflux.createAction(),
  add: Reflux.createAction(),
  save: Reflux.createAction(),
  trash: Reflux.createAction(),
  poll: Reflux.createAction(),
  vote: Reflux.createAction(),
};
