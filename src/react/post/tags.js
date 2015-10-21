"use strict";
let React = require('react');

let Actions = require('../../actions/post').Tags;

let Tags = React.createClass({
	getDefaultProps: function () {
		return {
			post: {
				id: null,
				tags: []
			}
		}
	},
	getInitialState: function () {
		return {
			tag: ""
		}
	},
	render: function () {
    let tags = this.props.post.tags || [];
		return (
      <div className="tags">
				{this.props.context.type === 'edit' && this.props.owner ? <h2>Edit Tags</h2> : false}
        <i className="fa fa-tag" />
        {tags.map((item, index) => {
          return (
            <span className="tag" key={index}>
							<a id={item.tag} href="javascript:void(0)" onClick={this._tag}>{item.tag}</a>
							{this.props.context.type === 'edit' && this.props.owner
								? <a href="javascript:void(0)" id={item.id} className="remove" onClick={this._remove}>x</a>
								: false
							}
						</span>
          );
        })}
				{this.props.context.type === 'edit' && this.props.owner
					? <div className="tagField">
					<input placeholder="add tags here" onChange={this._change} type="text" value={this.state.tag} />
					<button ref="add" onClick={this._add}>Add Tag</button>
				</div>
					: false
				}
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
		this.props.tag(id);
	}
});

module.exports = Tags;
