"use strict";
const initialState = {
  id: '',
  content: ''
}

export default function pages(state = initialState, action = {}) {
  switch (action.type) {
    case 'RECEIVE_PAGE':
      return update(state, {
        $set: {
          id: action.id,
          content: action.content
        }
      })
    default:
      return state
  }
}
