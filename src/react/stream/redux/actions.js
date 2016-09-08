export function collection() {
  return {type: 'STREAM_COLLECTION'}
}

export function select(id) {
  return {type: 'STREAM_SELECT', id}
}

export function single(id) {
  return {type: 'STREAM_SINGLE', id}
}

export function search(term) {
  return {type: 'STREAM_SEARCH', term}
}

export function nextPage() {
  return {type: 'STREAM_NEXT'}
}

export function prevPage() {
  return {type: 'STREAM_PREV'}
}

export function more() {
  return {type: 'STREAM_MORE'}
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

export function exclude(type) {
  return {type: 'STREAM_EXCLUDE', type}
}

export function type(selected) {
  return {type: 'STREAM_TYPE', selected}
}

export function context(type, id) {
  return {type: 'STREAM_CONTEXT', type, id}
}

export function folder(id) {
  return {type: 'STREAM_FOLDER', id}
}

export function save(postId, folderId) {
  return {type: 'STREAM_SAVE', postId, folderId}
}
