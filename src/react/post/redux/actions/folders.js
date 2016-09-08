export function collection() {
  return {type: 'FOLDERS_COLLECTION'}
}

export function add(model) {
  return {type: 'FOLDERS_ADD', model}
}

export function remove(id) {
  return {type: 'FOLDERS_REMOVE', id}
}
