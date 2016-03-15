"use strict";
import update from 'react-addons-update'
const initialState = {
  ready: false,
  reset: false
}

export default function tutorial(state = initialState, action = {}) {
  switch (action.type) {
    case 'READY':
      return update(state, {
        ready: true
      })
    case 'RESET':
      return state
    default:
      return state
  }
}
