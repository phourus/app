import React from 'react'
import ga from '../../lib/analytics'

export default class Types extends React.Component {

	render() {
    let exclude = this.props.exclude
		let classes = {
			blog: "type blog",
			event: "type event",
			subject: "type subject",
			question: "type question",
			debate: "type debate",
			poll: "type poll",
			belief: "type belief",
			quote: "type quote"
		}
		for (let i = 0; i < exclude.length; i++) {
			let key = exclude[i]
			classes[key] += " inverted"
		}
		return (
			<div className="types">
        <div className="label">Toggle Types</div>
				<div id="blog" className={classes.blog} onClick={this._toggle.bind(this)}><i className="fa fa-laptop" /> Blogs</div>
				<div id="event" className={classes.event} onClick={this._toggle.bind(this)}><i className="fa fa-calendar" /> Events</div><br />
				<div id="subject" className={classes.subject} onClick={this._toggle.bind(this)}><i className="fa fa-info" /> Subjects</div>
				<div id="question" className={classes.question} onClick={this._toggle.bind(this)}><i className="fa fa-question" /> Questions</div><br />
				<div id="debate" className={classes.debate} onClick={this._toggle.bind(this)}><i className="fa fa-bullhorn" /> Debates</div>
				<div id="poll" className={classes.poll} onClick={this._toggle.bind(this)}><i className="fa fa-bar-chart" /> Polls</div><br />
				<div id="belief" className={classes.belief} onClick={this._toggle.bind(this)}><i className="fa fa-flag" /> Beliefs</div>
				<div id="quote" className={classes.quote} onClick={this._toggle.bind(this)}><i className="fa fa-quote-right" /> Quotes</div><br /><br />
        <div>
          <button className="button red" style={{width: '240px'}} onClick={this._close.bind(this)}>Close <i className="fa fa-close" /></button>
        </div>
			</div>
		)
	}

	_toggle(e) {
		let type = e.currentTarget.id
		this.props.actions.exclude(type)
	}

  _close() {

  }
}
