import update from 'react-addons-update'
const initState = {
  sidebarVisible: false,
  posts: null,
  total: 0,
  params: {
    exclude: [],
    search: '',
    sortBy: 'influence',
    direction: 'DESC',
    page: 1,
    limit: 10,
    total: 0
  },
  folders: []
}

export default (state = initState, action = {}) => {
  return state
}
