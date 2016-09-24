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
const TYPES = ['blog', 'event', 'subject', 'question', 'debate', 'poll', 'belief', 'quote']

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
    case 'STREAM_EXCLUDE': {
      let exclude = state.params.exclude.slice()
      const index = exclude.indexOf(action.type)
      if (index > -1) {
        exclude.splice(index, 1)
      } else {
        exclude.push(type)
      }
      return update(state, {
        posts: {$set: []},
        params: {
          exclude: {$set: exclude},
          page: {$set: 1},
        }
      })
    }
      break
    case 'STREAM_TYPE':
      let types = TYPES.slice()
      let exclude = []
      if (state.params.exclude.length !== 7) {
        let index = types.indexOf(action.type)
        if (index !== -1) {
          types.splice(index, 1)
          exclude = types
        }
      }
      return update(state, {
        posts: {$set: []},
        params: {
          page: {$set: 1},
          exclude: {$set: exclude}
        }
      })
      break
    case 'STREAM_FOLDER':
      return update(state, {
        posts: {$set: []},
        params: {
          page: {$set: 1},
          folder: {$set: action.id}
        }
      })
      break
    case 'STREAM_MORE':
      return update(state, {
        scroll: {$set: true},
        params: {
          page: {$set: state.params.page++}
        }
      })
      break
    case 'STREAM_SEARCH':
      return update(state, {
        posts: {$set: []},
        params: {
          page: {$set: 1},
          search: {$set: action.term}
        }
      })
      break
    case 'STREAM_LIMIT':
      return update(state, {
        params: {
          limit: {$set: action.value}
        }
      })
      break
    case 'STREAM_SORT':
      return update(state, {
        posts: {$set: []},
        params: {
          page: {$set: 1},
          sortBy: {$set: action.field}
        }
      })
      break
    case 'STREAM_DIRECTION':
      return update(state, {
        posts: {$set: []},
        params: {
          page: {$set: 1},
          direction: {$set: action.dir}
        }
      })
      break
    default:
      return state
      break
  }
}
