import React from 'react'

import TutorialActions from '../../actions/tutorial'

import ActionsView from './components/actions'
import Content from './components/content'
import Title from './components/title'
import Type from './components/type'

export default class Create extends React.Component {

	componentDidUpdate() {
		TutorialActions.ready(true)
	}

	render() {
		const session = this.props.session

		// 401
		if (!session.authenticated) {
			return (<div className="create 401">
				<h2>You need to login first to create posts</h2>
				<p>Please log in or create an account if you would like to create a post.</p>
			</div>)
		}

		return (
			<div className="create">
				<div className="toolbar"></div>
				<ActionsView route={this.props.route} post={this.props.post} owner={this.props.owner} />
				<Type post={this.props.post} owner={this.props.owner} />
				<Title post={this.props.post} owner={this.props.owner} />
				<Content post={this.props.post} owner={this.props.owner} />
			</div>
		)
	}
}
