"use strict";
let React = require('react');
let Router = require('react-router');
let { State } = Router;
let posts = require('../api/posts');

let Store = require('../stores/stream');
let Actions = require('../actions/stream');

let Profile = require('./profile');
let Scroll = require('react-infinite-scroll')(React);

let Posts = require('./stream/posts');
let Organizations = require('./stream/organizations');

let Stream = React.createClass({
	mixins: [State],
	getInitialState: function () {
		return {
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
			},
			context: {
				type: null,
				id: null
			}
		};
	},
	componentDidMount: function () {
		this.unsubscribe = Store.listen((data) => {
			this.setState(data);
		});
		this._context();
	},
	componentWillUnmount: function () {
		this.unsubscribe();
	},
	componentWillReceiveProps: function () {
		this._context();
	},
	render: function () {
		let visible = 'fa fa-minus-square-o';
		let hidden = 'fa fa-plus-square-o';
		let hasMore = (this.state.posts && this.state.posts.length < this.state.total && this.state.context.type !== 'post' && this.state.context.type !== 'edit');
		let count = this.state.posts ? this.state.posts.length : 0;
		let total = this.state.total || 0;

		return (
			<div className="stream">
				{this.state.context.type === 'orgs' && !this.state.context.id
					? <Organizations context={this.state.context} />
					: false
				}
				{this.state.context.id && (this.state.context.type === 'orgs' || this.state.context.type === 'users')
					? <Profile context={this.state.context} />
					: false
				}
				{this.state.context.type === 'post' || this.state.context.type === 'edit'
					? false
					: <div className="total">Displaying <span className="number">{count}</span> <span className="of">of</span> <span className="number">{total}</span> posts</div>
				}
				<Scroll pageStart={0} loadMore={this._more} hasMore={hasMore} loader={<div className="loader"></div>}>
					<Posts {...this.state} />
				</Scroll>
			</div>
		);
	},
	_context: function () {
		/** CONTEXT **/
		// /stream
		// /stream/user/:id
		// /stream/org/:id
		// /stream/edit/:id
		// /stream/:id
		// /stream/create

		let route = this.context.router.getCurrentRoutes();
		let params = this.context.router.getCurrentParams();
		let id = null;
		let type = null;

		if (route[2]) {
			type = route[2].name;
		}
		if (params.id) {
			id = params.id;
		}
		if (type === 'create') {
			id = 'create';
		}
		Actions.context(type, id);
	},
	_more: function () {
		Actions.more();
	}
});

module.exports = Stream;
