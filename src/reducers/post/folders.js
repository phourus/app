"use strict";
const initialState = {
  list: []
}

export default function util(state = initialState, action = {}) {
  switch (action.type) {
    case 'REQUEST_FOLDERS_LIST':
      return state
    case 'RECEIVE_FOLDERS_LIST':
      return state
    case 'REQUEST_FOLDER_ADD':
      return state
    case 'RECEIVE_FOLDER_ADD':
      return state
    case 'REQUEST_FOLDER_REMOVE':
      return state
    case 'RECEIVE_FOLDER_REMOVE':
      return state
    default:
      return state
  }
}
