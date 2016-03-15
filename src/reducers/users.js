"use strict";
import update from 'react-addons-update'
const initialState = {
  id: 0,
  changes: {},
  single: {}
}

export default function users(state = initialState, action = {}) {
  switch (action.type) {
    case 'CHANGE_USER':
      let changes = state.changes
      changes[action.key] = action.value
      return update(state, {
        $set: { changes }
      })
    case 'REQUEST_SINGLE_USER':
      return update(state, {
        $set: { ready: false }
      })
    case 'RECEIVE_SINGLE_USER':
      return update(state, {
        $set: {
          ready: true,
          id: action.id,
          single: action.data
        }
      })
    default:
      return state
  }
}
