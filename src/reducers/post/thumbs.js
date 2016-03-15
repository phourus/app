"use strict";
const initialState = {
  post: {}
}

export default function thumbs(state = initialState, action = {}) {
  switch (action.type) {
    case 'REQUEST_THUMB_POST':
      return state
    case 'RECEIVE_THUMB_POST':
      return state
    case 'REQUEST_THUMB_ADD':
      return state
    case 'RECEIVE_THUMB_ADD':
      return state
    case 'REQUEST_THUMB_SAVE':
      return state
    case 'RECEIVE_THUMB_SAVE':
      return state
    case 'REQUEST_THUMB_REMOVE':
      return state
    case 'RECEIVE_THUMB_REMOVE':
      return state
    default:
      return state
  }
}
