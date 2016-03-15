"use strict";
import update from 'react-addons-update'
const initialState = {
  changes: {},
  single: {},
  list: [],
  lookup: []
}

export default function orgs(state = initialState, action = {}) {
  switch (action.type) {
    case 'CHANGE_ORG':
      let changes = state.changes
      changes[action.key] = action.value
      return update(state, {
        $set: { changes }
      })
    case 'REQUEST_CREATE_ORG':
      return update(state, {
        $set: { ready: false }
      })
    case 'RECEIVE_CREATE_ORG':
      return update(state, {
        $set: {
          ready: true,
          data: action.data
        }
      })
    case 'REQUEST_SINGLE_ORG':
      return update(state, {
        $set: { ready: false }
      })
    case 'RECEIVE_SINGLE_ORG':
      return update(state, {
        $set: {
          ready: true,
          single: action.data
        }
      })
    case 'REQUEST_SAVE_ORG':
      return update(state, {
        $set: { ready: false }
      })
    case 'RECEIVE_SAVE_ORG':
      return update(state, {
        $set: {
          ready: true,
          data: action.data
        }
      })
    case 'REQUEST_LOOKUP_ORGS':
      return update(state, {
        $set: { ready: false }
      })
    case 'RECEIVE_LOOKUP_ORGS':
      return update(state, {
        $set: {
          ready: true,
          lookup: action.data
        }
      })
    default:
      return state
  }
}
