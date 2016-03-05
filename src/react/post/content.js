"use strict";
let React = require('react');
let RTE = require('react-quill');
let ReactMarkdown = require('react-markdown');

let Actions = require('../../actions/post');

module.exports = React.createClass({
	contextTypes: {
		route: React.PropTypes.object
	},
	getDefaultProps: function () {
		return {
			post: {},
			owner: false
		}
	},
	render: function () {
		let route = this.context.route;
		let type = route.type;
		if (!this.props.post.rich) {
			return type === 'edit' && this.props.owner || type === 'create'
			? <textarea onChange={this._content} value={this.props.post.content} />
			: <div className="content"><ReactMarkdown source={this.props.post.content} /></div>;
		}
		return type === 'edit' && this.props.owner || type === 'create'
		? <TextEditor post={this.props.post} />
		: <div className="content" dangerouslySetInnerHTML={{__html: this.props.post.content}}></div>;
	},
	_content: function (e) {
		Actions.change('content', e.currentTarget.value);
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
