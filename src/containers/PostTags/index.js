import React from 'react';

import Actions from '../../actions/post/tags';
import Store from '../../stores/post/tags';
import StreamActions from '../../actions/stream';

let Tags = React.createClass({
	contextTypes: {
		route: React.PropTypes.object
	},
	getDefaultProps: function () {
		return {
			post: {
				id: null,
				tags: []
			},
			owner: false
		};
	},
	getInitialState: function () {
		return {
			post: {
				id: null,
				tags: []
			},
			tag: ""
		}
	},
	componentDidMount: function () {
		this.unsubscribe = Store.listen((data) => {
			let tags = this.state.post.tags;
			if (data.added) {
				tags.push(data.added);
				this.setState({post: {tags: tags}});
			}
			if (data.removed) {
				tags = tags.filter((item) => {
					if (parseInt(item.id) !== parseInt(data.removed)) {
						return true;
					}
					return false;
				});
				this.setState({post: {tags: tags}});
			}
		});
	},
	componentWillUnmount: function () {
		this.unsubscribe();
	},
	componentWillReceiveProps: function (data) {
		if (data.post) {
			this.setState(data);
		}
	},
	render: function () {
		let tags = this.state.post.tags || [];
		let route = this.context.route;
		let type = route.type;
		return (
			<div className="tags">
				{type === 'edit' && this.props.owner ? <h2>Edit Tags</h2> : false}
				<i className="fa fa-tag" />
				{tags.map((item, index) => {
					return (
						<span className="tag" key={index}>
							<a id={item.tag} href="javascript:void(0)" onClick={this._tag}>{item.tag}</a>
							{type === 'edit' && this.props.owner
								? <a href="javascript:void(0)" id={item.id} className="remove" onClick={this._remove}>x</a>
							: false}
						</span>
					);
				})}
				{type === 'edit' && this.props.owner
					? <div className="tagField">
					<input placeholder="add tags here" onChange={this._change} type="text" value={this.state.tag} />
					<button ref="add" onClick={this._add}>Add Tag</button>
				</div>
				: false}
			</div>
		);
	},
	_change: function (e) {
		let value = e.currentTarget.value;
		this.setState({tag: value});
	},
	_add: function () {
		let model = {};
		if (this.state.tag.length > 1 && this.props.post.id) {
			model.tag = this.state.tag;
			model.postId = this.props.post.id;
			Actions.add(model);
			this.setState({tag: ""});
		}
	},
	_remove: function (e) {
		let id = e.currentTarget.id;
		Actions.remove(id);
	},
	_tag: function (e) {
		let id = e.currentTarget.id;
		StreamActions.search(id);
	}
});

module.exports = Tags;
