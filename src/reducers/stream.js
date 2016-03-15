"use strict";
import update from 'react-addons-update'
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

export default function stream(state = init, action = {}) {
  switch (action.type) {
    case 'REQUEST_STREAM_COLLECTION':
      return update(state, {
        $set: { ready: false }
      })
    case 'RECEIVE_STREAM_COLLECTION':
      return update(state, {
        $set: {
          ready: true,
          list: action.data,
        }
      })
    case 'STREAM_SELECT':
      return update(state, {
        $set: {
          id: action.id,
          scroll: false
        }
      })
    case 'REQUEST_STREAM_SINGLE':
      return update(state, {
        $set: { ready: false }
      })
    case 'RECEIVE_STREAM_SINGLE':
      return update(state, {
        $set: {
          ready: true,
          id: action.id,
          single: action.data
        }
      })
    case 'STREAM_SEARCH':
      return update(state, {
        params: {
          $set: { search: action.search }
        }
      })
    case 'STREAM_NEXT':
      return state
    case 'STREAM_PREV':
      return state
    case 'STREAM_MORE':
      return state
    case 'STREAM_LIMIT':
      return update(state, {
        params: {
          $set: { limit: action.limit }
        }
      })
    case 'STREAM_SORTBY':
      return update(state, {
        params: {
          $set: { sortBy: action.sortBy }
        }
      })
    case 'STREAM_DIRECTION':
      return update(state, {
        params: {
          $set: { direction: action.direction }
        }
      })
    case 'STREAM_EXCLUDE':
      return state
    case 'STREAM_TYPE':
      return state
    case 'STREAM_CONTEXT':
      return update(state, {
        params: {
          $set: { context: action.context }
        }
      })
    case 'STREAM_FOLDER':
      return update(state, {
        params: {
          $set: { folder: action.id }
        }
      })
    default:
      return state
  }
}
