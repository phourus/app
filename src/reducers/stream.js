"use strict";
const init = {
  list: null,
  total: 0,
  selected: 0,
  scroll: false,
  params: {
    exclude: [],
    search: '',
    sortBy: 'influence',
    direction: 'DESC',
    page: 1,
    limit: 10,
    folder: 0,
    context: {
      type: '',
      id: null
    }
  }
}

export default function util(state = init, action = {}) {
  switch (action.type) {
    case 'REQUEST_STREAM_COLLECTION':
      return state
    case 'RECEIVE_STREAM_COLLECTION':
      return state
    case 'STREAM_SELECT':
      return state
    case 'REQUEST_STREAM_SINGLE':
      return state
    case 'RECEIVE_STREAM_SINGLE':
      return state
    case 'STREAM_SEARCH':
      return state
    case 'STREAM_NEXT':
      return state
    case 'STREAM_PREV':
      return state
    case 'STREAM_MORE':
      return state
    case 'STREAM_LIMIT':
      return state
    case 'STREAM_SORTBY':
      return state
    case 'STREAM_DIRECTION':
      return state
    case 'STREAM_EXCLUDE':
      return state
    case 'STREAM_TYPE':
      return state
    case 'STREAM_CONTEXT':
      return state
    case 'STREAM_FOLDER':
      return state
    default:
      return state
  }
}
