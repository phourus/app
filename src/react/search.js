/** @jsx React.DOM */
"use strict";
var React = require('react');

var Search = React.createClass({
	 getDefaultProps: function () {
		return {
			posts: []  
		};	
	 },
	 update: function (obj) {
		 this.setProps(obj);
	 },
	 render: function () {
		  return (
			<div className="search">
				<div className="keywords">
    				<input ref="term" type="text" placeholder="search for" />
    				<button className="button green" id="search"><i className="fa fa-search" /></button>
				</div>
				<div id="map"></div>
				<Groups />
				<Filter />
				<Types />
				<Posts update={this.update} posts={this.props.posts} />
				<Pagination />
			</div>
		  )
	 }
});

var Groups = React.createClass({
	render: function () {
		return (
			<div className="groups">Groups</div>
		);
	}	
});

var Filter = React.createClass({
	render: function () {
		return (
			<div className="filter">
			  <div className="sort">
				<h3>Sort by:</h3>
				  <select id="sort">
					  <option value="influence">Influence</option>
					  <option value="comments">Comments</option>
					  <option value="thumbs">Thumbs</option>
					  <option value="views">Views</option>
				  </select>
				  <select id="direction">
					  <option value="DESC">High to Low</option>
					  <option value="ASC">Low to High</option>
				  </select>
			  </div>
			  <div className="dates">
				<label>Start:</label>
				<select>
				  <option>January</option>
				</select>
				<select className="date">
					<option>1</option>
				</select>
				<select>
					<option>2014</option>
				</select>
				<label>End:</label>
				<select>
					<option>January</option>
				</select>
				<select className="date">
					<option>1</option>
				</select>
				<select>
					<option>2015</option>
				</select>
			  </div>
			</div>
		);
	}	 
});

var Types = React.createClass({
	render: function () {
		return (
			<div className="types">
			  <h3>Filter by:</h3>
			  <div>
				  <button className="button green" id="blogs"><i className="fa fa-laptop" /> Blogs</button>
				  <button className="button green" id="events"><i className="fa fa-calendar" /> Events</button>
				  <button className="button blue" id="subjects"><i className="fa fa-puzzle-piece" /> Subjects</button>
				  <button className="button blue" id="questions"><i className="fa fa-question" />Questions</button>
				  <button className="button red" id="debates"><i className="fa fa-bullhorn" />Debates</button>
				  <button className="button red" id="bills"><i className="fa fa-line-chart" />Bills</button>
				  <button className="button orange" id="beliefs"><i className="fa fa-road" />Paths</button>
				  <button className="button orange" id="quotes"><i className="fa fa-quote-right" />Quotes</button>
			  </div>
			</div>
		);
	}	 
});

var Pagination = React.createClass({
	render: function () {
		return (
			<div className="pagination">
				<a href="javascript:void(0)" ref="prev" className="fa fa-backward fa-3x"></a>
				<div className="viewing"></div>
				<div className="totals"></div>
				<a href="javascript:void(0)" ref="next" className="fa fa-forward fa-3x"></a>
			</div>
		);
	}	 
});

/** POSTS **/
var Posts = React.createClass({
	componentDidMount: function () {
		var update = this.props.update;	
        $.ajax({
          url: '/rest/post/?search=&types=blogs;events;subjects;questions;debates;bills;beliefs;timeline;quotes&mode=phourus&org_id=0&user_id=0&sort=influence&direction=DESC&page=0&limit=10',
          dataType: 'json',
          success: function(data) {
            
            update({posts: data});
          }.bind(this),
          error: function(err) {
            console.error(err);
          }.bind(this)
        });
	},
	render: function () {
		var data = this.props.posts;
		var list = [];
		list = data.map(function (item, i) {
		   return <PostItem key={item.id} post={item.post} meta={item.meta} address={item.address} user={item.user} stats={item.stats} />;
		});

		return (
			<div className="posts">{list}</div>
		);
	}	 
});
/*
					<li><strong>Positive:</strong> {this.props.meta.positive}</li>
					<li><strong>Category:</strong> {this.props.meta.category}</li>
					<li><strong>Element:</strong> {this.props.meta.element}</li> 
					<li><strong>Date/Time:</strong> {this.props.post.date}</li>
					<li><strong>Address:</strong> {this.props.address.city}</li>
					<li><strong>Difficulty:</strong> {this.props.meta.difficulty}</li> 
					<li><strong>Scope:</strong> {this.props.meta.scope}</li>*/
var PostItem = React.createClass({
	render: function () {
		var meta = [];
		
		for (var i = 0, keys = Object.keys(this.props.meta); i < keys.length; i++) {
			var key = keys[i];
			var value = this.props.meta[keys[i]];
			if (['content', 'date', 'title', 'post_id'].indexOf(key) === -1) {
				meta.push(<li>{key}: {value}</li>);
			}
			
		}
		return (
			<div className="postItem" key={this.props.post.id}>
				<h2><a href="/post/1">{this.props.meta.title}</a></h2>
				<div className="type fa fa-bell">{this.props.post.type}</div>
				<div className="pic">
					<a href="/profile/1">
					    <img src="/assets/logos/logo-new.png" />
                    </a>
				</div>
				<div className="basic">
				  <h3>By <a href="/profile/1">{this.props.user.user.first} {this.props.user.user.last}</a></h3>
				  <span className="created">{this.props.post.created}</span>
				</div>
				<div className="detail">
				  <ul>
					{meta}
				  </ul> 
				</div>
				<div className="stats">
				  <div className="influence">{this.props.stats.influence}</div>
				  <li>Views: {this.props.stats.views}</li>
				  <li>Comments: {this.props.stats.comments}</li>
				  <li>Popularity: {this.props.stats.thumbs}</li>
				</div>
				<div className="content">{this.props.post.content}</div>
			</div>
		);
	}	 
});

module.exports = Search;