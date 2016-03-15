"use strict";
import update from 'react-addons-update'
const initialState = {
  list: []
}

export default function members(state = initialState, action = {}) {
  switch (action.type) {
    case 'REQUEST_MEMBERS':
      return update(state, {
        $set: { ready: false }
      })
    case 'RECEIVE_MEMBERS':
      return update(state, {
        $set: {
          ready: true,
          list: action.data
        }
      })
    case 'REQUEST_MEMBERSHIP':
      return update(state, {
        $set: { ready: false }
      })
    case 'RECEIVE_MEMBERSHIP':
      return update(state, {
        $set: {
          ready: true,
          data: action.data
        }
      })
    default:
      return state
  }
}
