import {CrossStorageClient as Client} from 'cross-storage'

let get = (key) => {}
let set = (key, value) => {}
let del = (key) => {}

if (typeof document !== 'undefined') {
  let storage = {}
  let host = location.hostname
  let protocol = location.protocol + '//'
  let port = location.port
  if (location.port !== "") {
    port = `:${location.port}`
  }
  let options = ['localhost', 'phourus.local', 'phourus.com', 'phourus-staging.us-west-2.elasticbeanstalk.com']
  for (let i = 0; i < options.length; i++) {
    if (host.indexOf(options[i]) > -1) {
      let url = `${protocol}${options[i]}${port}/build/hub.html`
      storage = new Client(url)

      get = (key) => {
        return new Promise((resolve, reject) => {
          storage.onConnect()
          .then(() => {
            storage.get(key)
            .then((value) => {
              resolve(value)
            })
          })
          .catch((err) => {
            reject(err)
          })
        })
      }

      set = (key, value, ttl) => {
        return new Promise((resolve, reject) => {
          storage.onConnect()
          .then(() => {
            storage.set(key, value, ttl)
            .then(() => {
              resolve(true)
            })
          })
          .catch((err) => {
            reject(err)
          })
        })
      }

      del = (key) => {
        return new Promise((resolve, reject) => {
          storage.onConnect()
          .then(() => {
            storage.del(key)
            .then(() => {
              resolve(true)
            })
          })
          .catch((err) => {
            reject(err)
          })
        })
      }
    }
  }
}

export default {
  get,
  set,
  del
}
