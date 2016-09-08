export function collection(postId) {
  return {type: 'COLLABORATORS_LIST', postId}
}

export function add(model) {
  return {type: 'COLLABORATORS_ADD', model}
}

export function remove(type, id) {
  return {type: 'COLLABORATORS_REMOVE', type, id}
}

export function lookup(orgId) {
  return {type: 'COLLABORATORS_LOOKUP', orgId}
}
