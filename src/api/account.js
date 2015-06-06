var type = 'sockets';
var account = require('../rest/account');

module.exports = {
  get: account.get,
  edit: account.edit,
  password: account.password,
  deactivate: account.deactivate,
  notifications: account.notifications,
  history: account.history,
  login: account.login,
  register: account.register
};
