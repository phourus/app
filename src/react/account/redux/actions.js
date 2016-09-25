export function change(key, value) {
  return {type: 'ACCOUNT_CHANGE', key, value}
}

export function save() {
  return {type: 'ACCOUNT_SAVE'}
}

export function deactivate() {
  return {type: 'ACCOUNT_DEACTIVATE'}
}
