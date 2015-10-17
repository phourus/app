"use strict";
let React = require('react');
let Router = require('react-router');
let { Link, State, Navigation } = Router;
let posts = require('../api/posts');
let moment = require('moment');
let numeral = require('numeral');
let thousands = "0,0";
let Store = require('../stores/stream');
let Actions = require('../actions/stream');

let AccountStore = require('../stores/account');
let AccountActions = require('../actions/account');

let Profile = require('./profile');
let Loader = require('./loader');
let Tax = require('../taxonomy');
let Influence = require('../influence');
let Popularity = require('../popularity');
let Scroll = require('react-infinite-scroll')(React);
let PostItem = require('./post');

let Stream = React.createClass({
	mixins: [State],
	getInitialState: function () {
		return {
			posts: null,
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
		let hasMore = (this.state.posts && this.state.posts.length < this.state.total && this.state.context.type !== 'post' && this.state.context.type !== 'edit');
		return (
			<div className="stream">
				{this.state.context.type === 'orgs' && !this.state.context.id
					? <Organizations context={this.state.context} />
					: false
				}
				{this.state.context.id && (this.state.context.type === 'orgs' || this.state.context.type === 'users')
					? <Profile context={this.state.context} />
					: false
				}
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

let Organizations = React.createClass({
	mixins: [Navigation],
	getInitialState: function () {
		return {
			orgs: []
		};
	},
	componentDidMount: function () {
		this.unsubscribe = AccountStore.listen((data) => {
			this.setState(data);
		});
		AccountActions.orgs();
	},
	componentWillUnmount: function () {
		this.unsubscribe();
	},
	render: function () {
		let membership = this.state.orgs || [];
		let selected = this.state.orgs.filter((org) => {
			if (org.orgId.toString() === this.props.context.id) {
				return true;
			}
			return false;
		});
		return (
			<div className="organizations">
				<h1>My Organizations</h1>
				<div className="list">
					{membership.map((member) => {
						let org = member.org;
						return (
							<div key={org.id} id={org.id} className="org" onClick={this._select}>
								<div className="name">{org.name}</div>
								<Pic img={org.img} />
							</div>
						);
					})}
				</div>
			</div>
		);
	},
	_select: function (e) {
		this.context.router.transitionTo("orgPosts", {id: e.currentTarget.id});
	}
});

let Pic = React.createClass({
  getInitialState: function () {
    return {
			id: 0,
      img: '/assets/avatars/default.jpg',
      default: '/assets/avatars/default.jpg'
    }
  },
  componentWillReceiveProps: function (data) {
    if (data.img) {
      this.setState(data);
    }
  },
  render: function () {
    return (
      <div className="pic">
				<Link to="orgPosts" params={{id: this.state.id}}>
        	<img src={this.state.img} onError={this._default} />
				</Link>
      </div>
    );
  },
  _default: function () {
    this.setState({img: this.state.default});
  }
});

let Context = React.createClass({
	mixins: [Navigation],
	render: function () {
		let classes = {
			phourus: "fa fa-flag",
			organizations: "fa fa-users",
			users: "fa fa-user"
		};
		if (!this.props.type) {
			classes.phourus += ' selected';
		}
		if (this.props.type === 'userPosts') {
			classes.users += ' selected';
		}
		if (this.props.type === 'orgPosts' || this.props.type === 'orgs') {
			classes.organizations += ' selected';
		}
		// <button className={classes.phourus} onClick={this._phourus}> Phourus</button>
		// <button className={classes.organizations} onClick={this._organizations}> Orgs</button>
		// <button className={classes.users} onClick={this._users}> Users</button>
		return (
			<div className="context"></div>
		);
	},
	_phourus: function () {
		this.context.router.transitionTo("stream");
	},
	_organizations: function () {
		this.context.router.transitionTo("orgs");
	},
	_users: function () {
		this.context.router.transitionTo("users");
	}
});

let _Context = React.createClass({
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
			ready: false,
			user: {
				id: null
			}
		}
	},
	componentDidMount: function () {
		this.unsubscribe = AccountStore.listen((data) => {
			if (this.state.ready === false) {
				data.ready = true;
			}
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

		if (this.props.posts === null) {
			return <Loader />
		}

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

		if (this.state.ready === false) {
			//return <Loader />
		}
		if (list.length < 1) {
			return <h2 style={{textAlign: 'center'}}>No posts found based on your criteria</h2>
		}
		return (
			<div className={(this.props.context.type === 'post' || this.props.context.type === 'edit') ? "post" : "posts"}>{list}</div>
		);
	}
});

module.exports = Stream;
