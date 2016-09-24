export function collection() {
  return {type: 'STREAM_COLLECTION'}
}

export function save(postId, folderId) {
  return {type: 'STREAM_SAVE', postId, folderId}
}

export function exclude(type) {
  return {type: 'STREAM_EXCLUDE', type}
}

export function type(selected) {
  return {type: 'STREAM_TYPE', selected}
}

export function context(contextType, id) {
  return {type: 'STREAM_CONTEXT', contextType, id}
}

export function folder(id) {
  return {type: 'STREAM_FOLDER', id}
}

export function more() {
  return {type: 'STREAM_MORE'}
}

export function search(term) {
  return {type: 'STREAM_SEARCH', term}
}

export function limit(value) {
  return {type: 'STREAM_LIMIT', value}
}

export function sortBy(field) {
  return {type: 'STREAM_SORT', field}
}

export function direction(dir) {
  return {type: 'STREAM_DIRECTION', dir}
}
