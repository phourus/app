export function request(email) {
  return {type: 'AUTH_REQUEST', email}
}

export function forgot(email) {
  return {type: 'AUTH_FORGOT', email}
}

export function reset(email, password, token, userId) {
  return {type: 'AUTH_RESET', email, password, token, userId}
}

export function password(current, updated) {
  return {type: 'AUTH_PASSWORD', current, updated}
}

export function register(email, password, username) {
  return {type: 'AUTH_REGISTER', email, password, username}
}

export function get() {
  return {type: 'AUTH_GET'}
}

export function login(email, password) {
  return {type: 'AUTH_LOGIN', email, password}
}

export function logout() {
  return {type: 'AUTH_LOGOUT'}
}

export function orgs() {
  return {type: 'AUTH_ORGS'}
}
