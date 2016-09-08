import React from 'react';
import ga from '../../lib/analytics';

import Actions from '../../actions/stream';

export default React.createClass({
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
    // let route = this.props.route;
    // if (route.root !== 'stream') {
    //   this.history.pushState(null, '/stream');
    // }
  }
});
