import storage from './storage'

let token = ''

storage.get('token')
.then((data) => {
  token = data
})

export default () => {
  return {
    "Authorization": token
  }
}
