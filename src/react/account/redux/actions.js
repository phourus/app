export function change(key, value) {
  return {type: 'ACCOUNT_CHANGE', key, value}
}

export function single(id) {
  return {type: 'ACCOUNT_SINGLE', id}
}

export function save() {
  return {type: 'ACCOUNT_SAVE'}
}

export function deactivate() {
  return {type: 'ACCOUNT_DEACTIVATE'}
}

export function lookup() {
  return {type: 'ACCOUNT_LOOKUP'}
}
