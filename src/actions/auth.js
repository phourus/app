let Reflux = require('reflux');

module.exports = {
  request: Reflux.createAction(),
  forgot: Reflux.createAction(),
  reset: Reflux.createAction(),
  password: Reflux.createAction()
};
