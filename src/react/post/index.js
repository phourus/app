import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import * as actions from './redux/actions'
import Loader from '../shared/loader'

import Single from './single'
import Create from './create'
import Edit from './edit'

import styles from './styles.less'

class Post extends React.Component {

	componentDidUpdate() {
		let type = this.props.url.type
		if ((type === 'post' || type === 'edit') && this.props.scroll === false) {
			// let element = this.getDOMNode()
			// let y = element.offsetTop - element.scrollTop + element.clientTop - 80
			// window.scrollTo(0, y)
		}
	}

	componentDidMount() {
		// if (!this.state.ready) {
		// 	this.setState({ready: true})
		// }
		// if (data.hasOwnProperty('saving')) {
		// 	if (data.saving === false) {
		// 		this.props.history.push("/me")
		// 	}
		// 	//this.setState({saving: data.saving, types: false})
		// }
		// if (data.add === true) {
		// 	let username = 'me'
		// 	let session = this.props.session;
		// 	if (session.user && session.user.username) {
		// 		username = session.user.username
		// 	}
		// 	this.props.history.push(`/${username}/${data.post.slug}/edit`)
		// }
		// if (data.post) {
		// 	document.title = data.post.title
		// 	document.description = data.post.content.slice(0, 120)
		// 	//this.setState({post: data.post})
		// }
		// if (data.deleted) {
		// 	this.props.history.push("/me")
		// }
		// if (data.changes) {
		// 	let current = this.props.post
		// 	Object.keys(data.changes).forEach((key) => {
		// 		current[key] = data.changes[key]
		// 	});
		// 	//this.setState({post: current})
		// }
		// this._context(this.props.url)
	}

	componentWillMount() {
		this._context(this.props.url)
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.url) {
			this._context(nextProps.url)
		}
	}

	render() {
		const { type } = this.props.url
		const { owner } = this.props
		if (!this.props.ready) {
			return (
				<div className="post"><Loader /></div>
			)
		}
		return (
			<div className="post">
				{type === 'create' ? <Create {...this.props} owner={owner} /> : false}
				{type === 'edit' ? <Edit {...this.props} owner={owner} /> : false}
				{type === 'post' ? <Single {...this.props} owner={owner} /> : false}
			</div>
		)
	}

	_context(url) {
		let params = url.params
		let id = url.id
		let type = url.type
		if (type === 'edit' || type === 'post') {
			this.props.dispatch(this.props.actions.single(id))
		}
		if (type === 'create') {
			this.props.dispatch(this.props.actions.single('create'))
		}
	}
}

function mapStateToProps(state) {
	return Object.assign({
		dispatch: state.dispatch,
		actions,
		session: {
			authenticated: true,
			user: {
				id: 4
			}
		},
		owner: true,
		url: {
			id: 'nobhuwe',
			type: 'post'
		}
	}, state.post)
}

export default connect(mapStateToProps)(Post)
