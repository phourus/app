import React from 'react'

import Profile from '../shared/profile'

import ActionsView from './components/actions'
import Comments from './components/comments'
import Content from './components/content'
import Links from './components/links'
import Privacy from './components/privacy'
import Share from './components/share'
import Stats from './components/stats'
import Tags from './components/tags'
import Title from './components/title'
import Type from './components/type'

export default class Single extends React.Component {

	componentDidMount() {
		//TutorialActions.ready(true)
	}

	render() {
		return (
			<div className="single">
				<ActionsView {...this.props} />
				<Type {...this.props} />
				<Privacy {...this.props} />
				<Title {...this.props} />
				<Tags {...this.props} />
				<Content {...this.props} />
				<Share {...this.props}  />
				<Profile postMode={true} />
				<Stats {...this.props} />
				<Links {...this.props} />
				<Comments {...this.props} />
			</div>
		)
	}
}
