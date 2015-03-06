/** @jsx React.DOM */
"use strict";
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var posts = require('../sockets/posts');
var moment = require('moment');
var msg = function (color, msg, code) {}
var Mutant = require('react-mutant');

var Search = React.createClass({
	 getInitialState: function () {
    	 return new Mutant({
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
        });
     },
	 search: function () {
	     var val = this.refs.term.getDOMNode().value;
       this.state.mutant.set({search: val});
	 },
	 toggleFilter: function (e) {
    	var id = e.currentTarget.id;
    	var prop = id + "Visible";
    	var obj = {};
    	var visibility = this.state[prop] == true ? false : true;
    	obj[prop] = visibility;
    	this.state.mutant.set(obj);
	 },
     componentDidMount: function () {
         var self = this;
				this.state.mutant.on('update', function (mutant) {
						self.setState(mutant);
				});
         posts.on('collection', function (code, data) {
             if (code != 200) {
                msg('red', 'Posts could not be loaded', code);
                return;
            }
             self.state.mutant.set({posts: data.rows, total: data.count});
         });
         posts.collection({});
	 },
	 componentWillUnmount: function () {
    	 posts.off('collection');
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
                <h3 id="dates" onClick={this.toggleFilter}><i className={this.state.datesVisible ? visible : hidden} /> Date Range:</h3>
				<Dates datesVisible={this.state.datesVisible} />
				<hr />
				<h3 id="types" onClick={this.toggleFilter}><i className={this.state.typesVisible ? visible : hidden} /> Toggle Content:</h3>
				<Types typesVisible={this.state.typesVisible} exclude={this.state.exclude} />
				<hr />
				<Filter sortVisible={this.props.sortVisible} />
				<Pagination ref="pagination" page={this.state.page} total={this.state.total} limit={this.state.limit} />
				<Posts posts={this.state.posts} />
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
    	this.props.mutant.set({sort: e.target.value});
	},
	direction: function (e) {
        this.props.mutant.set({direction: e.target.value});
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
	    this.props.mutant.set({exclude: exclude});
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
    	    this.props.mutant.set({page: this.props.page + 1});
	    }
	},
	previous: function () {
        if (this.props.page > 1) {
    	    this.props.mutant.set({page: this.props.page - 1});
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
		   var location = {};
		   if (item.user.locations && item.user.locations.length > 0) {
    		   location = item.user.locations[0];
		   }
		   return <PostItem key={item.id} post={item} user={item.user} location={location} />;
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
			if (['element', 'category', 'subcategory', 'difficulty', 'scope', 'zip', 'author', 'vote'].indexOf(key) !== -1 && value !== null) {
				meta.push(<li key={key} >{key}: {value}</li>);
			}

		}
		return (
			<div className="postItem">
				<h2><Link to="post" params={{id: this.props.post.id}}>{this.props.post.title}</Link></h2>
				<div className="type"><i className="fa fa-bell" /> {this.props.post.type}</div>
				<div className="pic">
					<Link to="user" params={{id: this.props.user.id}}>
					    <img src={"/assets/avatars/" + this.props.user.img + ".jpg"} />
                    </Link>
				</div>
				<div className="basic">
				  <h3>By <Link to="user" params={{id: this.props.user.id}}>{this.props.post.user.first} {this.props.post.user.last}</Link></h3>
				  <div className="created">{moment(this.props.post.createdAt).fromNow()}</div>
				  <div className="location">{this.props.location.city} {this.props.location.state}</div>
				</div>
				<div className="detail">
				  <ul>
					{meta}
				  </ul>
				</div>
				<div className="stats">
				  <div className="influence">{this.props.post.influence}</div>
				  <li>Views: {this.props.post.views}</li>
				  <li>Comments: {this.props.post.totalComments}</li>
				  <li>Popularity: {this.props.post.thumbs}</li>
				</div>
				<div className="content">{this.props.post.content}</div>
			</div>
		);
	}
});

module.exports = Search;
