import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Infinite from 'react-infinite-scroll'
const Scroll = Infinite(React)

import Posts from './posts'
import Organizations from './organizations'
import Loader from '../shared/loader'
import Sidebar from './sidebar'

import * as actions from './redux/actions'
import styles from './styles.less'

class Stream extends React.Component {

	componentDidMount() {
		this.props.actions.collection()
		this._load(this.props.url)
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.url) {
			this._load(nextProps.url)
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

		return (
			<div className="stream">
				{!this.props.sidebarVisible
					? <button className="toggle" onClick={this._sidebar.bind(this)}><i className="fa fa-navicon" /> Show my folders</button>
					: false
				}
				<div className="total">Displaying <span className="number">{count}</span> <span className="of">of</span> <span className="number">{total}</span> posts</div>
				<Sidebar folders={this.props.folders} actions={this.props.actions} sidebar={this._sidebar.bind(this)} sidebarVisible={this.props.sidebarVisible} />
				<Scroll pageStart={0} loadMore={this._more.bind(this)} hasMore={hasMore} loader={<Loader />}>
					<Posts {...this.props} />
				</Scroll>
			</div>
		)
	}

	_load(url) {
		this.props.actions.context(url.type, url.id)
	}

	_more() {
		this.props.actions.more()
	}

  _sidebar() {
    //this.setState({sidebarVisible: !this.props.sidebarVisible})
  }
}

const mapState = (state, props) => {
	const {
		sidebarVisible,
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
		sidebarVisible,
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
