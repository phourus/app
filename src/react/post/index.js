import React from 'react'
import { Link, History } from 'react-router'
import { connect } from 'react-redux'

import Actions from '../../actions/post'
import Store from '../../stores/post'

import TutorialActions from '../../actions/tutorial'
import Profile from '../shared/profile'
import Loader from '../shared/loader'

import ActionsView from './components/actions'
import Comments from './components/comments'
import Content from './components/content'
import Details from './components/details'
import Links from './components/links'
import Poll from './components/poll'
import Privacy from './components/privacy'
import Share from './components/share'
import Stats from './components/stats'
import Tags from './components/tags'
import Thumbs from './components/thumbs'
import Title from './components/title'
import Type from './components/type'
import Drag from './components/drag'

import styles from './styles.less'

let Post = React.createClass({
	mixins: [History],
	contextTypes: {
		session: React.PropTypes.object,
		route: React.PropTypes.object
	},
	getInitialState: function () {
		return {
			ready: false,
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
			if (!this.state.ready) {
				this.setState({ready: true});
			}
			if (data.hasOwnProperty('saving')) {
				if (data.saving === false) {
					this.history.pushState(null, "/me");
				}
				this.setState({saving: data.saving, types: false});
			}
			if (data.add === true) {
				let username = 'me';
				let session = this.context.session;
				if (session.user && session.user.username) {
					username = session.user.username;
				}
				this.history.pushState(null, `/${username}/${data.post.slug}/edit`);
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
		if (!this.state.ready) {
			return (
				<div className="post"><Loader /></div>
			);
		}
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
		this.setState({ready: false});
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
				<p>Please log in or create an account if you would like to create a post.</p>
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

function mapStateToProps(state) {
	return {}
}

module.exports = connect(mapStateToProps)(Post);
