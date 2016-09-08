import React from 'react'
import ga from '../../lib/analytics'

export default class Search extends React.Component {

	render() {
		return (
  		<div className="keywords">
  			<input className="term" type="text" placeholder="Search for" value={this.props.search} onChange={this._change.bind(this)} />
  			<button className="button blue" onClick={this._search.bind(this)}><i className="fa fa-search" /> Search</button>
  		</div>
		)
	}

  _change(e) {
    //this.setState({search: e.currentTarget.value});
  }

	_search() {
		this.props.actions.search(this.props.search)
    this._redirect()
	}

  _redirect() {
    // let url = this.props.url;
    // if (url.root !== 'stream') {
    //   this.history.pushState(null, '/stream');
    // }
  }
}
