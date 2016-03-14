"use strict";
const initialState = {
  single: {},
  changes: {},
  poll: {},
  vote: {}
}

export default function tutorial(state = initialState, action = {}) {
  switch (action.type) {
    case 'REQUEST_POST_SINGLE':
      return state
    case 'RECEIVE_SINGLE_POST':
      return state
    case 'REQUEST_POST_ADD':
      return state
    case 'RECEIVE_POST_ADD':
      return state
    case 'REQUEST_POST_SAVE':
      return state
    case 'RECEIVE_POST_SAVE':
      return state
    case 'REQUEST_POST_TRASH':
      return state
    case 'RECEIVE_POST_TRASH':
      return state
    case 'CHANGE_POST':
      return state
    case 'REQUEST_POLL':
      return state
    case 'RECEIVE_POLL':
      return state
    case 'REQUEST_VOTE':
      return state
    case 'RECEIVE_VOTE':
      return state
    default:
      return state
  }
}
