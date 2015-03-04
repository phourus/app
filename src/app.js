"use strict";
var React = require('react');
var Mutant = require('react-mutant');

var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;
var RouteHandler = Router.RouteHandler;
var HistoryLocation = Router.HistoryLocation
var Link = Router.Link;
var Mutant = require('react-mutant');

// JSX       
var Alerts = require('./react/alerts');
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

var App = React.createClass({
    getDefaultProps: function () {
        profile: new Mutant({
            id: "",
            type: "",
            view: "",
            profile: {}
        })
    },
     componentWillMount: function () {
        var self = this;
/*
        this.props.profile.mutant.on('update', function (mutant) {
            self.setProps({profile: mutant});
        });  
*/
     },
    render: function () {
        return  (
            <div>
                <header className="header">
                    <div className="brand">
                    	<a href="./">
                    		<img src="/assets/logos/logo-new.png" /> 
                    	</a>
                    </div>
                    <nav className="nav">
                        <Link to="leaders" className="game fa fa-trophy"></Link>
                    	<Link to="search" className="search fa fa-search"></Link>
                    	<Link to="general" className="editor fa fa-pencil"></Link>
                    	<Link to="post" params={{id: 1}} className="account fa fa-user"><span className="notifications">13</span></Link>
                    </nav>
                </header>
                <div className="spacer"></div>
                <Alerts {...this.props.alerts} />
                <div className="main">
                    <div id="content">
                        <RouteHandler />
                    </div>
                    <footer className="footer">
                        © 2013 Phourus LLC. All Rights Reserved.
                        <br />
                        <Link to="leaders">Home</Link> | 
        				<Link to="general">About</Link> | 
        				<Link to="general">Terms</Link>
        				<br clear="all" />
                    </footer>
                </div>
            </div>    
        );
    }
});

/*
    <Route name="editor" path="/editor" handler={Factory}>
      <Route name="list" path="/list" handler={Factory.List} />
      <Route name="add" path="/add" handler={Factory.Add} />
      <Route name="post" path="/:id" handler={Factory.Post} />
    </Route>
    <Route name="account" path="/account" handler={Account}>
      <Route name="notifications" path="/notifications" handler={Notifications} />
      <Route name="history" path="/history" handler={History} />
      <Route name="edit" path="/edit" handler={Edit} />
      <Route name="password" path="/password" handler={Password} />
    </Route>
<Route name="about" path="/about" handler={About} />
<Route name="posts" path="/posts" handler={Posts} />
<Route name="orgs" path="/orgs" handler={Orgs} />
<Route name="events" path="/events" handler={Events} />
<Route name="reviews" path="/reviews" handler={Reviews} />
<Route name="rank" path="/rank" handler={Rank} />
    <Route name="org" path="/org/:id" handler={Profile}>
      <Route name="about" path="/about" handler={About} />
      <Route name="posts" path="/posts" handler={Posts} />
      <Route name="members" path="/members" handler={Members} />
      <Route name="events" path="/events" handler={Events} />
      <Route name="reviews" path="/reviews" handler={Reviews} />
      <Route name="rank" path="/rank" handler={Rank} />
    </Route>
*/

//<Redirect from="company" to="about" />
var routes = (
  <Route handler={App} path="/">
    <DefaultRoute handler={Landing} />
    <Route name="leaders" handler={Leaders}  />
    <Route name="search" handler={Search} />
    <Route name="post" path="/post/:id" handler={Post} />
    <Route name="general" handler={General} />
    <Route name="user" path="/user/:id" handler={Profile}>
        
    </Route>
    <NotFoundRoute handler={View404}/>
  </Route>
);

try {
  Router.run(routes, function (Handler) {
      React.render(<Handler />, document.getElementById("app"));
    });  
} catch (e) {
    console.error(e);
}

module.exports = App;