export function collection(params) {
  return {type: 'COMMENTS_LIST', params}
}

export function add(model) {
  return {type: 'COMMENTS_ADD', model}
}

export function save(id, model) {
  return {type: 'COMMENT_SAVE', id, model}
}

export function remove(id) {
  return {type: 'COMMENT_REMOVE', id}
}
