import update from 'react-addons-update'
const initialState = {
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

export default function post(state = initialState, action = {}) {
  switch (action.type) {
    case 'REQUEST_POST_SINGLE':
      return update(state, {
        $set: { ready: false }
      })
    case 'RECEIVE_POST_SINGLE':
      return update(state, {
        $set: {
          ready: true,
          post: action.post
        }
      })
    // case 'REQUEST_POST_ADD':
    //   return update(state, {
    //     $set: { ready: false }
    //   })
    // case 'RECEIVE_POST_ADD':
    //   return update(state, {
    //     $set: { ready: true }
    //   })
    // case 'REQUEST_POST_SAVE':
    //   return update(state, {
    //     $set: { ready: false }
    //   })
    // case 'RECEIVE_POST_SAVE':
    //   return update(state, {
    //     $set: { ready: true }
    //   })
    // case 'REQUEST_POST_TRASH':
    //   return update(state, {
    //     $set: { ready: false }
    //   })
    // case 'RECEIVE_POST_TRASH':
    //   return update(state, {
    //     $set: { ready: true }
    //   })
    // case 'CHANGE_POST':
    //   let changes = state.changes
    //   changes[action.key] = action.value
    //   return update(state, {
    //     $set: { changes }
    //   })
    // case 'REQUEST_POLL':
    //   return update(state, {
    //     $set: { ready: false }
    //   })
    // case 'RECEIVE_POLL':
    //   return update(state, {
    //     $set: { ready: true }
    //   })
    // case 'REQUEST_VOTE':
    //   return update(state, {
    //     $set: { ready: false }
    //   })
    // case 'RECEIVE_VOTE':
    //   return update(state, {
    //     $set: { ready: true }
    //   })
    default:
      return state
  }
}
