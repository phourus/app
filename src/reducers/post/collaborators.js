"use strict";
const initialState = {}

export default function util(state = initialState, action = {}) {
  switch (action.type) {
    case 'REQUEST_COLLABORATORS_LIST':
      return state
    case 'RECEIVE_COLLABORATORS_LIST':
      return state
    case 'REQUEST_COLLABORATORS_ADD':
      return state
    case 'RECEIVE_COLLABORATORS_ADD':
      return state
    case 'REQUEST_COLLABORATORS_REMOVE':
      return state
    case 'RECEIVE_COLLABORATORS_REMOVE':
      return state
    case 'REQUEST_COLLABORATORS_LOOKUP':
      return state
    case 'RECEIVE_COLLABORATORS_LOOKUP':
      return state
    default:
      return state
  }
}
