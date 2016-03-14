"use strict";
const initialState = {}

export default function tutorial(state = initialState, action = {}) {
  switch (action.type) {
    case 'FORGOT_PASSWORD':
      return state
    case 'RESET_PASSWORD':
      return state
    case 'SET_PASSWORD':
      return state
    default:
      return state
  }
}
