export function add(model) {
  return {type: 'LINKS_ADD', model}
}

export function save(id, model) {
  return {type: 'LINKS_SAVE', id, model}
}

export function remove(id) {
  return {type: 'LINKS_REMOVE', id}
}
