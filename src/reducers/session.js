"use strict";
const initialState = {
  session: {}
}

export default function session(state = initialState, action = {}) {
  switch (action.type) {
    case 'REQUEST_REGISTER':
      return state
    case 'RECEIVE_REGISTER':
      return state
    case 'REQUEST_SESSION':
      return state
    case 'RECEIVE_SESSION':
      return state
    case 'REQUEST_LOGIN':
      return state
    case 'RECEIVE_LOGIN':
      return state
    case 'REQUEST_SESSION_ORGS':
      return state
    case 'RECEIVE_SESSION_ORGS':
      return state
    case 'RESET':
      return state
    default:
      return state
  }
}
