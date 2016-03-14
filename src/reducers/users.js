"use strict";
const initialState = {}

export default function tutorial(state = initialState, action = {}) {
  switch (action.type) {
    case 'CHANGE_USER':
      return state
    case 'REQUEST_SINGLE_USER':
      return state
    case 'RECEIVE_SINGLE_USER':
      return state
    default:
      return state
  }
}
