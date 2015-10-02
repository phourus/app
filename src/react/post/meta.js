"use strict";
let React = require('react');

let Actions = require('../../actions/post');

let tax = require('../../taxonomy');

let Meta = React.createClass({
	render: function () {
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
					{this.props.context.type === 'edit' && this.props.owner
						? <input ref="positive" type="checkbox" checked={this.props.post.positive ? true : false} onChange={this._positive} />
						: <strong>{this.props.post.positive}</strong>
					}
				</label>);
		let	date = (<label>Date:
					{this.props.context.type === 'edit' && this.props.owner
						? <input ref="date" value={this.props.post.date} onChange={this._date} />
						: <strong>{this.props.post.date}</strong>
					}
				</label>);
		let	address = (<label>Address:
				{this.props.context.type === 'edit' && this.props.owner
					? <input ref="address" value={this.props.post.address} onChange={this._address} />
					: <strong>{this.props.post.address}</strong>
				}
			</label>);
		let	difficulty = (<label>Difficulty:
				{this.props.context.type === 'edit' && this.props.owner
					? <select ref="difficulty" value={this.props.post.difficulty} onChange={this._difficulty}>
						<option value="easy">Easy</option>
						<option value="medium">Medium</option>
						<option value="hard">Hard</option>
					</select>
					: <strong>{this.props.post.difficulty}</strong>
				}
			</label>);
		let	scope = (<label>Scope:
				{this.props.context.type === 'edit' && this.props.owner
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
				{this.props.context.type === 'edit' && this.props.owner
					? <input ref="zip" value={this.props.post.zip} onChange={this._zip} />
					: <strong>{this.props.post.zip}</strong>
				}
			</label>);
		let	author = (<label>Source/Author:
				{this.props.context.type === 'edit' && this.props.owner
					? <input ref="author" value={this.props.post.author} onChange={this._author} />
					: <strong>{this.props.post.author}</strong>
				}
			</label>);
		let fields = {
			blog: [positive],
			event: [date, address],
			subject: [difficulty],
			question: [difficulty],
			debate: [scope, zip],
			poll: [scope, zip],
			quote: [],
			belief: [author]
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
	_date: function (e) {
		var value = e.currentTarget.value;
		Actions.change('date', value);
	},
	_address: function (e) {
		var value = e.currentTarget.value;
		Actions.change('address', value);
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
