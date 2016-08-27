import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import Actions from '../../actions/post'
import Store from '../../stores/post'

import TutorialActions from '../../actions/tutorial'
import Profile from '../shared/profile'
import Loader from '../shared/loader'

import Single from './single'
import Create from './create'
import Edit from './edit'

import styles from './styles.less'

class Post extends React.Component {

	constructor() {
		super()
		this.state = {
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
	}

	componentDidUpdate() {
		let type = this.props.route.type
		if ((type === 'post' || type === 'edit') && this.props.scroll === false) {
			let element = this.getDOMNode()
			let y = element.offsetTop - element.scrollTop + element.clientTop - 80
			window.scrollTo(0, y)
		}
	}

	componentDidMount() {
		this.unsubscribe = Store.listen((data) => {
			if (!this.state.ready) {
				this.setState({ready: true})
			}
			if (data.hasOwnProperty('saving')) {
				if (data.saving === false) {
					this.history.pushState(null, "/me")
				}
				this.setState({saving: data.saving, types: false})
			}
			if (data.add === true) {
				let username = 'me'
				let session = this.props.session;
				if (session.user && session.user.username) {
					username = session.user.username
				}
				this.history.pushState(null, `/${username}/${data.post.slug}/edit`)
			}
			if (data.post) {
				document.title = data.post.title
				document.description = data.post.content.slice(0, 120)
				this.setState({post: data.post})
			}
			if (data.deleted) {
				this.history.pushState(null, "/me")
			}
			if (data.changes) {
				let current = this.state.post
				Object.keys(data.changes).forEach((key) => {
					current[key] = data.changes[key]
				});
				this.setState({post: current})
			}
		})
		this._context(this.props.route)
	}

	componentWillUnmount() {
		this.unsubscribe()
	}

	componentWillReceiveProps(nextProps, nextContext) {
		if (nextContext.route) {
			this._context(nextContext.route)
		}
	}

	render() {
		let type = this.props.route.type
		let owner = this._owner()
		if (!this.state.ready) {
			return (
				<div className="post"><Loader /></div>
			)
		}
		return (
			<div className="post">
				{type === 'create' ? <Create {...this.state} owner={owner} /> : false}
				{type === 'edit' ? <Edit {...this.state} owner={owner} /> : false}
				{type === 'post' ? <Single {...this.state} owner={owner} /> : false}
			</div>
		);
	}

	_context(route) {
		let params = route.params
		let id = route.id
		let type = route.type
		if (type === 'edit' || type === 'post') {
			Actions.single(id)
		}
		if (type === 'create') {
			Actions.single('create')
		}
		this.setState({ready: false})
	}

	_owner() {
		let session = this.props.session
		let user = session.user
		let post = this.state.post
		if (!session.authenticated || !user.id) {
			return false
		}
		let sharedPosts = user && user.SESSION_POSTS && user.SESSION_POSTS.constructor === Array ? user.SESSION_POSTS : []
		return (post.user && post.user.id == user.id) || sharedPosts.indexOf(post.id) !== -1
	}
}

function mapStateToProps(state) {
	return {
		session: {},
		route: {}
	}
}

export default connect(mapStateToProps)(Post)
