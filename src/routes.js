'use strict';
let React = require('react');
let Router = require('react-router');
let { Route, DefaultRoute, NotFoundRoute, HistoryLocation } = Router;

let App = require('./app');
let Stream = require('./react/stream');
let Post = require('./react/post');
let Account = require('./react/account');
let Activity = require('./react/activity');
let Admin = require('./react/admin');
let Profile = require('./react/profile');
let Leaders = require('./react/leaders');
let About = require('./react/about');
let Terms = require('./react/terms');
let Privacy = require('./react/privacy');
let Map = require('./map');
let View404 = require('./react/404');

let Individuals = require('./react/individuals');
let Business = require('./react/organizations');
let Education = require('./react/organizations');
let Government = require('./react/organizations');
let Nonprofit = require('./react/organizations');

module.exports = (
  <Route handler={App} path="/">
    <DefaultRoute name="home" handler={Business} />
    <Route name="individuals" handler={Individuals} />
    <Route name="business" handler={Business} />
    <Route name="education" handler={Education} />
    <Route name="government" handler={Government} />
    <Route name="nonprofit" handler={Nonprofit} />
    <Route name="about" handler={About} />
    <Route name="terms" handler={Terms} />
    <Route name="privacy" handler={Privacy} />
    <Route name="activity" handler={Activity} />
    <Route name="notifications" handler={Activity} />
    <Route name="history" handler={Activity} />
    <Route name="leaders" handler={Leaders}>
      <DefaultRoute handler={Leaders.Posts} />
      <Route name="topPosts" path="posts" handler={Leaders.Posts} />
      <Route name="topUsers" path="users" handler={Leaders.Users} />
      <Route name="topOrgs" path="orgs" handler={Leaders.Orgs} />
      <Route name="topPhourus" path="phourus" handler={Leaders.Phourus} />
    </Route>
    <Route name="stream" path="stream" handler={Stream}>
      <Route name="myPosts" path="me" handler={Stream} />
      <Route name="users" handler={Stream}>
        <Route name="userPosts" path=":id" handler={Stream} />
      </Route>
      <Route name="orgs" handler={Stream}>
        <Route name="orgPosts" path=":id" handler={Stream} />
      </Route>
      <Route name="create" handler={Stream}></Route>
      <Route name="edit" path="edit/:id" handler={Stream}></Route>
      <Route name="post" path=":id" handler={Stream} />
    </Route>
    <Route name="account" path="account" handler={Account} />
    <Route name="admin" path="admin/:id" handler={Admin}>
      <Route name="details" path="details" handler={Admin.Details} />
      <Route name="members" path="members" handler={Admin.Members} />
      <Route name="categories" path="categories" handler={Admin.Categories} />
      <Route name="teams" path="teams" handler={Admin.Teams} />
    </Route>
    <Route name="user" path="user/:id" handler={Profile}>
      <DefaultRoute handler={Profile.About} />
      <Route name="posts" path="posts" handler={Profile.Posts} />
      <Route name="rank" path="rank" handler={Profile.Rank} />
      <Route name="membership" path="membership" handler={Profile.Membership} />
      <Route name="events" path="events" handler={Profile.Events} />
      <Route name="reviews" path="reviews" handler={Profile.Reviews} />
    </Route>
    <NotFoundRoute handler={View404}/>
  </Route>
);
