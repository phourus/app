import update from 'react-addons-update'
const initState = {
  lookup: []
}

export default (state = initState, action = {}) => {

  switch(action.type) {
    case 'RECEIVE_ORGANIZATIONS_LOOKUP':
      return update(state, {
        lookup: {$set: action.lookup}
      })
      break
    default:
      return state
      break
  }
}
