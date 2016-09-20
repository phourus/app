export function single(id) {
  return {type: 'POST_SINGLE', id}
}

export function change(key, value) {
  return {type: 'POST_CHANGE', key, value}
}

export function create() {
  return {type: 'POST_CREATE'}
}

export function save() {
  return {type: 'POST_SAVE'}
}

export function confirm() {
  return {type: 'TRASH_CONFIRM'}
}

export function cancel() {
  return {type: 'TRASH_CANCEL'}
}

export function trash() {
  return {type: 'POST_TRASH'}
}

export function poll() {
  return {type: 'POST_POLL'}
}

export function vote() {
  return {type: 'POST_VOTE'}
}
