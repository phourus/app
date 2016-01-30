"use strict";
let React = require('react');
let RTE = require('react-quill');

let Actions = require('../../actions/post');

module.exports = React.createClass({
	getDefaultProps: function () {
		return {
			post: {},
			owner: false
		}
	},
	render: function () {
		let route = this.props._route;
		let type = route.type;
		return type === 'edit' && this.props.owner || type === 'create'
		? <TextEditor post={this.props.post} />
		: <div className="content" dangerouslySetInnerHTML={{__html: this.props.post.content}}></div>;
	}
});

let TextEditor = React.createClass({
	render: function () {
		if (!this.props.post.hasOwnProperty('content')) {
			return false;
		}
		let content = this.props.post.content || "Enter content here";
		return (
			<div className="rte">
				<RTE ref="content" value={content} onChange={this._content} theme="snow" />
			</div>
		);
	},
	_content: function (value) {
		Actions.change('content', value);
	}
});
