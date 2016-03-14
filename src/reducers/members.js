"use strict";
const initialState = {
  test: 'init'
}

export default function tutorial(state = initialState, action = {}) {
  switch (action.type) {
    case 'REQUEST_MEMBERS':
      return state
    case 'RECEIVE_MEMBERS':
      return state
    case 'REQUEST_MEMBERSHIP':
      return state
    case 'RECEIVE_MEMBERSHIP':
      return state
    default:
      return state
  }
}
