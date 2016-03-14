"use strict";
const initialState = {
  list: []
}

export default function util(state = initialState, action = {}) {
  switch (action.type) {
    case 'REQUEST_LINK_ADD':
      return state
    case 'RECEIVE_LINK_ADD':
      return state
    case 'REQUEST_LINK_SAVE':
      return state
    case 'RECEIVE_LINK_SAVE':
      return state
    case 'REQUEST_LINK_REMOVE':
      return state
    case 'RECEIVE_LINK_REMOVE':
      return state
    default:
      return state
  }
}
