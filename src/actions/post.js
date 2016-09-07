let Reflux = require('reflux');

module.exports = {
  single: Reflux.createAction(),
  refresh: Reflux.createAction(),
  change: Reflux.createAction(),
  add: Reflux.createAction(),
  save: Reflux.createAction(),
  trash: Reflux.createAction(),
  poll: Reflux.createAction(),
  vote: Reflux.createAction(),
};
