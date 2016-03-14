"use strict";
const initialState = {
  test: 'init'
}

export default function tutorial(state = initialState, action = {}) {
  switch (action.type) {
    case 'RECEIVE_PAGE':
      return state
    default:
      return state
  }
}
