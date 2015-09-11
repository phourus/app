"use strict";
let React = require('react');
let Router = require('react-router');
let { Link, State } = Router;
let posts = require('../api/posts');
let moment = require('moment');
let numeral = require('numeral');
let thousands = "0,0";
let Store = require('../stores/stream');
let Actions = require('../actions/stream');

let AccountStore = require('../stores/account');
let AccountActions = require('../actions/account');

let Tax = require('../taxonomy');
let Influence = require('../influence');
let Popularity = require('../popularity');
let Scroll = require('react-infinite-scroll')(React);
let PostItem = require('./post');

let Stream = React.createClass({
	mixins: [State],
	getInitialState: function () {
		return {
			posts: [],
			total: 0,
			params: {
				exclude: [],
				search: '',
				sortBy: 'influence',
				direction: 'DESC',
				page: 1,
				limit: 10,
				total: 0
			},
			context: {
				type: null,
				id: null
			}
		}
	},
	componentDidMount: function () {
		this.unsubscribe = Store.listen((data) => {
			this.setState(data);
		});
		this._context();
	},
	componentWillUnmount: function () {
		this.unsubscribe();
	},
	componentWillReceiveProps: function () {
		this._context();
	},
	render: function () {
		let visible = 'fa fa-minus-square-o';
		let hidden = 'fa fa-plus-square-o';
		let hasMore = (this.state.posts.length < this.state.total && this.state.context.type !== 'post' && this.state.context.type !== 'edit');
		return (
			<div className="search">
				<Head {...this.state} />
				<Scroll pageStart={0} loadMore={this._more} hasMore={hasMore} loader={<div className="loader"></div>}>
					<Posts {...this.state} />
				</Scroll>
			</div>
		);
	},
	_context: function () {
		/** CONTEXT **/
		// /stream
		// /stream/user/:id
		// /stream/org/:id
		// /stream/edit/:id
		// /stream/:id

		let route = this.context.router.getCurrentRoutes();
		let params = this.context.router.getCurrentParams();
		let id = null;
		let type = null;

		if (route[2]) {
			type = route[2].name;
		}
		if (params.id) {
			id = params.id;
		}
		Actions.context(type, id);
	},
	_more: function () {
		Actions.more();
	}
});

let Head = React.createClass({
	getInitialState: function () {
		return { mode: false };
	},
	render: function () {
		let popup = '';
		if (this.state.mode === 'filter') {
			popup = <Filter {...this.props.params} />
		}
		if (this.state.mode === 'sort') {
			popup = <Sort {...this.props.params} />
		}
		return (
			<div className="heading">
				<div className="keywords">
						<input ref="term" className="term" type="text" placeholder="Search for" />
						<button className="button blue" ref="search" onClick={this._search}><i className="fa fa-search" /> Search</button>
				</div>
				<div className="refine">
					<Context {...this.props.context} />
					<div className="toggles">
						<button className="fa fa-filter" onClick={this._filter}> Filter</button>
						<button className="fa fa-sort" onClick={this._sort}> Sort</button>
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
		if (this.state.mode === 'filter') {
			this.setState({mode: false});
		} else {
			this.setState({mode: 'filter'});
		}
	},
	_sort: function () {
		if (this.state.mode === 'sort') {
			this.setState({mode: false});
		} else {
			this.setState({mode: 'sort'})
		}
	}
});

let Context = React.createClass({
	getDefaultProps: function () {
		return {
			id: null,
			type: null,
			profile: null
		}
	},
	render: function () {
		let label = 'Viewing all public Phourus posts';
		let img = '/assets/logos/logo-emblem.png';
		let clear = false;
		let clearLink = <span> | Clear filters <Link to="stream" className="close">x</Link></span>;
		let link = false;
		let name = '';
		if (this.props.profile) {
			name = this.props.profile.username || this.props.profile.shortname || '';
		}
		if (true === 'user is logged in') {
			link = <Link to="myPosts">Click here to view your posts</Link>
		} else {
			link = <Link to="account">Click here to create posts</Link>
		}
		if (this.props.type === 'myPosts') {
			label = 'Viewing all my posts:';
			clear = clearLink;
			img = '/assets/avatars/' + (this.props.profile.img || 'default') + '.jpg';
			link = <Link to="account">View my account</Link>
		}
		if (this.props.type === 'userPosts') {
			label = 'Viewing posts by:';
			img = '/assets/avatars/' + (this.props.profile.img || 'default') + '.jpg';
			clear = clearLink;
			link = <Link to="user" params={{id: this.props.id}}>{name}</Link>
		}
		if (this.props.type === 'orgPosts') {
			label = 'Viewing posts by:';
			img = '/assets/orgs/' + (this.props.profile.img || 'default') + '.jpg';
			clear = clearLink;
			link = <Link to="user" params={{id: this.props.id}}>{name}</Link>
		}
		return (
			<div className="context">
				<img src={img} />
				{label}<br />
			  {link} {clear}
			</div>
		);
	},
	_clear: function () {
		Actions.context(null, null);
	}
});

let Filter = React.createClass({
	// <button className="clear">
	// 	Clear All <i className="fa fa-close" />
	// </button>
	// <button className="apply">
	// 	Apply <i className="fa fa-check" />
	// </button>
	render: function () {
		return (
			<div className="filter">
				<div className="triangle"></div>
				<div className="label">Filter By</div>
				<Filter.Types {...this.props} />
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

Filter.Dates = React.createClass({
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

Filter.Types = React.createClass({
	render: function () {
		var classes = {
			blog: "button green",
			event: "button green",
			subject: "button blue",
			question: "button blue",
			debate: "button red",
			poll: "button red",
			belief: "button gold",
			quote: "button gold"
		}
		for (var i = 0; i < this.props.exclude.length; i++) {
			var key = this.props.exclude[i];
			classes[key] += " off";
		}
		return (
			<div className="types">
				<button id="blog" className={classes.blog} onClick={this._toggle}><i className="fa fa-laptop" /> Blogs</button>
				<button id="event" className={classes.event} onClick={this._toggle}><i className="fa fa-calendar" /> Events</button>
				<button id="subject" className={classes.subject} onClick={this._toggle}><i className="fa fa-puzzle-piece" /> Subjects</button>
				<button id="question" className={classes.question} onClick={this._toggle}><i className="fa fa-question" /> Questions</button>
				<button id="debate" className={classes.debate} onClick={this._toggle}><i className="fa fa-bullhorn" /> Debates</button>
				<button id="poll" className={classes.poll} onClick={this._toggle}><i className="fa fa-line-chart" /> Polls</button>
				<button id="belief" className={classes.belief} onClick={this._toggle}><i className="fa fa-road" /> Beliefs</button>
				<button id="quote" className={classes.quote} onClick={this._toggle}><i className="fa fa-quote-right" /> Quotes</button>
			</div>
		);
	},
	_toggle: function (e) {
		let type = e.currentTarget.id;
		Actions.exclude(type);
	}
});

Filter.Categories = React.createClass({
	getInitialState: function () {
		return {
			element: 'blogs',
			category: '',
			subcategory: ''
		}
	},
	render: function () {
		let categories = [];
		let subcategories = [];
		categories = Tax[this.state.element];

		if (this.state.element === 'blogs') {
			categories = Tax.blogs.world;
		}
		if (this.state.element === 'subjects') {
			categories = Tax.subjects.category;
			subcategories = Tax.subjects[this.state.category || Tax.subjects.category[0].value];
		}
		if (this.state.element === 'debates') {
			categories = Tax.debates.category;
			subcategories = [];
		}
		if (this.state.element === 'beliefs') {
			categories = Tax.beliefs.category;
			subcategories = [];
		}
		return (
			<div className="categories">
				<div className="toggles">
					<button className="button blue">Select All</button>
					<button className="button red">Select None</button>
				</div>
				<ul>
					<li><a id="blogs" href="javascript:void(0)" onClick={this._changeElement}>Blogs & Events</a></li>
					<li><a id="subjects" href="javascript:void(0)" onClick={this._changeElement}>Subjects & Questions</a></li>
					<li><a id="debates" href="javascript:void(0)" onClick={this._changeElement}>Debates & Polls</a></li>
					<li><a id="beliefs" href="javascript:void(0)" onClick={this._changeElement}>Beliefs & Quotes</a></li>
				</ul>
				<ul>
					{categories.map((item) => {
						return <li><a id={item.value} href="javascript:void(0)" onClick={this._changeCategory}>{item.label}</a></li>
					})}
				</ul>
				<ul>
					{subcategories.map((item) => {
						return <li><a id={item.value} href="javascript:void(0)" onClick={this._changeCategory}>{item.label}</a></li>
					})}
				</ul>
			</div>
		);
	},
	_changeElement: function (e) {
		let id = e.currentTarget.id;
		this.setState({element: id});
	},
	_changeCategory: function (e) {
		let id = e.currentTarget.id;
		this.setState({category: id});
	}
});

let Sort = React.createClass({
	render: function () {
		return (
			<div className="sortby">
				<div className="triangle"></div>
				<div className="label">Sort by</div>
				<ul className="sort" ref="sort">
					<li className={(this.props.sortBy === 'influence') ? "selected" : ""} onClick={this._influence}><i className="fa fa-check" /> Influence</li>
					<li className={(this.props.sortBy === 'totalViews') ? "selected" : ""} onClick={this._views}><i className="fa fa-check" /> Views</li>
					<li className={(this.props.sortBy === 'popularity') ? "selected" : ""} onClick={this._popularity}><i className="fa fa-check" /> Popularity</li>
					<li className={(this.props.sortBy === 'totalThumbs') ? "selected" : ""} onClick={this._thumbs}><i className="fa fa-check" /> Thumbs</li>
					<li className={(this.props.sortBy === 'totalComments') ? "selected" : ""} onClick={this._comments}><i className="fa fa-check" /> Comments</li>
					<li className={(this.props.sortBy === 'location') ? "selected" : ""} onClick={this._location}><i className="fa fa-check" /> Location</li>
					<li className={(this.props.sortBy === 'date') ? "selected" : ""} onClick={this._date}><i className="fa fa-check" /> Date</li>
				</ul>
				<div className="direction"  ref="direction">
					<button className={(this.props.direction === 'DESC') ? 'selected' : ''} onClick={this._desc}>
							<i className="fa fa-arrow-down" /> High to Low
					</button>
					<button className={(this.props.direction === 'ASC') ? 'selected' : ''} onClick={this._asc}>
						<i className="fa fa-arrow-up" /> Low to High
					</button>
				</div>
			</div>
		);
	},
	_influence: function (e) { Actions.sortBy('influence'); },
	_views: function (e) { Actions.sortBy('totalViews'); },
	_popularity: function (e) { Actions.sortBy('popularity'); },
	_thumbs: function (e) { Actions.sortBy('totalThumbs'); },
	_comments: function (e) { Actions.sortBy('totalComments'); },
	_location: function (e) { Actions.sortBy('location'); },
	_date: function (e) { Actions.sortBy('date'); },
	_asc: function (e) { Actions.direction('ASC'); },
	_desc: function (e) { Actions.direction('DESC'); },
});

// let Foot = React.createClass({
// 	render: function () {
// 		return (
// 			<div className="foot">
// 				<Pagination ref="pagination" page={this.props.params.page} total={this.props.total} limit={this.props.params.limit} />
// 			</div>
// 		);
// 	}
// });
//
// let Pagination = React.createClass({
// 	render: function () {
// 		let pages = Math.ceil(this.props.total / this.props.limit);
// 		return (
// 			<div className="pagination">
// 				<div>Displaying page {this.props.page} of {pages} out of {this.props.total} posts</div>
// 				<button href="javascript:void(0)" ref="prev" className="button blue" onClick={this._previous}>Previous</button>
// 				<button href="javascript:void(0)" ref="next" className="button blue" onClick={this._next}>Next</button>
// 			</div>
// 		);
// 	},
// 	_next: function () {
// 		Actions.nextPage();
// 	},
// 	_previous: function () {
// 		Actions.previousPage();
// 	}
// });

/** POSTS **/
let Posts = React.createClass({
	getInitialState: function () {
		return {
			user: {
				id: null
			}
		}
	},
	componentDidMount: function () {
		this.unsubscribe = AccountStore.listen((data) => {
			this.setState(data);
		});
		AccountActions.get();
	},
	componentWillUnmount: function () {
		this.unsubscribe();
	},
	render: function () {
		let data = this.props.posts;
		let filtered = this.props.posts;
		let list = [];

		if (this.props.context.type === 'post' || this.props.context.type === 'edit') {
			filtered = data.filter(item => {
				if (item.id == this.props.context.id) {
					return true;
				}
				return false;
			});
		}

		list = filtered.map((item, i) => {
			 let location = {};
			 let owner = (item.user.id == this.state.user.id);
			 if (item.user.locations && item.user.locations.length > 0) {
					 location = item.user.locations[0];
			 }
			 return <PostItem key={item.id} post={item} user={item.user} context={this.props.context} owner={owner} location={location} scroll={this.props.scroll} />;
		});

		if (list.length < 1) {
			return <h2 style={{textAlign: 'center'}}>No posts found based on your criteria</h2>
		}
		return (
			<div className={(this.props.context.type === 'post' || this.props.context.type === 'edit') ? "post" : "posts"}>{list}</div>
		);
	}
});

module.exports = Stream;
