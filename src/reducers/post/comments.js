"use strict";
import update from 'react-addons-update'
const initialState = {
  list: []
}

export default function comments(state = initialState, action = {}) {
  switch (action.type) {
    case 'REQUEST_COMMENTS_LIST':
      return update(state, {
        $set: { ready: false }
      })
    case 'RECEIVE_COMMENTS_LIST':
      return update(state, {
        $set: {
          ready: true,
          list: action.data
        }
      })
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
