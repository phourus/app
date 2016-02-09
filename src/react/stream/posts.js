"use strict";
let React = require('react');
let Router = require('react-router');
let { Link } = Router;

let AccountStore = require('../../stores/account');
let AccountActions = require('../../actions/account');

let TutorialActions = require('../../actions/tutorial');

let Loader = require('../shared/loader');
let Post = require('../post');

module.exports = React.createClass({
	getDefaultProps: function () {
		return {
			posts: []
		};
	},
	getInitialState: function () {
		return {
			ready: false,
			user: {
				id: 0
			}
		};
	},
	componentDidMount: function () {
		this.unsubscribe = AccountStore.listen((data) => {
			if (this.state.ready === false) {
				data.ready = true;
			}
			// privacy click re-render issue
			if (!data.orgs) {
				this.setState(data);
			}
		});
		AccountActions.get();
	},
	componentWillReceiveProps: function () {
		this.forceUpdate();
	},
	componentWillUnmount: function () {
		this.unsubscribe();
	},
	componentDidUpdate: function () {
		let posts = this.props.posts;
		if (posts && posts.length > 1) {
			TutorialActions.ready(true);
		}
	},
	render: function () {
		let route = this.props._route;
		if (this.props.posts === null) {
			return <Loader />
		}
		if (this.props.posts.length < 1) {
			return <h2 style={{textAlign: 'center'}}>No posts found based on your criteria</h2>;
		}
		return (
			<div className={this.props.sidebarVisible ? "posts sidebar" : "posts"}>
				{this.props.posts.map((item, i) => {
					 let owner = this._owner(item);
					 let location = {};
					 if (item.user.locations && item.user.locations.length > 0) {
							 location = item.user.locations[0];
					 }
					 return <Post.Item key={item.id} post={item} user={item.user} _route={route} owner={owner} location={location} scroll={this.props.scroll} />;
				})}
			</div>
		);
	},
	_owner: function (post) {
		let user = this.state.user;
		if (!user || !user.id) {
			return false;
		}
		let sharedPosts = user && user.SESSION_POSTS && user.SESSION_POSTS.constructor === Array ? user.SESSION_POSTS : [];
		return (post.user && post.user.id == user.id) || sharedPosts.indexOf(post.id) !== -1;
	}
});
