import React from 'react'
import {Route, IndexRoute} from 'react-router'
import App from './app'

import {
  Index,
  Landing,
  Product,
  Pricing,
  Help,
  Terms,
  Privacy,
  Stream,
  Post,
  Account,
  Activity,
  Admin,
  Details,
  Members,
  Teams,
  Billing
} from './handlers'

export default (
  <Route component={App} path="/">
    <IndexRoute getComponent={Index}/>
    <Route path="stream" getComponent={Stream} />
    <Route path="home" getComponent={Landing} />
    <Route path="product" getComponent={Product} />
    <Route path="pricing" getComponent={Pricing} />
    <Route path="terms" getComponent={Terms} />
    <Route path="privacy" getComponent={Privacy} />
    <Route path="account" getComponent={Account} />
    <Route path="me" getComponent={Stream} />
    <Route path="create" getComponent={Post} />
    <Route path="activity" getComponent={Activity} />
    <Route path="notifications" getComponent={Activity} />
    <Route path="history" getComponent={Activity} />
    <Route path="help" getComponent={Help}>
      <Route path=":id" getComponent={Help} />
    </Route>
    <Route path="admin" getComponent={Admin}>
      <IndexRoute getComponent={Details} />
      <Route path="details" getComponent={Details} />
      <Route path="members" getComponent={Members} />
      <Route path="teams" getComponent={Teams} />
      <Route path="billing" getComponent={Billing} />
    </Route>
    <Route path=":user/:post" getComponent={Post}>
      <Route path="edit" getComponent={Post} />
    </Route>
    <Route path=":user" getComponent={Stream} />
  </Route>
)
