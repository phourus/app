import update from 'react-addons-update'
const initState = {

}

export default (state = initState, action = {}) => {
  switch(action.type) {
    case 'RECEIVE_PROFILE_GET':
      return update(state, {$set: action.profile})
      break
    default:
      return state
      break
  }
}
