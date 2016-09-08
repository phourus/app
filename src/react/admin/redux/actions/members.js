export function collection(id) {
  return {type: 'MEMBERS_COLLECTION', id}
}

export function request(orgId) {
  return {type: 'MEMBERS_REQUEST', orgId}
}

export function approve(id) {
  return {type: 'MEMBERS_APPROVE', id}
}

export function admin(id) {
  return {type: 'MEMBERS_ADMIN', id}
}

export function revoke(id) {
  return {type: 'MEMBERS_REVOKE', id}
}

export function deny(id) {
  return {type: 'MEMBERS_DENY', id}
}

export function remove(orgId) {
  return {type: 'MEMBERS_REMOVE', orgId}
}
