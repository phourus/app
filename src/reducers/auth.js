"use strict";
import update from 'react-addons-update'
const initialState = {}

export default function auth(state = initialState, action = {}) {
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
