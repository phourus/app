import React from 'react'

import ActionsView from './components/actions'
import Content from './components/content'
import Links from './components/links'
import Privacy from './components/privacy'
import Tags from './components/tags'
import Title from './components/title'
import Type from './components/type'

export default class Edit extends React.Component {

	componentDidUpdate() {
		if (this.props.owner) {
			//TutorialActions.ready(true)
		}
	}

	render() {
		const session = this.props.session

		// 401
		if (!session.authenticated) {
			return (<div className="edit 401">
				<h2>You need to login first to edit posts</h2>
				<p>If you are the author or collaborator for this post, please make sure you are logged in.</p>
			</div>)
		}

		// 403
		if (!this.props.owner) {
			return (<div className="edit 403">
				<h2>You are not authorized to edit this post</h2>
				<p>You must be the author or a collaborator to edit this post.</p>
			</div>)
		}

		return (
			<div className="edit">
				<div className="toolbar"></div>
				<ActionsView {...this.props} />
				<Type {...this.props} />
				<Title {...this.props} />
				<Content {...this.props} />
				<Privacy {...this.props} />
				<Tags {...this.props} />
				<Links {...this.props} />
			</div>
		)
	}
}
