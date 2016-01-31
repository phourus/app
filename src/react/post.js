"use strict";
let React = require('react');
let Router = require('react-router');
let { Link, History } = Router;

let Actions = require('../actions/post');
let Store = require('../stores/post');

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
		let type = this.props._route;
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
					this.history.pushState(null, "/stream/me");
				}
				this.setState({saving: data.saving, types: false});
			}
			if (data.add === true) {
				this.history.pushState(null, `/edit/${data.post.id}`);
			}
			if (data.post) {
				document.title = data.post.title;
				document.description = data.post.content.slice(0, 120);
				this.setState({post: data.post});
			}
			if (data.deleted) {
				this.history.pushState(null, "/stream/me");
			}
			if (data.changes) {
				let current = this.state.post;
				Object.keys(data.changes).forEach((key) => {
					current[key] = data.changes[key];
				});
				this.setState({post: current});
			}
		});
		this._context();
	},
	componentWillUnmount: function () {
		this.unsubscribe();
	},
	componentWillReceiveProps: function (data) {
		this._context();
	},
	render: function () {
		let mode = this.props._route.type;
		return (
			<div className="post">
				{mode === 'create' ? <Create {...this.state} _route={this.props._route} owner={this.props.owner} /> : false}
				{mode === 'edit' ? <Edit {...this.state} _route={this.props._route} owner={this.props.owner} /> : false}
				{mode === 'post' ? <Single {...this.state} _route={this.props._route} owner={this.props.owner} /> : false}
			</div>
		);
	},
	_context: function () {
		let route = this.props._route;
		let params = route.params;
		let id = route.id;
		let type = route.type;
		if (type === 'edit' || type === 'post') {
			Actions.single(id);
		}
		if (type === 'create') {
			Actions.change('title', 'New Post');
			Actions.change('content', 'New Content');
		}
	},
});

let Create = React.createClass({
	render: function () {
		return (
			<div className="create postItem">
				<div className="toolbar"></div>
				<ActionsView post={this.props.post} _route={this.props._route} owner={this.props.owner} />
				<Type post={this.props.post} _route={this.props._route} owner={this.props.owner} />
				<Title post={this.props.post} _route={this.props._route} owner={this.props.owner} />
				<Content post={this.props.post} _route={this.props._route} owner={this.props.owner} />
			</div>
		);
	}
});

let Edit = React.createClass({
	render: function () {
		return (
			<div className="edit postItem">
				<div className="toolbar"></div>
				<ActionsView post={this.props.post} _route={this.props._route} owner={this.props.owner} />
				<Type post={this.props.post} _route={this.props._route} owner={this.props.owner} />
				<Title post={this.props.post} _route={this.props._route} owner={this.props.owner} />
				<Content post={this.props.post} _route={this.props._route} owner={this.props.owner} />
				<Privacy post={this.props.post} _route={this.props._route} owner={this.props.owner} />
				<Tags post={this.props.post} _route={this.props._route} owner={this.props.owner} tag={this.props.tag} />
				<Links post={this.props.post} _route={this.props._route} owner={this.props.owner} />
			</div>
		);
	}
});

let Single = React.createClass({
	render: function () {
		return (
			<div className="single postItem">
				<ActionsView post={this.props.post} _route={this.props._route} owner={this.props.owner} />
				<Type post={this.props.post} _route={this.props._route} owner={this.props.owner} />
				<Privacy post={this.props.post} _route={this.props._route} owner={this.props.owner} />
				<Title post={this.props.post} _route={this.props._route} owner={this.props.owner} />
				<Tags post={this.props.post} _route={this.props._route} owner={this.props.owner} tag={this.props.tag} />
				<Content post={this.props.post} _route={this.props._route} owner={this.props.owner} />
				<Share post={this.props.post} />
				<Profile _route={this.props._route} postMode={true} />
				<Stats post={this.props.post} _route={this.props._route} />
				<Links post={this.props.post} _route={this.props._route} owner={this.props.owner} />
				<Comments post={this.props.post} />
			</div>
		);
	}
});

Post.Item = React.createClass({
	render: function () {
		return (
			<div className="postItem">
				<Drag id={this.props.post.id} />
				<ActionsView post={this.props.post} _route={this.props._route} owner={this.props.owner} />
				<Type post={this.props.post} _route={this.props._route} owner={this.props.owner} />
				<Privacy post={this.props.post} _route={this.props._route} owner={this.props.owner} />
				<Title post={this.props.post} _route={this.props._route} owner={this.props.owner} />
				<Details post={this.props.post} _route={this.props._route} owner={this.props.owner} user={this.props.user} location={this.props.location} />
				<Tags post={this.props.post} _route={this.props._route} owner={this.props.owner} tag={this.props.tag} />
				<Stats post={this.props.post} _route={this.props._route} />
			</div>
		);
	}
});

module.exports = Post;
