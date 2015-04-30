"use strict";
let React = require('react');
let Router = require('react-router');
let { Link } = Router;
let posts = require('../sockets/posts');
let moment = require('moment');
let Store = require('../stores/search');
let Actions = require('../actions/search');

let Influence = require('../influence');
let Popularity = require('../popularity');

let Search = React.createClass({
	 getInitialState: function () {
			 return {
						posts: [],
						exclude: [],
						search: '',
						sort: 'influence',
						direction: 'DESC',
						page: 1,
						limit: 10,
						total: 0
				}
		 },
	 componentDidMount: function () {
			let self = this;
			Store.listen(function (data) {
					self.setState(data);
			});
			Actions.collection({});
	 },
	 componentWillUnmount: function () {
			 // Store.stoplistening?
	 },
	 render: function () {
			let visible = "fa fa-minus-square-o";
			let hidden = "fa fa-plus-square-o";
			return (
			<div className="search">
				<Head {...this.state} />
				<Posts posts={this.state.posts} />
				<Foot {...this.state} />
			</div>
			)
	 }
});

let Head = React.createClass({
	getInitialState: function () {
		return { mode: 0 };
	},
	render: function () {
		let popup = '';
		if (this.state.mode === 1) {
			popup = <Filter {...this.props} />
		}
		if (this.state.mode === 2) {
			popup = <Sort {...this.props} />
		}
		return (
			<div className="heading">
				<div className="keywords">
						<input ref="term" className="term" type="text" placeholder="Search for" />
						<button className="button blue" ref="search" onClick={this._search}><i className="fa fa-search" /> Search</button>
				</div>
				<div className="refine">
					<Context />
					<div className="toggles">
						<button className="fa fa-filter" onClick={this._filter}></button>
						<button className="fa fa-sort" onClick={this._sort}></button>
					</div>
				</div>
				{popup}
			</div>
		);
	},
	_search: function () {
			let val = this.refs.term.getDOMNode().value;
			Actions.search(val);
	},
	_filter: function () {
		this.setState({mode: 1});
	},
	_sort: function () {
		this.setState({mode: 2});
	}
});

let Foot = React.createClass({
	render: function () {
		return (
			<div className="foot">
				<Pagination ref="pagination" page={this.props.page} total={this.props.total} limit={this.props.limit} />
			</div>
		);
	}
});

let Context = React.createClass({
	render: function () {
		return (
			<div className="context">
				Viewing posts by:
			</div>
		);
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
	render: function () {
		return (
			<div className="filter">
				<div className="triangle"></div>
				<div className="label">Filter By</div>
				<Types />
				<div className="label">Date Range</div>
				<Dates />
				<button className="clear">
					Clear All <i className="fa fa-close" />
				</button>
				<button className="apply">
					Apply <i className="fa fa-check" />
				</button>
			</div>
		);
	},
	toggleFilter: function (e) {
		let id = e.currentTarget.id;
		let prop = id + "Visible";
		let obj = {};
		let visibility = this.state[prop] == true ? false : true;
		obj[prop] = visibility;
		Actions.type(obj);
	}
});

let Sort = React.createClass({
	sort: function (e) {
			Actions.sortBy(e.target.value);
	},
	direction: function (e) {
			Actions.direction(e.target.value);
	},
	render: function () {
		return (
			<div className="sortby">
				<div className="triangle"></div>
				<div className="label">Sort by</div>
				<ul className="sort" onClick={this.sort} ref="sort">
					<li className="influence selected"><i className="fa fa-check" /> Influence</li>
					<li className="views"><i className="fa fa-check" /> Views</li>
					<li className="popularity"><i className="fa fa-check" /> Popularity</li>
					<li className="thumbs"><i className="fa fa-check" /> Thumbs</li>
					<li className="comments"><i className="fa fa-check" /> Comments</li>
					<li className="location"><i className="fa fa-check" /> Location</li>
					<li className="createdAt"><i className="fa fa-check" /> Date</li>
				</ul>
				<div className="direction"  ref="direction">
					<button className="DESC selected" onChange={this.direction}>
							<i className="fa fa-arrow-down" /> High to Low
					</button>
					<button className="ASC" onChange={this.direction}>
						<i className="fa fa-arrow-up" /> Low to High
					</button>
				</div>
			</div>
		);
	}
});

let Dates = React.createClass({
	render: function () {
		return (
			<div className="dates">
				<div>
					<label>From:</label>
					<button><i className="fa fa-calendar" /></button>
					<input />
				</div>
				<div>
					<label>To:</label>
					<button><i className="fa fa-calendar" /></button>
					<input />
				</div>
			</div>
		);
	}
});

let Types = React.createClass({
	getInitialState: function () {
		return {
			exclude: []
		}
	},
	toggle: function (e) {
			let type = e.currentTarget.id;
			let exclude = this.props.exclude;
			let index = exclude.indexOf(type);
			if (index > -1) {
					exclude.splice(index, 1);
			} else {
					exclude.push(type);
			}
			Actions.types(exclude);
	},
	off: function (type) {
			let exclude = this.state.exclude;
			if (exclude.length && exclude.indexOf(type) > -1) {
					return 'off ';
				}
				return '';
	},
	render: function () {
		return (
			<div className="types">
				<button id="blogs" value="blog" className={(this.off('blogs')) + "button green"} onClick={this.toggle}><i className="fa fa-laptop" /> Blogs</button>
				<button id="events" value="event" className={(this.off('events')) + " button green"} onClick={this.toggle}><i className="fa fa-calendar" /> Events</button>
				<button id="subjects" value="subject" className={(this.off('subjects')) + " button blue"} onClick={this.toggle}><i className="fa fa-puzzle-piece" /> Subjects</button>
				<button id="questions" value="question" className={(this.off('questions')) + " button blue"} onClick={this.toggle}><i className="fa fa-question" /> Questions</button>
				<button id="debates" value="debate" className={(this.off('debates')) + " button red"} onClick={this.toggle}><i className="fa fa-bullhorn" /> Debates</button>
				<button id="bills" value="bill" className={(this.off('bills')) + " button red"} onClick={this.toggle}><i className="fa fa-line-chart" /> Bills</button>
				<button id="beliefs" value="belief" className={(this.off('beliefs')) + " button gold"} onClick={this.toggle}><i className="fa fa-road" /> Paths</button>
				<button id="quotes" value="quote" className={(this.off('quotes')) + " button gold"} onClick={this.toggle}><i className="fa fa-quote-right" /> Quotes</button>
			</div>
		);
	}
});

let Pagination = React.createClass({
	next: function () {
			if ( Math.ceil(this.props.page * this.props.limit) < this.props.total ) {
					Actions.page(this.props.page++)
			}
	},
	previous: function () {
				if (this.props.page > 1) {
					Actions.page(this.props.page--);
			}
	},
	render: function () {
		let pages = Math.ceil(this.props.total / this.props.limit);
		return (
			<div className="pagination">
				<div>Displaying page {this.props.page} of {pages} out of {this.props.total} posts</div>
				<button href="javascript:void(0)" ref="prev" className="button blue" onClick={this.previous}>Previous</button>
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
	componentDidMount: function () {
		let element = document.getElementById(`popularity${this.props.post.id}`);
		let popularity = new Popularity(element, 0, this.props.post.popularity/100);
	},
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
				<h2 className="title"><Link to="post" params={{id: this.props.post.id}}>{this.props.post.title}</Link></h2>
				<div className="details">
					<div className="pic">
						<Link to="user" params={{id: this.props.user.id}}>
								<img src={`/assets/avatars/${this.props.user.img}.jpg`} />
						</Link>
					</div>
					<div className="basic">
						<span>By <Link to="user" params={{id: this.props.user.id}}>{this.props.post.user.first} {this.props.post.user.last} </Link></span>
						&bull;
						<span className="location"> {this.props.location.city}, {this.props.location.state}</span>
						<div className="created">{moment(this.props.post.createdAt).fromNow()}</div>
					</div>
					<div className="meta">
						<Influence influence={this.props.post.influence}/>
						<ul>
						{meta}
						</ul>
					</div>
				</div>
				<div className="content">{this.props.post.content}</div>
				<div className="footing">
					<div className="stats">
						<div className="likes">
							<canvas id={`popularity${this.props.post.id}`} width="100" height="100"></canvas>
							Popularity
						</div>
						<div><i className="fa fa-eye" /><strong>10,324</strong> Views </div>
						<div><i className="fa fa-comments" /><strong>1,323</strong> Comments</div>
					</div>
					<div className={`type ${this.props.post.type}`}><i className="fa fa-bell" /> {this.props.post.type}</div>
				</div>
			</div>
		);
	}
});

module.exports = Search;
