/** @jsx React.DOM */
"use strict";
var React = require('react');
var posts = require('../objects/posts');
var moment = require('moment');

var Search = React.createClass({
	 search: function () {
	     var val = this.refs.term.getDOMNode().value;
         this.props.update('search', {search: val});
	 },
	 toggleFilter: function (e) {
    	var id = e.currentTarget.id;
    	var prop = id + "Visible";
    	var obj = {};
    	var visibility = this.props[prop] == true ? false : true;
    	obj[prop] = visibility;
    	this.props.update(obj);
	 },
     componentDidMount: function () {
         var self = this;
         posts.on('returnCollection', function (data) {
             console.log(data);
             self.setProps({posts: data.rows, total: data.count}, function () {
                console.log('props set');
             });
         });
         posts.collection();
	 },
	 render: function () {
		  var visible = "fa fa-minus-square-o";
		  var hidden = "fa fa-plus-square-o";

		  return (
			<div className="search">
				<div className="keywords">
    				<input ref="term" className="term" type="text" placeholder="search for" />
    				<button className="button green" ref="search" onClick={this.search}><i className="fa fa-search" /></button>
				</div>
                <h3 id="dates" onClick={this.toggleFilter}><i className={this.props.datesVisible ? visible : hidden} /> Date Range:</h3>
				<Dates update={this.update} datesVisible={this.props.datesVisible} />
				<hr />
				<h3 id="types" onClick={this.toggleFilter}><i className={this.props.typesVisible ? visible : hidden} /> Toggle Content:</h3>
				<Types update={this.update} typesVisible={this.props.typesVisible} exclude={this.props.exclude} />
				<hr />
				<Filter update={this.update} sortVisible={this.props.sortVisible} />
				<Pagination ref="pagination" update={this.update} page={this.props.page} total={this.props.total} limit={this.props.limit} />
				<Posts update={this.update} posts={this.props.posts} />
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
			<div>
			  <div className="filter">
			      <div className="label">Sort by</div>
				  <select className="sort" onChange={this.sort} ref="sort">
					  <option value="influence">Influence</option>
					  <option value="views">Views</option>
					  <option value="popularity">Popularity</option>
					  <option value="thumbs">Thumbs</option>
					  <option value="comments">Comments</option>
					  <option value="location">Location</option>
					  <option value="createdAt">Date</option>
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
		  <div className={this.props.datesVisible ? 'show' : 'hide'}>
			<div>
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
			</div>
			<div>
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
	toggle: function (e) {
	    var type = e.currentTarget.id;	
	    var exclude = this.props.exclude;
	    var index = exclude.indexOf(type);
	    if (index > -1) {
    	    exclude.splice(index, 1);
	    } else {
    	    exclude.push(type);
	    }
	    this.props.update({exclude: exclude});
	},
	off: function (type) {
    	var exclude = this.props.exclude;
    	if (exclude.length && exclude.indexOf(type) > -1) {
    	    return 'off ';
        }
        return '';
	},
	render: function () {
		return (
			<div className={this.props.typesVisible ? 'show' : 'hide'}>
			  <div className="types">
				  <button id="blogs" value="blog" className={(this.off('blogs')) + "button green"} onClick={this.toggle}><i className="fa fa-laptop" /> Blogs</button>
				  <button id="events" value="event" className={(this.off('events')) + " button green"} onClick={this.toggle}><i className="fa fa-calendar" /> Events</button>
				  <button id="subjects" value="subject" className={(this.off('subjects')) + " button blue"} onClick={this.toggle}><i className="fa fa-puzzle-piece" /> Subjects</button>
				  <button id="questions" value="question" className={(this.off('questions')) + " button blue"} onClick={this.toggle}><i className="fa fa-question" /> Questions</button>
				  <button id="debates" value="debate" className={(this.off('debates')) + " button red"} onClick={this.toggle}><i className="fa fa-bullhorn" /> Debates</button>
				  <button id="bills" value="bill" className={(this.off('bills')) + " button red"} onClick={this.toggle}><i className="fa fa-line-chart" /> Bills</button>
				  <button id="beliefs" value="belief" className={(this.off('beliefs')) + " button orange"} onClick={this.toggle}><i className="fa fa-road" /> Paths</button>
				  <button id="quotes" value="quote" className={(this.off('quotes')) + " button orange"} onClick={this.toggle}><i className="fa fa-quote-right" /> Quotes</button>
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
				<button href="javascript:void(0)" ref="prev" className="button blue" onClick={this.previous}>Previous</button>
				<div>
    				<div>Page {this.props.page} of {pages}</div>
    				<br />
    				<div>Total Posts: {this.props.total}</div>
				</div>
				<button href="javascript:void(0)" ref="next" className="button blue" onClick={this.next}>Next</button>
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
		   var user = {first: "JESSE", last: "drelick"};
		   return <PostItem key={item.id} post={item} user={user} />;
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
		var post = this.props.post;
		for (var i = 0, keys = Object.keys(post); i < keys.length; i++) {
			var key = keys[i];
			var value = post[keys[i]];
			if (['id', 'user_id', 'type', 'content', 'date', 'title', 'post_id', 'privacy', 'views', 'comments', 'thumbs', 'popularity', 'influence', 'createdAt', 'updatedAt'].indexOf(key) === -1 && value !== null) {
				meta.push(<li>{key}: {value}</li>);
			}
			
		}
		return (
			<div className="postItem" key={this.props.post.id}>
				<h2><a href="./post/1">{this.props.post.title}</a></h2>
				<div className="type"><i className="fa fa-bell" /> {this.props.post.type}</div>
				<div className="pic">
					<a href="/profile/1">
					    <img src="/assets/default.png" />
                    </a>
				</div>
				<div className="basic">
				  <h3>By <a href="/profile/1">{this.props.user.first} {this.props.user.last}</a></h3>
				  <span className="created">{moment(this.props.post.createdAt).fromNow()}</span>
				  <span className="created">{this.props.user}</span>
				</div>
				<div className="detail">
				  <ul>
					{meta}
				  </ul> 
				</div>
				<div className="stats">
				  <div className="influence">{this.props.post.influence}</div>
				  <li>Views: {this.props.post.views}</li>
				  <li>Comments: {this.props.post.comments}</li>
				  <li>Popularity: {this.props.post.thumbs}</li>
				</div>
				<div className="content">{this.props.post.content}</div>
			</div>
		);
	}	 
});

module.exports = Search;