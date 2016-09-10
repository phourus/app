import React from 'react'
import Router from 'react-router'
import numeral from 'numeral'

import Influence from './influence'
import Popularity from '../../../lib/popularity'
import Thumbs from './thumbs'

const thousands = "0,0"
const en = numeral.language('en')

export default class Stats extends React.Component {

	componentDidMount() {
		this._popularity(this.props)
	}

	componentWillReceiveProps(data) {
		this._popularity(data)
	}

	render() {
		return (
			<div className="interact" onClick={this._single.bind(this)}>
				{this.props.url.type === 'post' ? <Thumbs post={this.props.post} /> : false}
				<Influence influence={this.props.post.influence}/>
				<div className="popularity">
					<div>
						<canvas id={`popularity${this.props.post.id}`}></canvas>
						<div>Popularity</div>
					</div>
				</div>
				<div className="stats">
					<div><strong>{numeral(this.props.post.totalViews).format('0a')}</strong><br /><i className="fa fa-eye" /></div>
					<div><strong>{numeral(this.props.post.totalComments).format('0a')}</strong><br /><i className="fa fa-comment" /></div>
					<div><strong>{numeral(this.props.post.totalThumbs).format('0a')}</strong><br /><i className="fa fa-thumbs-up" /></div>
				</div>
			</div>
		)
	}

	_popularity(data) {
		if (data.post && data.post.id > 0) {
			// when _popularity is called by componentWillReceiveProps, element
			// has not yet been rendered.
			setTimeout(() => {
				let element = document.getElementById(`popularity${data.post.id}`)
				let popularity = new Popularity(element, data.post.popularity || 100)
			}, 1)
		}
	}

	_single() {
		let username = ''
		let user = this.props.post.user
		if (user && user.username) {
			username = user.username
		}
		this.props.history.pushState(null, `/${username}/${this.props.post.slug}`)
	}
}
