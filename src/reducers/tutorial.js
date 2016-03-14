"use strict";
const initialState = {}

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
