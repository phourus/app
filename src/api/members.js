var members = require('../rest/members');

module.exports = {
  collection: members.collection,
  request: members.request,
  approve: members.approve,
  admin: members.admin,
  revoke: members.revoke,
  deny: members.deny
};
