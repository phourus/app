"use strict";
let React = require('react');
let Router = require('react-router');
let { History } = Router;
let numeral = require('numeral');

let Influence = require('../../influence');
let Popularity = require('../../popularity');
let Thumbs = require('./thumbs');

let thousands = "0,0";
let en = numeral.language('en');

module.exports = React.createClass({
	mixins: [History],
	getDefaultProps: function () {
		return {
			context: {},
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
				{this.props.context.type === 'post' ? <Thumbs post={this.props.post} /> : false}
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
		//this.context.router.transitionTo('post', {id: this.props.post.id});
	}
});
