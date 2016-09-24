import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Scroll from 'react-infinite-scroller'

import Posts from './posts'
import Organizations from './organizations'
import Loader from '../shared/loader'
import Search from './search'
import Sort from './sort'

import * as actions from './redux/actions'
import styles from './styles.less'

class Stream extends React.Component {

	componentDidMount() {
		this.props.actions.collection()
		this._load(this.props.url)
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.url !== this.props.url) {
			//this._load(nextProps.url)
		}
	}

	render() {
		const url = this.props.url
		let type = url.type
		let id = url.id
		let visible = 'fa fa-minus-square-o'
		let hidden = 'fa fa-plus-square-o'
		let hasMore = (this.props.posts && this.props.posts.length < this.props.total && type !== 'post' && type !== 'edit')
		let count = this.props.posts ? this.props.posts.length : 0
		let total = this.props.total || 0

		// 401
    if (type === 'me' && !this.props.session.authenticated) {
      return (<div className="stream 401">
        <h2>You need to login first to view your posts</h2>
        <p>Please log in or create an account to view your posts.</p>
      </div>)
    }

		return (
			<div className="stream">
				<Search {...this.props} />
				<Sort {...this.props} />
				<div className="total">Displaying <span className="number">{count}</span> <span className="of">of</span> <span className="number">{total}</span> posts</div>
				<Scroll pageStart={0} loadMore={this._more.bind(this)} hasMore={hasMore} loader={<Loader />}>
					<Posts {...this.props} />
				</Scroll>
			</div>
		)
	}

	_load(url) {
		//this.props.actions.context(url.type, url.id)
	}

	_more() {
		//this.props.actions.more()
	}
}

const mapState = (state, props) => {
	const {
		posts,
		total,
		selected,
		scroll,
		params,
		folders
	} = state.stream

  return {
		url: props.url,
		session: state.session,
		posts,
		total,
		selected,
		scroll,
		params,
		folders
	}
}

const mapDispatch = (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapState, mapDispatch)(Stream)
