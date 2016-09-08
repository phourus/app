import React from 'react'
import Router, { Link } from 'react-router'
import moment from 'moment'

import util from '../../../lib/util'

import Pic from '../../shared/pic'
import Poll from './poll'

export default (props) => {

	let context = 'user'
	let profileName = "Phourus User"
	let org = {}
	let link = ''
	if (props.post.user && props.post.user.id && props.post.user.id != 0) {
		let user = props.post.user
		if (user.username) {
			profileName = user.username
		}
		if (user.first && user.last) {
			profileName = user.first + " " + user.last
		}
	}
	if (props.post.org && props.post.org.id && props.post.org.id != 0) {
		org = props.post.org
		profileName = org.shortname
		link = util.createOrgLink(profileName)
		context = 'org'
	}
	return (
		<div className="details">
			<Pic id={context === 'org' ? org.shortname : props.user.username} img={context === 'org' ? org.img : props.user.img} type={context} name={profileName} />
			<div className="basic">
				{context === 'org'
					? <div><a href={link}>{org.name}</a><br /><br /></div>
					: false
				}
				<span>By <Link to={`/${props.user.username}`}>{props.user.first} {props.user.last} </Link></span>
				&bull;
				<span className="location"> {props.location.city}, {props.location.state}</span>
				<div className="created">{moment(props.post.createdAt).fromNow()}</div>
			</div>
			<Extra post={props.post} />
		</div>
	)
}

const Extra = (props) => {
	return <span></span>
	let { type } = props.post

	if (type === 'poll') {
		return <Poll {...props} />
	} else if (type === 'event') {
		return (<div className="extra event">
			<i className="fa fa-calendar" />
			{props.post.when && moment(props.post.when).format() !== 'Invalid date' ? <div className="when">{moment(props.post.when).format('MMMM Do @ h:mm a')}</div> : false}
			{props.post.location ? <div className="location">{props.post.location}</div> : false}
		</div>)
	} else if (props.url.type !== 'post' && props.url.type !== 'edit') {
		let excerpt = ""
		if (props.post && props.post.content) {
			excerpt = props.post.content.replace(/(<([^>]+)>)/ig, "")
		}
		return <div className="extra excerpt"><div>{excerpt}</div></div>
	} else {
		return <span></span>
	}
}
