import React from 'react';

import ga from '../../analytics';

import Actions from '../../actions/stream';

module.exports = React.createClass({
    getDefaultProps: function () {
        return {
            exclude: []
        };
    },
    render: function () {
        let exclude = this.props.exclude;
        var classes = {
            blog: "type blog",
            event: "type event",
            subject: "type subject",
            question: "type question",
            debate: "type debate",
            poll: "type poll",
            belief: "type belief",
            quote: "type quote"
        };
        for (var i = 0; i < exclude.length; i++) {
            var key = exclude[i];
            classes[key] += " inverted";
        }
        return (
            <div className="types">
                <div className="label">Toggle Types</div>
                <div id="blog" className={classes.blog} onClick={this._toggle}><i className="fa fa-laptop" /> Blogs</div>
                <div id="event" className={classes.event} onClick={this._toggle}><i className="fa fa-calendar" /> Events</div><br />
                <div id="subject" className={classes.subject} onClick={this._toggle}><i className="fa fa-info" /> Subjects</div>
                <div id="question" className={classes.question} onClick={this._toggle}><i className="fa fa-question" /> Questions</div><br />
                <div id="debate" className={classes.debate} onClick={this._toggle}><i className="fa fa-bullhorn" /> Debates</div>
                <div id="poll" className={classes.poll} onClick={this._toggle}><i className="fa fa-bar-chart" /> Polls</div><br />
                <div id="belief" className={classes.belief} onClick={this._toggle}><i className="fa fa-flag" /> Beliefs</div>
                <div id="quote" className={classes.quote} onClick={this._toggle}><i className="fa fa-quote-right" /> Quotes</div><br /><br />
                <div>
                    <button className="button red" style={{width: '240px'}} onClick={this._close}>Close <i className="fa fa-close" /></button>
                </div>
            </div>
        );
    },
    _toggle: function (e) {
        let type = e.currentTarget.id;
        Actions.exclude(type);
    },
    _close: function () {

    }
});
