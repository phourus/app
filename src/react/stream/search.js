"use strict";
let React = require('react');
let ga = require('../../analytics');

let Router = require('react-router');
let { History } = Router;

let Actions = require('../../actions/stream');

module.exports = React.createClass({
  mixins: [History],
  contextTypes: {
    route: React.PropTypes.object
  },
  getInitialState: function () {
    return {
      search: ""
    };
  },
	render: function () {
		return (
  		<div className="keywords">
  			<input className="term" type="text" placeholder="Search for" value={this.state.search} onChange={this._change} />
  			<button className="button blue" onClick={this._search}><i className="fa fa-search" /> Search</button>
  		</div>
		);
	},
  _change: function (e) {
    this.setState({search: e.currentTarget.value});
  },
	_search: function () {
		Actions.search(this.state.search);
    this._redirect();
	},
  _redirect: function () {
    // let route = this.context.route;
    // if (route.root !== 'stream') {
    //   this.history.pushState(null, '/stream');
    // }
  }
});
