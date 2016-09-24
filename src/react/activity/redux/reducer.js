import update from 'react-addons-update'
const initState = {
  notifications: [],
  history: []
}

export default (state = initState, action = {}) => {
  switch(action.type) {
    case 'RECEIVE_ACTIVITY_NOTIFICATIONS':
      return update(state, {
        notifications: {$set: action.notifications}
      })
      break
    case 'RECEIVE_ACTIVITY_HISTORY':
      return update(state, {
        history: {$set: action.history}
      })
      break
    default:
      return state
      break
  }
}
