import update from 'react-addons-update'
const initState = {
  sidebarVisible: false,
  posts: null,
  total: 0,
  selected: 0,
  scroll: false,
  params: {
    exclude: [],
    search: '',
    sortBy: 'influence',
    direction: 'DESC',
    page: 1,
    limit: 10,
    folder: 0,
    context: {
      type: '',
      id: null
    }
  },
  folders: []
}

export default (state = initState, action = {}) => {
  return state
}
