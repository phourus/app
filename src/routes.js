import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './app';
import Landing from './react/static/landing';
import Product from './react/static/product';
import Pricing from './react/static/pricing'
import Help from './react/static/help';
import Terms from './react/static/terms';
import Privacy from './react/static/privacy';
import Stream from './react/stream';
import Post from './react/post'
import Account from './react/account';
import Activity from './react/activity';
import Admin from './react/admin';
import Billing from './react/admin/billing';
import Details from './react/admin/details';
import Members from './react/admin/members';
import Teams from './react/admin/teams';

let Index = Stream;

if (typeof document !== 'undefined') {
  let subdomain = window.location.hostname;
  let parts = subdomain.split('.');
  if (['phourus', 'www', 'us-west-2'].indexOf(parts[0]) > -1) {
    Index = Landing;
  }
}

export default (<Route component={App} path="/">
  <IndexRoute component={Index}/>
  <Route path="stream" component={Stream} />
  <Route path="home" component={Landing} />
  <Route path="product" component={Product} />
  <Route path="pricing" component={Pricing} />
  <Route path="terms" component={Terms} />
  <Route path="privacy" component={Privacy} />
  <Route path="account" component={Account} />
  <Route path="me" component={Stream} />
  <Route path="create" component={Post} />
  <Route path="activity" component={Activity} />
  <Route path="notifications" component={Activity} />
  <Route path="history" component={Activity} />
  <Route path="help" component={Help}>
    <Route path=":id" component={Help} />
  </Route>
  <Route path="admin" component={Admin}>
    <IndexRoute component={Details} />
    <Route path="details" component={Details} />
    <Route path="members" component={Members} />
    <Route path="teams" component={Teams} />
    <Route path="billing" component={Billing} />
  </Route>
  <Route path=":user/:post" component={Post}>
    <Route path="edit" component={Post} />
  </Route>
  <Route path=":user" component={Stream} />
</Route>);
