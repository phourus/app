import React from 'react'

import TutorialActions from '../../actions/tutorial'
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
		TutorialActions.ready(true)
	}

	render() {
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
		)
	}
}
