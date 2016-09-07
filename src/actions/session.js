import Reflux from 'reflux';

export default {
  register: Reflux.createAction(),
  get: Reflux.createAction(),
  login: Reflux.createAction(),
  logout: Reflux.createAction(),
  orgs: Reflux.createAction()
};
