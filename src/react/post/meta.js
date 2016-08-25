"use strict";
let React = require('react');

let Actions = require('../../actions/post');

let tax = require('../../lib/taxonomy');

let Meta = React.createClass({
	contextTypes: {
		route: React.PropTypes.object
	},
	render: function () {
		let route = this.context.route;
	  let type = this.props.post.type;
	  let classes = {};
		for (var i in Object.keys(tax)) {
			var key = Object.keys(tax)[i].slice(0, -1);
			classes[key] = key;
			if (type === key) {
				classes[key] += ' selected';
			}
		}
		let	positive = (<label>Positive:
					{route.type === 'edit' && this.props.owner
						? <input ref="positive" type="checkbox" checked={this.props.post.positive ? true : false} onChange={this._positive} />
						: <strong>{this.props.post.positive}</strong>
					}
				</label>);
		let	when = (<label>When:
					{route.type === 'edit' && this.props.owner
						? <input value={this.props.post.when} onChange={this._when} />
						: <strong>{this.props.post.when}</strong>
					}
				</label>);
		let	location = (<label>Location:
				{route.type === 'edit' && this.props.owner
					? <input value={this.props.post.location} onChange={this._location} />
					: <strong>{this.props.post.location}</strong>
				}
			</label>);
		let	poll = (<label>Poll Options:
				{route.type === 'edit' && this.props.owner
					? <input value={this.props.post.poll} onChange={this._poll} />
					: false
				}
			</label>);
		let	difficulty = (<label>Difficulty:
				{route.type === 'edit' && this.props.owner
					? <select ref="difficulty" value={this.props.post.difficulty} onChange={this._difficulty}>
						<option value="easy">Easy</option>
						<option value="medium">Medium</option>
						<option value="hard">Hard</option>
					</select>
					: <strong>{this.props.post.difficulty}</strong>
				}
			</label>);
		let	scope = (<label>Scope:
				{route.type === 'edit' && this.props.owner
					? <select ref="scope" value={this.props.post.scope} onChange={this._scope}>
							<option value="local">Local</option>
							<option value="county">County</option>
							<option value="state">State</option>
							<option value="national">National</option>
							<option value="international">International</option>
						</select>
					: <strong>{this.props.post.scope}</strong>
				}
			</label>);
		let	zip = (<label>Zip:
				{route.type === 'edit' && this.props.owner
					? <input ref="zip" value={this.props.post.zip} onChange={this._zip} />
					: <strong>{this.props.post.zip}</strong>
				}
			</label>);
		let	author = (<label>Source/Author:
				{route.type === 'edit' && this.props.owner
					? <input ref="author" value={this.props.post.author} onChange={this._author} />
					: <strong>{this.props.post.author}</strong>
				}
			</label>);
		let fields = {
			blog: [],
			event: [when, location],
			subject: [],
			question: [],
			debate: [],
			poll: [poll],
			quote: [author],
			belief: []
		};
		let data = fields[type] || [];
		return (
			<div>
				{data.map((item) => {
					return item;
				})}
			</div>
		);
	},
	_positive: function (e) {
		var value = e.currentTarget.checked;
		Actions.change('positive', value);
	},
	_when: function (e) {
		var value = e.currentTarget.value;
		Actions.change('when', value);
	},
	_location: function (e) {
		var value = e.currentTarget.value;
		Actions.change('location', value);
	},
	_poll: function (e) {
		var value = e.currentTarget.value;
		Actions.change('poll', value);
	},
	_difficulty: function (e) {
		var value = e.currentTarget.value;
		Actions.change('difficulty', value);
	},
	_scope: function (e) {
		var value = e.currentTarget.value;
		Actions.change('scope', value);
	},
	_zip: function (e) {
		var value = e.currentTarget.value;
		Actions.change('zip', value);
	},
	_author: function (e) {
		var value = e.currentTarget.value;
		Actions.change('author', value);
	}
});

module.exports = Meta;
