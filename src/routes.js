'use strict';
let React = require('react');
let { Router, Route } = require('react-router');

let App = require('./app');
let Stream = require('./react/stream');
let Account = require('./react/account');
let Activity = require('./react/activity');
let Admin = require('./react/admin');
let About = require('./react/static/about');
let Pricing = require('./react/static/pricing');
let Docs = require('./react/static/docs');
let Contact = require('./react/static/contact');
let Terms = require('./react/static/terms');
let Privacy = require('./react/static/privacy');
let View404 = require('./react/404');

let Individuals = require('./react/individuals');
let Business = require('./react/organizations');
let Education = require('./react/organizations');
let Government = require('./react/organizations');
let Nonprofit = require('./react/organizations');

let Categories = require('./react/admin/categories');
let Details = require('./react/admin/details');
let Members = require('./react/admin/members');
let Teams = require('./react/admin/teams');

module.exports = (
  <Router>
    <Route component={App} path="/">
      <Route path="home" component={Business} />
      <Route path="individuals" component={Individuals} />
      <Route path="business" component={Business} />
      <Route path="education" component={Education} />
      <Route path="government" component={Government} />
      <Route path="nonprofit" component={Nonprofit} />
      <Route path="about" component={About} />
      <Route path="pricing" component={Pricing} />
      <Route path="contact" component={Contact} />
      <Route path="terms" component={Terms} />
      <Route path="privacy" component={Privacy} />
      <Route path="activity" component={Activity} />
      <Route path="notifications" component={Activity} />
      <Route path="history" component={Activity} />
      <Route path="account" component={Account} />
      <Route path="stream" component={Stream}>
        <Route path="me" component={Stream} />
        <Route path="create" component={Stream}></Route>
        <Route path="user/:id" component={Stream} />
        <Route path="org/:id" component={Stream} />
        <Route name="edit/:id" path="edit/:id" component={Stream}></Route>
        <Route path=":id" component={Stream} />
      </Route>
      <Route path="docs" component={Docs}>
        <Route path=":id" component={Docs} />
      </Route>
      <Route path="admin/:id" component={Admin}>
        <Route path="details" component={Details} />
        <Route path="members" component={Members} />
        <Route path="categories" component={Categories} />
        <Route path="teams" component={Teams} />
      </Route>
      <Route path="*" component={View404} />
    </Route>
  </Router>
);
