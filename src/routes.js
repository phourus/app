'use strict';
let React = require('react');
let { Route, IndexRoute } = require('react-router');

let App = require('./app');
let Stream = require('./react/stream');
let Post = require('./react/post');
let Account = require('./react/account');
let Activity = require('./react/activity');
let Admin = require('./react/admin');
let About = require('./react/static/about');
let Pricing = require('./react/static/pricing');
let Docs = require('./react/static/docs');
let Contact = require('./react/static/contact');
let Terms = require('./react/static/terms');
let Privacy = require('./react/static/privacy');

let Individuals = require('./react/individuals');
let Business = require('./react/organizations');
let Education = require('./react/organizations');
let Government = require('./react/organizations');
let Nonprofit = require('./react/organizations');

let Billing = require('./react/admin/billing');
let Details = require('./react/admin/details');
let Members = require('./react/admin/members');
let Teams = require('./react/admin/teams');

let Index = Stream;

if (typeof document !== 'undefined') {
  let subdomain = window.location.hostname;
  let parts = subdomain.split('.');
  if (['phourus', 'www', 'us-west-2'].indexOf(parts[0]) > -1) {
    Index = Business;
  }
}

module.exports = (
  <Route component={App} path="/">
    <IndexRoute component={Index}/>
    <Route path="stream" component={Stream} />
    <Route path="home" component={Business} />
    <Route path="about" component={About} />
    <Route path="pricing" component={Pricing} />
    <Route path="contact" component={Contact} />
    <Route path="terms" component={Terms} />
    <Route path="privacy" component={Privacy} />
    <Route path="account" component={Account} />
    <Route path="me" component={Stream} />
    <Route path="create" component={Post} />
    <Route path="activity" component={Activity} />
    <Route path="notifications" component={Activity} />
    <Route path="history" component={Activity} />
    <Route path="docs" component={Docs}>
      <Route path=":id" component={Docs} />
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
