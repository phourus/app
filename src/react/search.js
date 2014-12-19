/** @jsx React.DOM */
"use strict";
var React = require('react');
var Actions = require('../actions');

var Search = React.createClass({
	 getDefaultProps: function () {
		return {
			posts: [],
			search: '',
			types: '',
			sort: 'influence',
			direction: 'DESC',
			page: 1,
			limit: 10,
			total: 0
		};	
	 },
	 search: function () {
	     var val = this.refs.term.getDOMNode().value;
         this.update({search: val});
	 },
	 update: function (obj) {
	    var props = this.props;
	    for (var k in obj) { 
	        props[k] = obj[k]; 
	    }
	    
		 this.setProps(props, function () {
    		 Actions.posts.collection(props);
		 });
	 },
     componentDidMount: function () {
         this.update({});
	 },
	 render: function () {
		  return (
			<div className="search">
			    <h1>Test</h1>
				<div className="keywords">
    				<input ref="term" className="term" type="text" placeholder="search for" value={this.props.search} />
    				<button className="button green" ref="search" onClick={this.search}><i className="fa fa-search" /></button>
				</div>
				<div id="map"></div>
				<Groups update={this.update} />
				<Filter update={this.update} />
				<Dates />
				<Types update={this.update} />
				<Posts update={this.update} posts={this.props.posts} />
				<Pagination update={this.update} page={this.props.page} total={this.props.total} limit={this.props.limit} />
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
	sort: function (e) {
    	this.props.update({sort: e.target.value});
	},
	direction: function (e) {
        this.props.update({direction: e.target.value});	
	},
	render: function () {
		return (
			<div className="filter">
			  <div>
				<h3>Sort by:</h3>
				  <select className="sort" onChange={this.sort} ref="sort">
					  <option value="influence">Influence</option>
					  <option value="comments">Comments</option>
					  <option value="thumbs">Thumbs</option>
					  <option value="views">Views</option>
				  </select>
				  <select className="direction" onChange={this.direction} ref="direction">
					  <option value="DESC">High to Low</option>
					  <option value="ASC">Low to High</option>
				  </select>
			  </div>
           </div>
		);
	}	 
});

var Dates = React.createClass({
    dates: function () {
        
    },
	render: function () {
		return (
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
		);
	}	
});

var Types = React.createClass({
	toggle: function (e) {
        console.log(e.target.id);	
	},
	render: function () {
		return (
			<div className="types">
			  <h3>Filter by:</h3>
			  <div>
				  <button className="button green" id="blogs" onClick={this.toggle} ><i className="fa fa-laptop" /> Blogs</button>
				  <button className="button green" id="events" onClick={this.toggle}><i className="fa fa-calendar" /> Events</button>
				  <button className="button blue" id="subjects" onClick={this.toggle}><i className="fa fa-puzzle-piece" /> Subjects</button>
				  <button className="button blue" id="questions" onClick={this.toggle}><i className="fa fa-question" />Questions</button>
				  <button className="button red" id="debates" onClick={this.toggle}><i className="fa fa-bullhorn" />Debates</button>
				  <button className="button red" id="bills" onClick={this.toggle}><i className="fa fa-line-chart" />Bills</button>
				  <button className="button orange" id="beliefs" onClick={this.toggle}><i className="fa fa-road" />Paths</button>
				  <button className="button orange" id="quotes" onClick={this.toggle}><i className="fa fa-quote-right" />Quotes</button>
			  </div>
			</div>
		);
	}	 
});

var Pagination = React.createClass({
	next: function () {
	    if ( Math.ceil(this.props.page * this.props.limit) < this.props.total ) {
    	    this.props.update({page: this.props.page + 1});
	    }
	},
	previous: function () {
        if (this.props.page > 1) {
    	    this.props.update({page: this.props.page - 1});
	    }
	},
	render: function () {
		var pages = Math.ceil(this.props.total / this.props.limit);
		return (
			<div className="pagination">
				<a href="javascript:void(0)" ref="prev" className="prev fa fa-backward fa-3x" onClick={this.previous}></a>
				<div className="viewing">Page {this.props.page} of {pages}</div>
				<div className="totals">{this.props.total}</div>
				<a href="javascript:void(0)" ref="next" className="next fa fa-forward fa-3x" onClick={this.next}></a>
			</div>
		);
	}	 
});

/** POSTS **/
var Posts = React.createClass({
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
<li><strong>Scope:</strong> {this.props.meta.scope}</li>
*/

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