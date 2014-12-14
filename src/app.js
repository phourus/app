"use strict";
//require('node-jsx').install();
var Search = require('./react/search');
var Post = require('./react/post');
var Editor = require('./react/editor');
var Account = require('./react/account');
var Profile = require('./react/profile');
var Game = require('./react/game');
var General = require('./react/general');
var Landing = require('./react/general');
var Map = require('./map');
var React = require('react');

var container = document.getElementById('content');   

//page('', landing);
page.base('/');
page('search', search);
page('post/:id', post);
page('account', account);
page('editor', editor);
page('editor/:id', editor);
page('profile/*', profile);
//page('game', game);
//page('*', general);
page();
    
  
function landing (route) {
    var params = {};
    //React.render(new Landing(params), container); 
}

function search (route) {
    var params = {};   
    React.render(<Search />, container); 
    Map.render(); 
}

function post (route) {
    var params = {};  
    React.render(<Post />, container); 
}

function account (route) {
    var params = {};  
    //React.render(<Account />, container);    
}

function editor (route) {
    var params = {};  
    React.render(<Editor />, container);   
}

function profile (route) {
    var params = {};  
    React.render(<Profile />, container); 
}

function game (route) {
    var params = {};  
    React.render(<Game />, container); 
}

function general (route) {
    var params = {};  
    React.render(<General />, container); 
}