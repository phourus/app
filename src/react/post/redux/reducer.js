import update from 'react-addons-update'
const initState = {
  post: {},
  changes: {},
  poll: {},
  vote: {},
  comments: [],
  collaborators: [],
  thumb: {},
  ready: true,
  scroll: false,
  confirmTrash: false,
  location: {},
  saving: false,
  post: {
    id: 0
  },
  user: {
    id: 0
  },
  privacy: false

}

export default (state = initState, action = {}) => {
  switch (action.type) {
    case 'REQUEST_POST_SINGLE':
      return update(state, {
        ready: { $set: false }
      })
      break
    case 'RECEIVE_POST_SINGLE':
      return update(state, {
        ready: {$set: true},
        post: {$set: action.post},
        changes: {$set: {}}
      })
      break
    case 'REQUEST_POST_CREATE':
      return update(state, {
        ready: { $set: false }
      })
      break
    case 'RECEIVE_POST_CREATE':
      return update(state, {
        ready: { $set: true }
      })
      break
    case 'REQUEST_POST_SAVE':
      return update(state, {
        ready: { $set: false }
      })
      break
    case 'RECEIVE_POST_SAVE':
      return update(state, {
        ready: { $set: true }
      })
      break
    case 'REQUEST_POST_TRASH':
      return update(state, {
        ready: { $set: false }
      })
      break
    case 'RECEIVE_POST_TRASH':
      return update(state, {
        ready: { $set: true }
      })
      break
    case 'POST_CHANGE':
      return update(state, {
        changes: {
          [action.key]: {$set: action.value}
        }
      })
      break
    case 'TRASH_CONFIRM': {
      return update(state, {
        confirmTrash: {$set: true}
      })
    }
      break
    case 'TRASH_CANCEL': {
      return update(state, {
        confirmTrash: {$set: false}
      })
    }
      break
    case 'REQUEST_POLL':
      return update(state, {
        ready: { $set: false }
      })
      break
    case 'RECEIVE_POLL':
      return update(state, {
        ready: { $set: true }
      })
      break
    case 'REQUEST_VOTE':
      return update(state, {
        ready: { $set: false }
      })
      break
    case 'RECEIVE_VOTE':
      return update(state, {
        ready: { $set: true }
      })
      break
    case 'RECEIVE_COMMENTS_LIST':
      return update(state, {
        comments: { $set: action.data }
      })
      break
    case 'RECEIVE_COLLABORATORS_LIST':
      return update(state, {
        collaborators: { $set: action.data }
      })
      break
    case 'RECEIVE_THUMB_POST':
      return update(state, {
        thumb: { $set: action.data }
      })
      break
    default:
      return state
      break
  }
}
