import update from 'react-addons-update'
const initState = {

}

export default (state = initState, action = {}) => {
  return state
}


const initSession = {
  user: {},
  orgs: [],
  authenticated: true
}

export function session(state = initSession, action = {}) {
  return state
}
