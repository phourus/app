"use strict";
var React = require('react');
var Router = require('react-router-component');
var Locations = Router.Locations;
var Location = Router.Location;
var NotFound = Router.NotFound;
var Link = Router.Link;

// JSX       
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
       return {
          alert: {},
          search: {
			posts: [],
			exclude: [],
			search: '',
			sort: 'influence',
			direction: 'DESC',
			page: 1,
			limit: 10,
			total: 0,
			datesVisible: false,
			typesVisible: false
          },
          post: {
             post: {
                 id: null,
                 title: "",
                 created: "",
                 influence: null,
                 element: '',
                 scope: '',
                 type: ''      
             },

             user: {
                 first: "",
                 last: "" 
             },
             
             comments: []
         },
         account: {
            user: {
                id: null,
                pic: "",
                username: "",
                first: "",
                last: "",
                email: "",
                phone: "",
                company: "",
                occupation: "",
                website: "",
                dob: "",
                gender: "",
                address: {
                    street: "",
                    city: "",
                    state: "",
                    zip: ""
                }
            },
            notifications: [],
            history: []
         },
         profile: {
             id: "",
             type: "",
             view: "",
             profile: {}
         },
         editor: {
			 post: {},
			 posts: [],
			 link: {
    			 url: "",
    			 caption: ""
			 }
         },
         leaders: {
             
         },
         general: {
             
         }
       } 
    },
    update: function (key, obj) {
        var updated = {};
        var props = this.props[key];
        for (var k in obj) { 
	        props[k] = obj[k]; 
	    }
	    updated[key] = props;
	    updated.alert = {};
        this.setProps(updated);
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
                        <Link href="/leaders" className="game fa fa-trophy"></Link>
                    	<Link href="/search" className="search fa fa-search"></Link>
                    	<Link href="/editor" className="editor fa fa-pencil"></Link>
                    	<Link href="/account" className="account fa fa-user"><span className="notifications">13</span></Link>
                    </nav>
                </header>
                <div className="spacer"></div>
                <Alerts {...this.props.alert} />
                <div className="main">
                    <div id="content">
                        <Content {...this.props} update={this.update} />
                    </div>
                    <footer className="footer">
                        © 2013 Phourus LLC. All Rights Reserved.
                        <br />
        				<Link href="/">Home</Link> | 
        				<Link href="./about">About</Link> | 
        				<Link href="./terms">Terms</Link>
        				<br clear="all" />
                    </footer>
                </div>
            </div>    
        );
    }
});

var Alerts = React.createClass({
    render: function () {
        var alert;
        console.log(this.props);
        if (this.props.type) {
            alert = <Alert {...this.props} />
        }
/*
        var list = this.props.alerts.map(function (item) {
            return <Alert {...item} />; 
        }); 
*/
        return (
            <div>
                {alert}
            </div>
        );
    }
});

var Alert = React.createClass({
    render: function () {
        console.log(this.props);
        return (
            <div className={this.props.type + " alert"}>
                <div>{this.props.msg}</div>
                <div>HTTP Status Code: {this.props.code}</div>
                <div>X</div>
            </div>
        );
    } 
});

var Content = React.createClass({
    render: function () {
        return (
            <Locations path={this.props.path}>
                <Location path="/" handler={Landing} update={this.props.update} />
                <Location path="/search" handler={Search} update={this.props.update} {...this.props.search} />
                <Location path="/post/:id" handler={Post} update={this.props.update} {...this.props.post} />
                <Location path="/leaders" handler={Leaders} update={this.props.update} {...this.props.leaders} />
                <Location path={/^\/editor\/?([a-zA-Z0-9]*)?/} handler={Factory} update={this.props.update} {...this.props.editor} />
                <Location path={/^\/account\/?(notifications|history|password)?/} handler={Account} update={this.props.update} {...this.props.account} />
                <Location path={/^\/(about|terms)/} handler={General} update={this.props.update} {...this.props.general} />
                <Location path={/^\/(org|user)\/([0-9]*)\/?([a-zA-Z]*)?/} handler={Profile} update={this.props.update} {...this.props.profile} />
                <NotFound handler={View404} />
            </Locations>
        );
    }
});

module.exports = App;