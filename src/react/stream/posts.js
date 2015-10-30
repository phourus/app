"use strict";
let React = require('react');
let Router = require('react-router');
let { Link, State, Navigation } = Router;

let AccountStore = require('../../stores/account');
let AccountActions = require('../../actions/account');

let Loader = require('../loader');
let PostItem = require('../post');

module.exports = React.createClass({
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
		let data = this.props.posts;
		let filtered = this.props.posts;
		let list = [];

		if (this.props.posts === null) {
			return <Loader />
		}

		if (this.props.context.type === 'post' || this.props.context.type === 'edit' || this.props.context.type === 'create') {
			filtered = data.filter(item => {
				if (item.id == this.props.context.id) {
					return true;
				}
				return false;
			});
		}

		list = filtered.map((item, i) => {
			 let location = {};
			 let owner = false;
			 if (this.props.context.type === 'create') {
				 item.user = this.state.user;
				 owner = true;
			 } else {
				 let sharedPosts = this.state.user && this.state.user.SESSION_POSTS && this.state.user.SESSION_POSTS.constructor === Array ? this.state.user.SESSION_POSTS : [];
				 owner = (item.user.id == this.state.user.id) || sharedPosts.indexOf(item.id) !== -1;
			 }
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
			<div className={(this.props.context.type === 'post' || this.props.context.type === 'edit' || this.props.context.type === 'create') ? "post" : "posts"}>{list}</div>
		);
	}
});
