import update from 'react-addons-update'
const initState = {
  ready: false,
  mode: 'login',
  authenticated: false,
  user: {
    SESSION_ADMIN: [],
    SESSION_ORGANIZATIONS: [],
    SESSION_POSTS: [],
    SESSION_TEAMS: [],
    SESSION_USER: 0
  },
  orgs: []
}

export default (state = initState, action = {}) => {

  switch(action.type) {
    case 'ALERT':
      return update(state, {
        ready: {$set: true}
      })
      break
    case 'AUTH_MODE':
      return update(state, {
        mode: {$set: action.mode}
      })
      break
    case 'RECEIVE_SESSION_GET':
      return update(state, {
        ready: {$set: true},
        authenticated: {$set: true},
        user: {$set: action.session}
      })
      break
    case 'SESSION_LOGOUT':
      return update(state, {
        ready: {$set: true},
        authenticated: {$set: false},
        user: {$set: initState.user},
        orgs: {$set: []}
      })
    default:
      return state
      break
  }
}
