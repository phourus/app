"use strict";
let React = require('react');

let Actions = require('../../actions/post');

let Meta = require('./meta');
let tax = require('../../taxonomy');

let Types = React.createClass({
	getDefaultProps: function () {
		return {
			context: {},
			post: {},
			owner: false
		}
	},
	render: function () {
	  let type = this.props.post.type;
	  let classes = {};
		for (var i in Object.keys(tax)) {
			var key = Object.keys(tax)[i];
			classes[key] = key;
			if (type === key) {
				classes[key] += ' selected';
			}
		}
		let descriptions = {
			blog: "General Post type, start here if you dont know what to choose",
			event: "Virtual or real-world event",
			subject: "Share your knowledge or expertise with the community on a variety of Subjects",
			question: "Need help or clarification on a topic? Ask it with a Question",
			debate: "Get the discussion started with a local, county, state or national-level Debate",
			poll: "Get the discussion started with a local, county, state or national-level Debate",
			quote: "Has someone else already described how you feel? Post their Quote here",
			belief: "Tell us more about your Belief on something dear to you"
		};
		let icons = {
			blog: "laptop",
			event: "calendar",
			subject: "info",
			question: "question",
			debate: "bullhorn",
			poll: "bar-chart",
			quote: "quote-right",
			belief: "flag"
		};
	  return (
			<div className="types">
				{['blog', 'event', 'subject', 'question', 'debate', 'poll', 'quote', 'belief'].map((item) => {
					let fields = <Meta {...this.props} context={this.props.context} owner={this.props.owner} />
					return (<div className={classes[item]} onClick={this._select.bind(this, item)}>
						<strong><i className={"fa fa-" + icons[item]} /> {item}</strong>
						{item === type
							? <div className=""><p>{descriptions[item]}</p>{fields}</div>
							: false
						}
					</div>)
				})}
			</div>
	  );
	},
	_select: function (type) { Actions.change('type', type); },
	_element: function (e) {
		var value = e.currentTarget.value;
		Actions.change('element', value);
	},
	_category: function (e) {
		var value = e.currentTarget.value;
		Actions.change('category', value);
	},
	_subcategory: function (e) {
		var value = e.currentTarget.value;
		Actions.change('subcategory', value);
	},
	_positive: function (e) {
		var value = e.currentTarget.value;
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

module.exports = Types;
