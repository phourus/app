export function page(id) {
  return {type: 'PAGE_GET', id}
}

export function contact(email, message) {
  return {type: 'CONTACT_SUBMIT', email, message}
}
