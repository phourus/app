import Reflux from 'reflux';

export default {
  collection: Reflux.createAction(),
  request: Reflux.createAction(),
  approve: Reflux.createAction(),
  admin: Reflux.createAction(),
  revoke: Reflux.createAction(),
  deny: Reflux.createAction(),
  remove: Reflux.createAction()
};
