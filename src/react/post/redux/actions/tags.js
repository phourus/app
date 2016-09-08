export function add(model) {
  return {type: 'TAGS_ADD', model}
}

export function remove(id) {
  return {type: 'TAGS_REMOVE', id}
}
