import update from 'react-addons-update'
const initState = {
  ready: false,
  posts: null,
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
  },
  folders: []
}

export default (state = initState, action = {}) => {

  switch(action.type) {
    case 'REQUEST_STREAM_COLLECTION':
      return update(state, {
        ready: {$set: false}
      })
      break
    case 'RECEIVE_STREAM_COLLECTION':
      return update(state, {
        ready: {$set: true},
        posts: {$set: action.posts},
        total: {$set: action.total}
      })
      break
    default:
      return state
      break
  }
}
