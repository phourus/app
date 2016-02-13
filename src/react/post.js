"use strict";
let React = require('react');
let Router = require('react-router');
let { Link, History } = Router;

let Actions = require('../actions/post');
let Store = require('../stores/post');

let TutorialActions = require('../actions/tutorial');

let ActionsView = require('./post/actions');
let Comments = require('./post/comments');
let Content = require('./post/content');
let Details = require('./post/details');
let Links = require('./post/links');
let Poll = require('./post/poll');
let Privacy = require('./post/privacy');
let Profile = require('./profile');
let Share = require('./post/share');
let Stats = require('./post/stats');
let Tags = require('./post/tags');
let Thumbs = require('./post/thumbs');
let Title = require('./post/title');
let Type = require('./post/type');

let Drag = require('./post/drag');

let Post = React.createClass({
	mixins: [History],
	contextTypes: {
		session: React.PropTypes.object,
		route: React.PropTypes.object
	},
	getInitialState: function () {
		return {
			scroll: false,
			confirmTrash: false,
			owner: false,
			location: {},
			saving: false,
			post: {
				id: 0
			},
			user: {
				id: 0
			},
			privacy: false
		}
	},
	componentDidUpdate: function () {
		let type = this.context.route.type;
		if ((type === 'post' || type === 'edit') && this.props.scroll === false) {
			let element = this.getDOMNode();
			let y = element.offsetTop - element.scrollTop + element.clientTop - 80;
			window.scrollTo(0, y);
		}
	},
	componentDidMount: function () {
		this.unsubscribe = Store.listen((data) => {
			if (data.hasOwnProperty('saving')) {
				if (data.saving === false) {
					this.history.pushState(null, "/me");
				}
				this.setState({saving: data.saving, types: false});
			}
			if (data.add === true) {
				this.history.pushState(null, `/${data.user.username}/${data.post.slug}/edit`);
			}
			if (data.post) {
				document.title = data.post.title;
				document.description = data.post.content.slice(0, 120);
				this.setState({post: data.post});
			}
			if (data.deleted) {
				this.history.pushState(null, "/me");
			}
			if (data.changes) {
				let current = this.state.post;
				Object.keys(data.changes).forEach((key) => {
					current[key] = data.changes[key];
				});
				this.setState({post: current});
			}
		});
		this._context(this.context.route);
	},
	componentWillUnmount: function () {
		this.unsubscribe();
	},
	componentWillReceiveProps: function (nextProps, nextContext) {
		if (nextContext.route) {
			this._context(nextContext.route);
		}
	},
	render: function () {
		let type = this.context.route.type;
		let owner = this._owner();
		return (
			<div className="post">
				{type === 'create' ? <Create {...this.state} owner={owner} /> : false}
				{type === 'edit' ? <Edit {...this.state} owner={owner} /> : false}
				{type === 'post' ? <Single {...this.state} owner={owner} /> : false}
			</div>
		);
	},
	_context: function (route) {
		let params = route.params;
		let id = route.id;
		let type = route.type;
		if (type === 'edit' || type === 'post') {
			Actions.single(id);
		}
		if (type === 'create') {
			Actions.single('create');
		}
	},
	_owner: function () {
		let session = this.context.session;
		let user = session.user;
		let post = this.state.post;
		if (!session.authenticated || !user.id) {
			return false;
		}
		let sharedPosts = user && user.SESSION_POSTS && user.SESSION_POSTS.constructor === Array ? user.SESSION_POSTS : [];
		return (post.user && post.user.id == user.id) || sharedPosts.indexOf(post.id) !== -1;
	}
});

let Create = React.createClass({
	contextTypes: {
		session: React.PropTypes.object
	},
	componentDidUpdate: function () {
		TutorialActions.ready(true);
	},
	render: function () {
		let session = this.context.session;

		// 401
		if (!session.authenticated) {
			return (<div className="create 401">
				<h2>You need to login first to create posts</h2>
				<p>Please log in or create an account if you'd like create a post.</p>
			</div>);
		}

		return (
			<div className="create">
				<div className="toolbar"></div>
				<ActionsView post={this.props.post} owner={this.props.owner} />
				<Type post={this.props.post} owner={this.props.owner} />
				<Title post={this.props.post} owner={this.props.owner} />
				<Content post={this.props.post} owner={this.props.owner} />
			</div>
		);
	}
});

let Edit = React.createClass({
	contextTypes: {
		session: React.PropTypes.object
	},
	componentDidUpdate: function () {
		if (this.props.owner) {
			TutorialActions.ready(true);
		}
	},
	render: function () {
		let session = this.context.session;

		// 401
		if (!session.authenticated) {
			return (<div className="edit 401">
				<h2>You need to login first to edit posts</h2>
				<p>If you are the author or collaborator for this post, please make sure you are logged in.</p>
			</div>);
		}

		// 403
		if (!this.props.owner) {
			return (<div className="edit 403">
				<h2>You are not authorized to edit this post</h2>
				<p>You must be the author or a collaborator to edit this post.</p>
			</div>);
		}

		return (
			<div className="edit">
				<div className="toolbar"></div>
				<ActionsView post={this.props.post} owner={this.props.owner} />
				<Type post={this.props.post} owner={this.props.owner} />
				<Title post={this.props.post} owner={this.props.owner} />
				<Content post={this.props.post} owner={this.props.owner} />
				<Privacy post={this.props.post} owner={this.props.owner} />
				<Tags post={this.props.post} owner={this.props.owner} tag={this.props.tag} />
				<Links post={this.props.post} owner={this.props.owner} />
			</div>
		);
	}
});

let Single = React.createClass({
	componentDidMount: function () {
		TutorialActions.ready(true);
	},
	render: function () {
		return (
			<div className="single">
				<ActionsView post={this.props.post} owner={this.props.owner} />
				<Type post={this.props.post} owner={this.props.owner} />
				<Privacy post={this.props.post} owner={this.props.owner} />
				<Title post={this.props.post} owner={this.props.owner} />
				<Tags post={this.props.post} owner={this.props.owner} tag={this.props.tag} />
				<Content post={this.props.post} owner={this.props.owner} />
				<Share post={this.props.post} />
				<Profile postMode={true} />
				<Stats post={this.props.post} />
				<Links post={this.props.post} owner={this.props.owner} />
				<Comments post={this.props.post} />
			</div>
		);
	}
});

Post.Item = React.createClass({
	render: function () {
		return (
			<div className="postItem" id={`post${this.props.post.id}`}>
				<Drag id={this.props.post.id} />
				<ActionsView post={this.props.post} owner={this.props.owner} />
				<Type post={this.props.post} owner={this.props.owner} />
				<Privacy post={this.props.post} owner={this.props.owner} />
				<Title post={this.props.post} owner={this.props.owner} />
				<Details post={this.props.post} owner={this.props.owner} user={this.props.user} location={this.props.location} />
				<Tags post={this.props.post} owner={this.props.owner} tag={this.props.tag} />
				<Stats post={this.props.post} />
			</div>
		);
	}
});

module.exports = Post;
