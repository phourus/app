export function single(id) {
  return {type: 'POST_SINGLE', id}
}

export function change(key, value) {
  return {type: 'POST_CHANGE', key, value}
}

export function create(id) {
  return {type: 'POST_CREATE', id}
}

export function save(id) {
  return {type: 'POST_SAVE', id}
}

export function confirm() {
  return {type: 'TRASH_CONFIRM'}
}

export function cancel() {
  return {type: 'TRASH_CANCEL'}
}

export function trash(id) {
  return {type: 'POST_TRASH', id}
}

export function poll() {
  return {type: 'POST_POLL'}
}

export function vote() {
  return {type: 'POST_VOTE'}
}
