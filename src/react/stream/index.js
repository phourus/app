import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Infinite from 'react-infinite-scroll'
const Scroll = Infinite(React)

import Posts from './posts'
import Organizations from './organizations'
import Loader from '../shared/loader'
import Sidebar from './sidebar'

import actions from './redux/actions'
import styles from './styles.less'

class Stream extends React.Component {

	getInitialState: function () {
		return {
			sidebarVisible: false,
			posts: null,
			total: 0,
			params: {
				exclude: [],
				search: '',
				sortBy: 'influence',
				direction: 'DESC',
				page: 1,
				limit: 10,
				total: 0
			}
		};
	}

	componentDidMount: function () {
		// this.unsubscribe = Store.listen((data) => {
		// 	this.setState(data);
		// });
		this._load(this.props.route);
	}

	componentWillReceiveProps: function (nextProps) {
		if (nextProps.route) {
			this._load(nextProps.route);
		}
	}

	render() {
		let route = this.props.route;
		let type = route.type;
		let id = route.id;
		let visible = 'fa fa-minus-square-o';
		let hidden = 'fa fa-plus-square-o';
		let hasMore = (this.state.posts && this.state.posts.length < this.state.total && type !== 'post' && type !== 'edit');
		let count = this.state.posts ? this.state.posts.length : 0;
		let total = this.state.total || 0;

		return (
			<div className="stream">
				{!this.state.sidebarVisible
					? <button className="toggle" onClick={this._sidebar}><i className="fa fa-navicon" /> Show my folders</button>
					: false
				}
				<div className="total">Displaying <span className="number">{count}</span> <span className="of">of</span> <span className="number">{total}</span> posts</div>
				<Sidebar sidebar={this._sidebar} sidebarVisible={this.state.sidebarVisible} />
				<Scroll pageStart={0} loadMore={this._more} hasMore={hasMore} loader={<Loader />}>
					<Posts {...this.state} sidebarVisible={this.state.sidebarVisible} />
				</Scroll>
			</div>
		);
	}

	_load(route) {
		Actions.context(route.type, route.id);
	}

	_more() {
		Actions.more();
	}

  _sidebar() {
    this.setState({sidebarVisible: !this.state.sidebarVisible});
  }
}

const mapState = (state) => {
  return {}
}

const mapDispatch = (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapState, mapDispatch)(Stream)
