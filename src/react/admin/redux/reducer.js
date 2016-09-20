import update from 'react-addons-update'
const initState = {
  org: {},
  changes: {},
  members: []
}

export default (state = initState, action = {}) => {
  switch(action.type) {
    case 'ADMIN_CHANGE':
      return update(state, {
        changes: {
          [action.key]: {$set: action.value}
        }
      })
      break
    case 'RECEIVE_ADMIN_SINGLE':
      return update(state, {
        org: {$set: action.org}
      })
      break
    case 'RECEIVE_MEMBERS_COLLECTION':
      return update(state, {
        members: {$set: action.members}
      })
      break
    default:
      return state
      break
  }
}
