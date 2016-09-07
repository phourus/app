let type = 'sockets';
import account from '../rest/account';

export default {
  get: account.get,
  edit: account.edit,
  password: account.password,
  deactivate: account.deactivate,
  notifications: account.notifications,
  history: account.history,
  orgs: account.orgs,
  login: account.login,
  register: account.register,
  request: account.request,
  forgot: account.forgot,
  reset: account.reset,
  contact: account.contact
};
