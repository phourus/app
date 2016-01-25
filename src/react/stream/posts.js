"use strict";
let React = require('react');
let Router = require('react-router');
let { Link } = Router;

let AccountStore = require('../../stores/account');
let AccountActions = require('../../actions/account');

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
			this.setState(data);
		});
		AccountActions.get();
	},
	componentWillReceiveProps: function () {
		this.forceUpdate();
	},
	componentWillUnmount: function () {
		this.unsubscribe();
	},
	render: function () {
		if (this.props.posts === null) {
			return <Loader />
		}
		if (this.props.posts.length < 1) {
			return <h2 style={{textAlign: 'center'}}>No posts found based on your criteria</h2>;
		}
		if (['create', 'edit', 'post'].indexOf(this.props.context.type) !== -1) {
			return <Single posts={this.props.posts} user={this.state.user} context={this.props.context} owner={this._owner} />;
		}
		return <Collection posts={this.props.posts} user={this.state.user} context={this.props.context} owner={this._owner} sidebarVisible={this.props.sidebarVisible} />;
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

let Collection = React.createClass({
	render: function () {
		return (
			<div className={this.props.sidebarVisible ? "posts sidebar" : "posts"}>
				{this.props.posts.map((item, i) => {
					 let owner = this.props.owner(item);
					 let location = {};
					 if (item.user.locations && item.user.locations.length > 0) {
							 location = item.user.locations[0];
					 }
					 return <Post.Item key={item.id} post={item} user={item.user} context={this.props.context} owner={owner} location={location} scroll={this.props.scroll} />;
				})}
			</div>
		);
	}
});

let Single = React.createClass({
	getDefaultProps: function () {
		return {
			posts: [],
			context: {}
		};
	},
	render: function () {
		let post = this._post();
		let owner = this.props.owner(post);
		return <Post post={post} context={this.props.context} owner={this.props.owner} />;
	},
	_post: function () {
		let post = {};
		let posts = this.props.posts.filter(item => {
			if (item.id == this.props.context.id) {
				return true;
			}
			return false;
		});
		post = posts[0] || {};

		if (this.props.context.type === 'create') {
			post.user = this.props.user;
		}
		return post;
	}
});
