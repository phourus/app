"use strict";
var React = require('react');
var Router = require('react-router-component');
var Locations = Router.Locations;
var Location = Router.Location;
var NotFound = Router.NotFound;

// JSX       
var Search = require('./react/search');
var Post = require('./react/post');
var Factory = require('./react/editor');
var Account = require('./react/account');
var Profile = require('./react/profile');
var Game = require('./react/game');
var General = require('./react/general');
var Landing = require('./react/general');
var Map = require('./map');
var View404 = require('./react/404');

var App = React.createClass({
    getDefaultProps: function () {
       return {
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
         profile: {
             
         },
         editor: {
			 post: {},
			 posts: [],
			 link: {
    			 url: "",
    			 caption: ""
			 }
         },
         game: {
             
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
        this.setProps(updated);
    },
    render: function () {
        return  (
            <Locations path={this.props.path}>
                <Location path="/search" handler={Search} update={this.update} {...this.props.search} />
                <Location path="/post/:id" handler={Post} update={this.update} {...this.props.post} />
                <Location path="/account" handler={Account} update={this.update} {...this.props.account} />
                <Location path={/\/(org|profile)\/([0-9]*)/} handler={Profile} update={this.update} {...this.props.profile} />
                <Location path="/editor" handler={Factory} update={this.update} {...this.props.editor} />
                <Location path="/game" handler={Game} update={this.update} {...this.props.game} />
                <Location path={/\/(about|terms)/} handler={General} update={this.update} {...this.props.general} />
                <NotFound handler={View404} />
            </Locations>
        );
    }
});

module.exports = App;