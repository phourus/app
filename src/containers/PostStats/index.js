import React from 'react';
import Router, { History } from 'react-router';
import numeral from 'numeral';

import Influence from '../../influence';
import Popularity from '../../popularity';
import Thumbs from '../PostThumbs';

let thousands = "0,0";
let en = numeral.language('en');

module.exports = React.createClass({
	mixins: [History],
	contextTypes: {
		route: React.PropTypes.object
	},
	getDefaultProps: function () {
		return {
			post: {}
		};
	},
	componentDidMount: function () {
		this._popularity(this.props);
	},
	componentWillReceiveProps: function (data) {
		this._popularity(data);
	},
	render: function () {
		return (
			<div className="interact" onClick={this._single}>
				{this.context.route.type === 'post' ? <Thumbs post={this.props.post} /> : false}
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
		);
	},
	_popularity: function (data) {
		if (data.post && data.post.id > 0) {
			// when _popularity is called by componentWillReceiveProps, element
			// has not yet been rendered.
			setTimeout(() => {
				let element = document.getElementById(`popularity${data.post.id}`);
				let popularity = new Popularity(element, data.post.popularity || 100);
			}, 1);
		}
	},
	_single: function () {
		let username = '';
		let user = this.props.post.user;
		if (user && user.username) {
			username = user.username;
		}
		this.history.pushState(null, `/${username}/${this.props.post.slug}`);
	}
});
