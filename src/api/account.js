var type = 'sockets';
var account = require('../ws/account');

module.exports = {
  get: account.get,
  edit: account.edit,
  password: account.password,
  deactivate: account.deactivate,
  notifications: account.notifications,
  history: account.history
};
