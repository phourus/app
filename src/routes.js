'use strict';
let React = require('react');
let Router = require('react-router');
let { Route, DefaultRoute, NotFoundRoute, HistoryLocation } = Router;

let App = require('./app');
let Search = require('./react/search');
let Post = require('./react/post');
let Factory = require('./react/editor');
let Account = require('./react/account');
let Profile = require('./react/profile');
let Leaders = require('./react/leaders');
let General = require('./react/general');
let Landing = require('./react/landing');
let Map = require('./map');
let View404 = require('./react/404');

module.exports = (
  <Route handler={App} path="/">
    <DefaultRoute handler={Landing} />
    <Route name="leaders" handler={Leaders}  />
    <Route name="search" handler={Search} />
    <Route name="post" path="/post/:id" handler={Post} />
    <Route name="general" handler={General} />
    <Route name="account" path="account" handler={Account}>
      <DefaultRoute handler={Account.Password} />
      <Route name="notifications" path="notifications" handler={Account.Notifications} />
      <Route name="history" path="history" handler={Account.History} />
      <Route name="update" path="update" handler={Account.Edit} />
      <Route name="password" path="password" handler={Account.Password} />
    </Route>
    <Route name="editor" path="editor" handler={Factory}>
      <DefaultRoute handler={Factory.List} />
      <Route name="list" path="list" handler={Factory.List} />
      <Route name="add" path="add" handler={Factory.Fields} />
      <Route name="edit" path=":id" handler={Factory.Fields} />
    </Route>
    <Route name="user" path="user/:id" handler={Profile}>
        <DefaultRoute handler={Profile.About} />
        <Route name="about" path="about" handler={Profile.About} />
        <Route name="posts" path="posts" handler={Profile.Posts} />
        <Route name="rank" path="rank" handler={Profile.Rank} />
        <Route name="events" path="events" handler={Profile.Events} />
        <Route name="reviews" path="reviews" handler={Profile.Reviews} />
    </Route>
    <NotFoundRoute handler={View404}/>
  </Route>
);
