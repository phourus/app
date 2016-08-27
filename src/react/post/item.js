import React from 'react'

import Drag from './components/drag'
import ActionsView from './components/actions'
import Type from './components/type'
import Privacy from './components/privacy'
import Title from './components/title'
import Details from './components/details'
import Tags from './components/tags'
import Stats from './components/stats'

export default (props) => {
	return (
		<div className="postItem" id={`post${props.post.id}`}>
			<Drag id={props.post.id} />
			<ActionsView post={props.post} owner={props.owner} />
			<Type post={props.post} owner={props.owner} />
			<Privacy post={props.post} owner={props.owner} />
			<Title post={props.post} owner={props.owner} />
			<Details post={props.post} owner={props.owner} user={props.user} location={props.location} />
			<Tags post={props.post} owner={props.owner} tag={props.tag} />
			<Stats post={props.post} />
		</div>
	)
}
