"use strict";
const initialState = {
  notifications: [],
  history: []
}

export default function tutorial(state = initialState, action = {}) {
  switch (action.type) {
    case 'REQUEST_NOTIFICATIONS':
      return state
    case 'RECEIVE_NOTIFICATIONS':
      return state
    case 'REQUEST_HISTORY':
      return state
    case 'RECEIVE_HISTORY':
      return state
    default:
      return state
  }
}
