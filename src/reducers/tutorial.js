"use strict";
const initialState = {
  ready: false,
  reset: false
}

export default function tutorial(state = initialState, action = {}) {
  switch (action.type) {
    case 'READY':
      return state
    case 'RESET':
      return state
    default:
      return state
  }
}
