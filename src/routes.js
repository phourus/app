let React = require('react');
let { Route, IndexRoute } = require('react-router');

let App = require('./app');

// Static
let Landing = require('./react/static/landing');
let Product = require('./react/static/product');
import Pricing from './react/static/pricing'
let Help = require('./react/static/help');
let Terms = require('./react/static/terms');
let Privacy = require('./react/static/privacy');

// Product
let Stream = require('./react/stream');
import Post from './react/post'
let Account = require('./react/account');
let Activity = require('./react/activity');

// Admin
let Admin = require('./react/admin');
let Billing = require('./react/admin/billing');
let Details = require('./react/admin/details');
let Members = require('./react/admin/members');
let Teams = require('./react/admin/teams');

let Index = Stream;

if (typeof document !== 'undefined') {
  let subdomain = window.location.hostname;
  let parts = subdomain.split('.');
  if (['phourus', 'www', 'us-west-2'].indexOf(parts[0]) > -1) {
    Index = Landing;
  }
}

module.exports = (
  <Route component={App} path="/">
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
      <Route path="details" component={Details} />
      <Route path="members" component={Members} />
      <Route path="teams" component={Teams} />
      <Route path="billing" component={Billing} />
    </Route>
    <Route path=":user/:post" component={Post}>
      <Route path="edit" component={Post} />
    </Route>
    <Route path=":user" component={Stream} />
  </Route>
);
