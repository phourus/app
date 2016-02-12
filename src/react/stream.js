"use strict";
let React = require('react');
let Router = require('react-router');

let Store = require('../stores/stream');
let Actions = require('../actions/stream');

let Scroll = require('react-infinite-scroll')(React);

let Posts = require('./stream/posts');
let Organizations = require('./stream/organizations');
let Loader = require('./shared/loader');
let Sidebar = require('./stream/sidebar');

let Stream = React.createClass({
	getInitialState: function () {
		return {
			sidebarVisible: true,
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
	},
	componentDidMount: function () {
		this.unsubscribe = Store.listen((data) => {
			this.setState(data);
		});
		this._load(this.props._route);
	},
	componentWillUnmount: function () {
		this.unsubscribe();
	},
	componentWillReceiveProps: function (nextProps) {
		if (nextProps._route) {
			this._load(nextProps._route);
		}
	},
	render: function () {
		let route = this.props._route;
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
					<Posts {...this.state} _route={this.props._route} sidebarVisible={this.state.sidebarVisible} />
				</Scroll>
			</div>
		);
	},
	_load: function (route) {
		Actions.context(route.type, route.id);
	},
	_more: function () {
		Actions.more();
	},
  _sidebar: function () {
    this.setState({sidebarVisible: !this.state.sidebarVisible});
  }
});

module.exports = Stream;
