import update from 'react-addons-update'
const initState = {
  changes: {},
  lookup: []
}

export default (state = initState, action = {}) => {

  switch(action.type) {
    case 'ACCOUNT_CHANGE':
      return update(state, {
        changes: {
          [action.key]: {$set: action.value}
        }
      })
      break
    case 'REQUEST_ACCOUNT_SAVE':
      return update(state, {
        ready: {$set: false}
      })
      break
    case 'RECEIVE_ACCOUNT_SAVE':
      return update(state, {
        ready: {$set: true}
      })
      break
    case 'REQUEST_ACCOUNT_DEACTIVATE':
      return update(state, {
        ready: {$set: false}
      })
      break
    case 'RECEIVE_ACCOUNT_DEACTIVATE':
      return update(state, {
        ready: {$set: true}
      })
      break
    default:
      return state
      break
  }
}
