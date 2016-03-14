"use strict";
const initialState = {
  single: ''
}

export default function tutorial(state = initialState, action = {}) {
  switch (action.type) {
    case 'RECEIVE_PAGE':
      return state
    default:
      return state
  }
}
