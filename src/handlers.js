function loadRoute(cb) {
 return (module) => cb(null, module.default)
}

function errorLoading(err) {
 console.error('Dynamic page loading failed', err)
}

/** STATIC **/
export const Landing = (location, cb) => {
  System.import('./react/static/landing').then(loadRoute(cb)).catch(errorLoading)
}

export const Product = (location, cb) => {
  System.import('./react/static/product').then(loadRoute(cb)).catch(errorLoading)
}

export const Pricing = (location, cb) => {
  System.import('./react/static/pricing').then(loadRoute(cb)).catch(errorLoading)
}

export const Help = (location, cb) => {
  System.import('./react/static/help').then(loadRoute(cb)).catch(errorLoading)
}

export const Terms = (location, cb) => {
  System.import('./react/static/terms').then(loadRoute(cb)).catch(errorLoading)
}

export const Privacy = (location, cb) => {
  System.import('./react/static/privacy').then(loadRoute(cb)).catch(errorLoading)
}

/** PRODUCT **/
export const Stream = (location, cb) => {
  System.import('./react/stream').then(loadRoute(cb)).catch(errorLoading)
}

export const Post = (location, cb) => {
  System.import('./react/post').then(loadRoute(cb)).catch(errorLoading)
}

export const Account = (location, cb) => {
  System.import('./react/account').then(loadRoute(cb)).catch(errorLoading)
}

export const Activity = (location, cb) => {
  System.import('./react/activity').then(loadRoute(cb)).catch(errorLoading)
}

export const Folders = (location, cb) => {
  System.import('./react/folders').then(loadRoute(cb)).catch(errorLoading)
}

export const Links = (location, cb) => {
  System.import('./react/links').then(loadRoute(cb)).catch(errorLoading)
}

/** ADMIN **/
export const Organizations = (location, cb) => {
  System.import('./react/organizations').then(loadRoute(cb)).catch(errorLoading)
}

export const Admin = (location, cb) => {
  System.import('./react/admin').then(loadRoute(cb)).catch(errorLoading)
}

export const Details = (location, cb) => {
  System.import('./react/admin/details').then(loadRoute(cb)).catch(errorLoading)
}

export const Members = (location, cb) => {
  System.import('./react/admin/members').then(loadRoute(cb)).catch(errorLoading)
}

export const Teams = (location, cb) => {
  System.import('./react/admin/teams').then(loadRoute(cb)).catch(errorLoading)
}

export const Billing = (location, cb) => {
  System.import('./react/admin/billing').then(loadRoute(cb)).catch(errorLoading)
}

/** INDEX **/
let INDEX = Stream
if (typeof document !== 'undefined') {
  let subdomain = window.location.hostname
  let parts = subdomain.split('.')
  if (['phourus', 'www', 'us-west-2'].indexOf(parts[0]) > -1) {
    INDEX = Landing
  }
}

export const Index = INDEX
