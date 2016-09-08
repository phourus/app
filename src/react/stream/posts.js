import React from 'react'
import { Link } from 'react-router'

import Loader from '../shared/loader'
import Post from '../post/item'

export default class Posts extends React.Component {
	componentDidUpdate() {
		let posts = this.props.posts
		if (posts && posts.length > 1) {
			//TutorialActions.ready(true)
		}
	}

	render() {
		let route = this.props.route
		if (this.props.posts === null) {
			return <Loader />
		}
		if (this.props.posts.length < 1) {
			return <h2 style={{textAlign: 'center'}}>No posts found based on your criteria</h2>
		}
		return (
			<div className={this.props.sidebarVisible ? "posts sidebar" : "posts"}>
				{this.props.posts.map((item, i) => {
					 let owner = this._owner(item);
					 let location = {};
					 if (item.user.locations && item.user.locations.length > 0) {
							 location = item.user.locations[0];
					 }
					 return <Post key={item.id} post={item} user={item.user} owner={owner} location={location} scroll={this.props.scroll} />
				})}
			</div>
		)
	}

	_owner(post) {
		let session = this.props.session
		let user = session.user
		if (!session.authenticated || !user.id) {
			return false
		}
		let sharedPosts = user && user.SESSION_POSTS && user.SESSION_POSTS.constructor === Array ? user.SESSION_POSTS : []
		return (post.user && post.user.id == user.id) || sharedPosts.indexOf(post.id) !== -1
	}
}
