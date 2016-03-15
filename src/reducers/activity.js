"use strict";
import update from 'react-addons-update'
const initialState = {
  notifications: [],
  history: []
}

export default function activity(state = initialState, action = {}) {
  switch (action.type) {
    case 'REQUEST_NOTIFICATIONS':
      return update(state, {
        $set: { ready: false }
      })
    case 'RECEIVE_NOTIFICATIONS':
      return update(state, {
        $set: {
          ready: true,
          notifications: action.data
        }
      })
    case 'REQUEST_HISTORY':
      return update(state, {
        $set: { ready: false }
      })
    case 'RECEIVE_HISTORY':
      return update(state, {
        $set: {
          ready: true,
          history: action.data
        }
      })
    default:
      return state
  }
}
