"use strict";
let React = require('react');
let Router = require('react-router');
let { Link } = Router;
let posts = require('../sockets/posts');
let moment = require('moment');
let msg = require('../actions/alerts').add;
let Mutant = require('react-mutant');

let Search = React.createClass({
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
	     let val = this.refs.term.getDOMNode().value;
       this.state.mutant.set({search: val});
	 },
	 toggleFilter: function (e) {
    	let id = e.currentTarget.id;
    	let prop = id + "Visible";
    	let obj = {};
    	let visibility = this.state[prop] == true ? false : true;
    	obj[prop] = visibility;
    	this.state.mutant.set(obj);
	 },
     componentDidMount: function () {
         let self = this;
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
		  let visible = "fa fa-minus-square-o";
		  let hidden = "fa fa-plus-square-o";
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

let Groups = React.createClass({
	render: function () {
		return (
			<div className="groups">Groups</div>
		);
	}
});

let Filter = React.createClass({
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

let Dates = React.createClass({
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

let Types = React.createClass({
	toggle: function (e) {
	    let type = e.currentTarget.id;
	    let exclude = this.props.exclude;
	    let index = exclude.indexOf(type);
	    if (index > -1) {
    	    exclude.splice(index, 1);
	    } else {
    	    exclude.push(type);
	    }
	    this.props.mutant.set({exclude: exclude});
	},
	off: function (type) {
    	let exclude = this.props.exclude;
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

let Pagination = React.createClass({
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
		let pages = Math.ceil(this.props.total / this.props.limit);
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
let Posts = React.createClass({
	render: function () {
		let data = this.props.posts;
		let list = [];

		list = data.map(function (item, i) {
		   let location = {};
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

let PostItem = React.createClass({
	render: function () {
		let meta = [];
		let post = this.props.post;
		for (let i = 0, keys = Object.keys(post); i < keys.length; i++) {
			let key = keys[i];
			let value = post[keys[i]];
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
					    <img src={`/assets/avatars/${this.props.user.img}.jpg`} />
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
