import update from 'react-addons-update'
const initState = {

}

export default (state = initState, action = {}) => {
  return state
}

const initSession = {
  authenticated: true,
  user: {
    SESSION_ADMIN: [],
    SESSION_ORGANIZATIONS: [],
    SESSION_POSTS: [],
    SESSION_TEAMS: [],
    SESSION_USER: 0
  },
  orgs: []
}

export function session(state = initSession, action = {}) {
  return state
}
