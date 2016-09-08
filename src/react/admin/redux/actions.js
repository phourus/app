export function change(key, value) {
  return {type: 'ADMIN_CHANGE', key, value}
}

export function create(shortname) {
  return {type: 'ADMIN_CREATE', shortname}
}

export function single(id) {
  return {type: 'ADMIN_SINGLE', id}
}

export function save() {
  return {type: 'ADMIN_SAVE'}
}

export function lookup(name) {
  return {type: 'ADMIN_LOOKUP', name}
}

export function deactivate() {
  return {type: 'ADMIN_DEACTIVATE'}
}
