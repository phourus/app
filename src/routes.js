'use strict';
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var HistoryLocation = Router.HistoryLocation

var App = require('./app');
var Search = require('./react/search');
var Post = require('./react/post');
var Factory = require('./react/editor');
var Account = require('./react/account');
var Profile = require('./react/profile');
var Leaders = require('./react/leaders');
var General = require('./react/general');
var Landing = require('./react/landing');
var Map = require('./map');
var View404 = require('./react/404');

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