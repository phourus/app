import React from 'react'
import {Route, IndexRoute} from 'react-router'
import App from './app'

let index = './react/stream'
if (typeof document !== 'undefined') {
  let subdomain = window.location.hostname
  let parts = subdomain.split('.')
  if (['phourus', 'www', 'us-west-2'].indexOf(parts[0]) > -1) {
    index = './react/static/landing'
  }
}

function loadRoute(cb) {
 return (module) => cb(null, module.default)
}

function errorLoading(err) {
 console.error('Dynamic page loading failed', err)
}

export default (<Route component={App} path="/">
  <IndexRoute getComponent={
    (location, cb) => {
      System.import('./react/static/landing').then(loadRoute(cb)).catch(errorLoading)
    }
  }/>
  <Route path="stream" getComponent={
    (location, cb) => {
      System.import('./react/stream').then(loadRoute(cb)).catch(errorLoading)
    }
  } />
  <Route path="home" getComponent={
    (location, cb) => {
      System.import('./react/static/landing').then(loadRoute(cb)).catch(errorLoading)
    }
  } />
  <Route path="product" getComponent={
    (location, cb) => {
      System.import('./react/static/product').then(loadRoute(cb)).catch(errorLoading)
    }
  } />
  <Route path="pricing" getComponent={
    (location, cb) => {
      System.import('./react/static/pricing').then(loadRoute(cb)).catch(errorLoading)
    }
  } />
  <Route path="terms" getComponent={
    (location, cb) => {
      System.import('./react/static/terms').then(loadRoute(cb)).catch(errorLoading)
    }
  } />
  <Route path="privacy" getComponent={
    (location, cb) => {
      System.import('./react/static/privacy').then(loadRoute(cb)).catch(errorLoading)
    }
  } />
  <Route path="account" getComponent={
    (location, cb) => {
      System.import('./react/account').then(loadRoute(cb)).catch(errorLoading)
    }
  } />
  <Route path="me" getComponent={
    (location, cb) => {
      System.import('./react/stream').then(loadRoute(cb)).catch(errorLoading)
    }
  } />
  <Route path="create" getComponent={
    (location, cb) => {
      System.import('./react/post').then(loadRoute(cb)).catch(errorLoading)
    }
  } />
  <Route path="activity" getComponent={
    (location, cb) => {
      System.import('./react/activity').then(loadRoute(cb)).catch(errorLoading)
    }
  } />
  <Route path="notifications" getComponent={
    (location, cb) => {
      System.import('./react/activity').then(loadRoute(cb)).catch(errorLoading)
    }
  } />
  <Route path="history" getComponent={
    (location, cb) => {
      System.import('./react/activity').then(loadRoute(cb)).catch(errorLoading)
    }
  } />
  <Route path="help" getComponent={
    (location, cb) => {
      System.import('./react/static/help').then(loadRoute(cb)).catch(errorLoading)
    }
  }>
    <Route path=":id" getComponent={
      (location, cb) => {
        System.import('./react/static/help').then(loadRoute(cb)).catch(errorLoading)
      }
    } />
  </Route>
  <Route path="admin" getComponent={
    (location, cb) => {
      System.import('./react/admin').then(loadRoute(cb)).catch(errorLoading)
    }
  }>
    <IndexRoute getComponent={
      (location, cb) => {
        System.import('./react/admin/details').then(loadRoute(cb)).catch(errorLoading)
      }
    } />
    <Route path="details" getComponent={
      (location, cb) => {
        System.import('./react/admin/details').then(loadRoute(cb)).catch(errorLoading)
      }
    } />
    <Route path="members" getComponent={
      (location, cb) => {
        System.import('./react/admin/members').then(loadRoute(cb)).catch(errorLoading)
      }
    } />
    <Route path="teams" getComponent={
      (location, cb) => {
        System.import('./react/admin/teams').then(loadRoute(cb)).catch(errorLoading)
      }
    } />
    <Route path="billing" getComponent={
      (location, cb) => {
        System.import('./react/admin/billing').then(loadRoute(cb)).catch(errorLoading)
      }
    } />
  </Route>
  <Route path=":user/:post" getComponent={
    (location, cb) => {
      System.import('./react/post').then(loadRoute(cb)).catch(errorLoading)
    }
  }>
    <Route path="edit" getComponent={
      (location, cb) => {
        System.import('./react/post').then(loadRoute(cb)).catch(errorLoading)
      }
    } />
  </Route>
  <Route path=":user" getComponent={
    (location, cb) => {
      System.import('./react/stream').then(loadRoute(cb)).catch(errorLoading)
    }
  } />
</Route>)
