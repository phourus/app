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
		this._load(this.props.route)
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.route) {
			this._load(nextProps.route)
		}
	}

	render() {
		let route = this.props.route
		let type = route.type
		let id = route.id
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
					<Posts {...this.props} sidebarVisible={this.props.sidebarVisible} />
				</Scroll>
			</div>
		)
	}

	_load(route) {
		this.props.actions.context(route.type, route.id)
	}

	_more() {
		this.props.actions.more()
	}

  _sidebar() {
    //this.setState({sidebarVisible: !this.props.sidebarVisible})
  }
}

const mapState = (state) => {
	const {
		sidebarVisible,
		posts,
		total,
		params,
		folders
	} = state.stream

  return {
		route: state.route,
		session: state.session,
		sidebarVisible,
		posts,
		total,
		params,
		folders
	}
}

const mapDispatch = (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapState, mapDispatch)(Stream)
