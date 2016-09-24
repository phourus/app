import React from 'react'
import ga from '../../lib/analytics'

export default class Search extends React.Component {

	render() {
		return (
  		<div className="keywords">
  			<input ref="term" className="term" type="text" placeholder="Search for" defaultValue={this.props.params.search} />
  			<button className="button blue" onClick={this._search.bind(this)}><i className="fa fa-search" /> Search</button>
  		</div>
		)
	}

	_search() {
		this.props.actions.search(this.refs.term.value)
    //this._redirect()
	}

  _redirect() {
    // let url = this.props.url;
    // if (url.root !== 'stream') {
    //   this.props.history.push('/stream');
    // }
  }
}
