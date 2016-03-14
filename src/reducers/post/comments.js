"use strict";
const initialState = {}

export default function util(state = initialState, action = {}) {
  switch (action.type) {
    case 'REQUEST_COMMENTS_LIST':
      return state
    case 'RECEIVE_COMMENTS_LIST':
      return state
    case 'REQUEST_COMMENT_ADD':
      return state
    case 'RECEIVE_COMMENT_ADD':
      return state
    case 'REQUEST_COMMENT_SAVE':
      return state
    case 'RECEIVE_COMMENT_SAVE':
      return state
    case 'REQUEST_COMMENT_REMOVE':
      return state
    case 'RECEIVE_COMMENT_REMOVE':
      return state
    default:
      return state
  }
}
