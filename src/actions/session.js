let Reflux = require('reflux');

module.exports = {
  register: Reflux.createAction(),
  get: Reflux.createAction(),
  login: Reflux.createAction(),
  logout: Reflux.createAction(),
  orgs: Reflux.createAction()
};
