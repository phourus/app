"use strict";
const initialState = {
  changes: {},
  single: {},
  list: [],
  lookup: []
}

export default function tutorial(state = initialState, action = {}) {
  switch (action.type) {
    case 'CHANGE_ORG':
      return state
    case 'REQUEST_CREATE_ORG':
      return state
    case 'RECEIVE_CREATE_ORG':
      return state
    case 'REQUEST_SINGLE_ORG':
      return state
    case 'RECEIVE_SINGLE_ORG':
      return state
    case 'REQUEST_SAVE_ORG':
      return state
    case 'RECEIVE_SAVE_ORG':
      return state
    case 'REQUEST_LOOKUP_ORGS':
      return state
    case 'RECEIVE_LOOKUP_ORGS':
      return state
    default:
      return state
  }
}
