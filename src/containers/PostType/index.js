import React from 'react';

import PostActions from '../../actions/post';
import StreamActions from '../../actions/stream';

import Meta from '../PostMeta';
import tax from '../../taxonomy';

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

module.exports = React.createClass({
	contextTypes: {
		route: React.PropTypes.object
	},
	getInitialState: function () {
		return {
			select: false
		};
	},
	getDefaultProps: function () {
		return {
			post: {},
			owner: false
		};
	},
	componentWillReceiveProps: function (newProps) {
		if (this.props.type !== newProps.post.type) {
			this.setState({select: false});
		}
	},
	render: function () {
		let type = this.props.post.type || "blog";
		let classes = {};
		for (var i in Object.keys(tax)) {
			var key = Object.keys(tax)[i];
			classes[key] = key;
			if (type === key) {
				classes[key] += ' selected';
			}
		}
		return (
			<div>
				<div id={this.props.post.type} className={`type ${this.props.post.type} ${(this.state.select ? 'inverted' : '')}`} onClick={this._select}>
					<i className={"fa fa-" + (icons[this.props.post.type] ? icons[this.props.post.type] : 'file')} />
					{" "}
					{this.props.post.type}
				</div>
				{this.state.select ? <Selector post={this.props.post} type={this._type} owner={this.props.owner} /> : false}
			</div>
		);
	},
	_select: function (e) {
		let route = this.context.route;
		let type = route.type;
		if (type === 'create' || type === 'edit' && this.props.owner) {
			this.setState({select: !this.state.select});
		}
		if (type !== 'post' && type !== 'edit' && type !== 'create') {
			StreamActions.type(e.currentTarget.id);
		}
	},
	_hideSelector: function () {
		this.setState({select: false});
	}
});

let Selector = React.createClass({
	render: function () {
		return (
			<div className="selector">
				{['blog', 'event', 'subject', 'question', 'debate', 'poll', 'quote', 'belief'].map((item) => {
					return (<div className={item + " type"} onClick={this._select.bind(this, item)}>
					<i className={"fa fa-" + icons[item]} /> {item}
						{item === 0
							? <div className="">
							<p>{descriptions[item]}</p>
							<Meta {...this.props} owner={this.props.owner} />
						</div>
						: false}
					</div>)
				})}
			</div>
		);
	},
	_select: function (type) {
		PostActions.change('type', type);
	}
});
