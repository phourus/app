let Reflux = require('reflux');

module.exports = {
  User: {
    change: Reflux.createAction(),
    single: Reflux.createAction(),
    save: Reflux.createAction(),
    deactivate: Reflux.createAction()
  },
  Org: {
    change: Reflux.createAction(),
    create: Reflux.createAction(),
    single: Reflux.createAction(),
    save: Reflux.createAction(),
    lookup: Reflux.createAction(),
    deactivate: Reflux.createAction()
  }
};
