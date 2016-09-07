import members from '../rest/members';

export default {
  collection: members.collection,
  request: members.request,
  approve: members.approve,
  admin: members.admin,
  revoke: members.revoke,
  deny: members.deny,
  remove: members.remove
};
