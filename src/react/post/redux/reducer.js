import update from 'react-addons-update'
const initState = {
  post: {},
  changes: {},
  poll: {},
  vote: {},
  ready: true,
  scroll: false,
  confirmTrash: false,
  owner: false,
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
        $set: { ready: false }
      })
      break
    case 'RECEIVE_POST_SINGLE':
      return update(state, {
        $set: {
          ready: true,
          post: action.post,
          changes: {}
        }
      })
      break
    case 'REQUEST_POST_CREATE':
      return update(state, {
        $set: { ready: false }
      })
      break
    case 'RECEIVE_POST_CREATE':
      return update(state, {
        $set: { ready: true }
      })
      break
    case 'REQUEST_POST_SAVE':
      return update(state, {
        $set: { ready: false }
      })
      break
    case 'RECEIVE_POST_SAVE':
      return update(state, {
        $set: { ready: true }
      })
      break
    case 'REQUEST_POST_TRASH':
      return update(state, {
        $set: { ready: false }
      })
      break
    case 'RECEIVE_POST_TRASH':
      return update(state, {
        $set: { ready: true }
      })
      break
    case 'CHANGE_POST': {
      let changes = state.changes
      changes[action.key] = action.value
      return update(state, {
        $set: { changes }
      })
    }
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
        $set: { ready: false }
      })
      break
    case 'RECEIVE_POLL':
      return update(state, {
        $set: { ready: true }
      })
      break
    case 'REQUEST_VOTE':
      return update(state, {
        $set: { ready: false }
      })
      break
    case 'RECEIVE_VOTE':
      return update(state, {
        $set: { ready: true }
      })
      break
    default:
      return state
      break
  }
}
