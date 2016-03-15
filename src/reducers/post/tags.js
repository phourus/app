"use strict";
const initialState = {}

export default function tags(state = initialState, action = {}) {
  switch (action.type) {
    case 'REQUEST_TAG_ADD':
      return state
    case 'RECEIVE_TAG_ADD':
      return state
    case 'REQUEST_TAG_REMOVE':
      return state
    case 'RECEIVE_TAG_REMOVE':
      return state
    default:
      return state
  }
}
