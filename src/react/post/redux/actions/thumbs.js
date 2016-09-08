export function post(id) {
  return {type: 'THUMBS_POST', id}
}

export function add(model) {
  return {type: 'THUMBS_ADD', model}
}

export function save(id, model) {
  return {type: 'THUMBS_SAVE', id, model}
}

export function remove(id) {
  return {type: 'THUMBS_REMOVE', id}
}
