"use strict";
import update from 'react-addons-update'
const initialState = {
  list: [],
  lookup: []
}

export default function collaborators(state = initialState, action = {}) {
  switch (action.type) {
    case 'REQUEST_COLLABORATORS_LIST':
      return update(state, {
        $set: { ready: false }
      })
    case 'RECEIVE_COLLABORATORS_LIST':
      return update(state, {
        $set: {
          ready: true,
          list: action.data
        }
      })
    case 'REQUEST_COLLABORATORS_ADD':
      return state
    case 'RECEIVE_COLLABORATORS_ADD':
      return state
    case 'REQUEST_COLLABORATORS_REMOVE':
      return state
    case 'RECEIVE_COLLABORATORS_REMOVE':
      return state
    case 'REQUEST_COLLABORATORS_LOOKUP':
      return update(state, {
        $set: { ready: false }
      })
    case 'RECEIVE_COLLABORATORS_LOOKUP':
      return update(state, {
        $set: {
          ready: true,
          lookup: action.lookup
        }
      })
    default:
      return state
  }
}
