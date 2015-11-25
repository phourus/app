"use strict";
let React = require('react');
let Router = require('react-router');
let { Link, State, Navigation } = Router;

let Actions = require('../actions/post');
let Store = require('../stores/post');

let ActionsView = require('./post/actions');
let Comments = require('./post/comments');
let Content = require('./post/content');
let Details = require('./post/details');
let Links = require('./post/links');
let Poll = require('./post/poll');
let Privacy = require('./post/privacy');
let Share = require('./post/share');
let Stats = require('./post/stats');
let Tags = require('./post/tags');
let Thumbs = require('./post/thumbs');
let Title = require('./post/title');
let Type = require('./post/type');
let Types = require('./post/types');

let Post = React.createClass({
	mixins: [State, Navigation],
	getDefaultProps: function () {
		return {
			context: {}
		};
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
		if ((this.props.context.type === 'post' || this.props.context.type === 'edit') && this.props.scroll === false) {
			let element = this.getDOMNode();
			let y = element.offsetTop - element.scrollTop + element.clientTop - 80;
			window.scrollTo(0, y);
		}
	},
	componentDidMount: function () {
		this.unsubscribe = Store.listen((data) => {
			if (data.hasOwnProperty('saving')) {
				if (data.saving === false) {
					this.context.router.transitionTo("myPosts");
				}
				this.setState({saving: data.saving, types: false});
			}
			if (data.add === true) {
				this.context.router.transitionTo("edit", {id: data.post.id});
			}
			if (data.post) {
				document.title = data.post.title;
				document.description = data.post.content.slice(0, 120);
				this.setState({post: data.post});
			}
			if (data.deleted) {
				this.context.router.transitionTo("myPosts");
			}
			if (data.changes) {
				let current = this.state.post;
				Object.keys(data.changes).forEach((key) => {
					current[key] = data.changes[key];
				});
				this.setState({post: current});
			}
		});
		this._context(this.props);
	},
	componentWillUnmount: function () {
		this.unsubscribe();
	},
	componentWillReceiveProps: function (data) {
		this._context(data);
	},
	render: function () {
		let mode = this.props.context.type;
		return (
			<div className="post">
				{mode === 'create' ? <Create {...this.state} /> : false}
				{mode === 'edit' ? <Edit {...this.state} /> : false}
				{mode === 'post' ? <Single {...this.state} /> : false}
			</div>
		);
	},
	_context: function (data) {
		let id = this.getParams().id || null;
		if (this.props.context.type === 'edit' || this.props.context.type === 'post') {
			Actions.single(id);
			Actions.Comments.collection({postId: id});
		}
		if (this.props.context.type === 'create') {
			Actions.change('title', 'New Post');
			Actions.change('content', 'New Content');
		}
		this.setState(data);
	},
});

let Create = React.createClass({
	render: function () {
		return (
			<div className="create postItem">
				<ActionsView post={this.props.post} context={this.props.context} owner={this.props.owner} />
				<Type post={this.props.post} context={this.props.context} owner={this.props.owner} />
				<Title post={this.props.post} context={this.props.context} owner={this.props.owner} />
				<Content post={this.props.post} context={this.props.context} owner={this.props.owner} />
			</div>
		);
	}
});

let Edit = React.createClass({
	render: function () {
		return (
			<div className="edit postItem">
				<ActionsView post={this.props.post} context={this.props.context} owner={this.props.owner} />
				<Type post={this.props.post} context={this.props.context} owner={this.props.owner} />
				<Privacy post={this.props.post} context={this.props.context} owner={this.props.owner} />
				<Title post={this.props.post} context={this.props.context} owner={this.props.owner} />
				<Content post={this.props.post} context={this.props.context} owner={this.props.owner} />
				<Tags post={this.props.post} context={this.props.context} owner={this.props.owner} tag={this.props.tag} />
				<Links post={this.props.post} context={this.props.context} owner={this.props.owner} />
			</div>
		);
	}
});

let Single = React.createClass({
	render: function () {
		return (
			<div className="single postItem">
				<ActionsView post={this.props.post} context={this.props.context} owner={this.props.owner} />
				<Type post={this.props.post} context={this.props.context} owner={this.props.owner} />
				<Title post={this.props.post} context={this.props.context} owner={this.props.owner} />
				<Tags post={this.props.post} context={this.props.context} owner={this.props.owner} tag={this.props.tag} />
				<Content post={this.props.post} context={this.props.context} owner={this.props.owner} />
				<Stats post={this.props.post} context={this.props.context} />
				<Share post={this.props.post} />
				<Links post={this.props.post} context={this.props.context} owner={this.props.owner} />
				<Comments post={this.props.post} />
			</div>
		);
	}
});

Post.Item = React.createClass({
	render: function () {
		return (
			<div className="postItem">
				<ActionsView post={this.props.post} context={this.props.context} owner={this.props.owner} />
				<Type post={this.props.post} context={this.props.context} owner={this.props.owner} />
				<Title post={this.props.post} context={this.props.context} owner={this.props.owner} />
				<Details post={this.props.post} context={this.props.context} owner={this.props.owner} user={this.props.user} location={this.props.location} />
				<Tags post={this.props.post} context={this.props.context} owner={this.props.owner} tag={this.props.tag} />
				<Stats post={this.props.post} context={this.props.context} />
			</div>
		);
	}
});

module.exports = Post;
