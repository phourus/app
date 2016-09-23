export default (props) => {
  let nextProps = props || { location: {} }
  let context = {
    subdomain: '',
    route: nextProps.routes || [],
    params: nextProps.params || {},
    query: nextProps.location.query || {},
    root: '',
    id: '',
    type: '',
  }
  let parts = location.hostname.split('.')
  if (['phourus', 'www', 'phourus-staging'].indexOf(parts[0]) === -1) {
    context.subdomain = parts[0]
  }

  // index, stream, home?,
  // account, me, create,
  // activity, notifications, history
  // admin,
  // :user/:post -> edit, :user
  let route = context.route
  switch (route[1].path) {
    case 'stream':
      context.root = 'stream'
      context.type = ''
      context.id = 0
      if (context.subdomain !== '') {
        context.type = 'org'
        context.id = context.subdomain
      }
      break
    case 'account':
      context.root = 'account'
      context.type = 'account'
      context.id = 0
      break
    case 'me':
      context.root = 'stream'
      context.type = 'me'
      context.id = 0
      break
    case 'create':
      context.root = 'create'
      context.type = 'create'
      context.id = 0
      break
    case 'activity':
      context.root = 'activity'
      context.type = 'activity'
      context.id = 0
      break
    case 'notifications':
      context.root = 'activity'
      context.type = 'activity'
      context.id = 0
      break
    case 'history':
      context.root = 'activity'
      context.type = 'activity'
      context.id = 0
      break
    case 'admin':
      context.root = 'admin'
      context.type = 'admin'
      context.id = context.subdomain
      if (route[2] && route[2].path) {
        context.type = route[2].path
      }
      break
    case ':user/:post':
      context.root = 'post'
      context.type = 'post'
      context.id = context.params.post

      if (route[2] && route[2].path === 'edit') {
        context.type = 'edit'
      }
      break
    case ':user':
      context.root = 'stream'
      context.type = 'user'
      context.id = context.params.user
      break
    default:
      context.root = route[1] ? route[1].path : ''
      context.type = route[2] ? route[2].path : ''
      break
  }
  if (typeof route[1].path === 'undefined' && context.subdomain) {
    context.root = 'stream'
    context.type = 'org'
    context.id = context.subdomain
  }
  return context
}
