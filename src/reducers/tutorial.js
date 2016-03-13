"use strict";
const initialState = {
  test: 'init'
}

export default function tutorial(state = initialState, action = {}) {
  switch (action.type) {
    case 'READY':
      return {
        test: 'changed'
      }
    case 'RESET':
      return state
    default:
      return state
  }
}
