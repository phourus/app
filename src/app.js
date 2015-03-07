"use strict";
let React = require('react');

let Router = require('react-router');
let { Link, RouteHandler} = Router;

let Alerts = require('./react/alerts');

let App = React.createClass({
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
                    	<Link to="editor" className="editor fa fa-pencil"></Link>
                    	<Link to="account" className="account fa fa-user"><span className="notifications">13</span></Link>
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

module.exports = App;
