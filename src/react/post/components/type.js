import React from 'react'

import Meta from './meta'
import tax from '../../../lib/taxonomy'

const icons = {
	blog: "laptop",
	event: "calendar",
	subject: "info",
	question: "question",
	debate: "bullhorn",
	poll: "bar-chart",
	quote: "quote-right",
	belief: "flag"
}

const descriptions = {
	blog: "General Post type, start here if you dont know what to choose",
	event: "Virtual or real-world event",
	subject: "Share your knowledge or expertise with the community on a variety of Subjects",
	question: "Need help or clarification on a topic? Ask it with a Question",
	debate: "Get the discussion started with a local, county, state or national-level Debate",
	poll: "Get the discussion started with a local, county, state or national-level Debate",
	quote: "Has someone else already described how you feel? Post their Quote here",
	belief: "Tell us more about your Belief on something dear to you"
}

export default class Type extends React.Component {

	componentWillReceiveProps(newProps) {
		if (this.props.type !== newProps.post.type) {
			//this.setState({select: false});
		}
	}

	render() {
	  let type = this.props.post.type || "blog"
	  let classes = {}
		for (let i in Object.keys(tax)) {
			let key = Object.keys(tax)[i];
			classes[key] = key
			if (type === key) {
				classes[key] += ' selected'
			}
		}
		return (
			<div>
				<div id={this.props.post.type} className={`type ${this.props.post.type} ${(this.props.select ? 'inverted' : '')}`} onClick={this._select}>
					<i className={"fa fa-" + (icons[this.props.post.type] ? icons[this.props.post.type] : 'file')} />
					{" "}
					{this.props.post.type}
				</div>
				{this.props.select ? <Selector post={this.props.post} type={this._type} owner={this.props.owner} change={this._change} /> : false}
			</div>
		)
	}

	_select(e) {
		const url = this.props.url
		const type = url.type
		if (type === 'create' || type === 'edit' && this.props.owner) {
			//this.setState({select: !this.props.select})
		}
		if (type !== 'post' && type !== 'edit' && type !== 'create') {
			//StreamActions.type(e.currentTarget.id)
		}
	}

	_hideSelector() {
		//this.setState({select: false})
	}

	_change(type) {
		//PostActions.change('type', type)
	}
}

const Selector = (props) => {
	return (
		<div className="selector">
			{['blog', 'event', 'subject', 'question', 'debate', 'poll', 'quote', 'belief'].map((item) => {
				return (<div className={item + " type"} onClick={this.props.change.bind(this, item)}>
					<i className={"fa fa-" + icons[item]} /> {item}
					{item === 0
						? <div className="">
								<p>{descriptions[item]}</p>
								<Meta {...props} />
							</div>
						: false
					}
				</div>)
			})}
		</div>
	)
}
