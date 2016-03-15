"use strict";
import update from 'react-addons-update'
const initialState = {
  list: []
}

export default function folders(state = initialState, action = {}) {
  switch (action.type) {
    case 'REQUEST_FOLDERS_LIST':
      return update(state, {
        $set: { ready: false }
      })
    case 'RECEIVE_FOLDERS_LIST':
      return update(state, {
        $set: {
          ready: true,
          list: action.data
        }
      })
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
