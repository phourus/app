export function single(id) {
  return {type: 'POST_SINGLE', id}
}

export function create(id) {
  return {type: 'POST_CREATE', id}
}

export function edit(id) {
  return {type: 'POST_EDIT', id}
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
