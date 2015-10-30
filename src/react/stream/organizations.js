"use strict";
let React = require('react');
let Router = require('react-router');
let { Link, Navigation } = Router;

let AccountStore = require('../../stores/account');
let AccountActions = require('../../actions/account');

let Pic = require('./pic');

module.exports = React.createClass({
	mixins: [Navigation],
	getInitialState: function () {
		return {
			orgs: []
		};
	},
	componentDidMount: function () {
		this.unsubscribe = AccountStore.listen((data) => {
			this.setState(data);
		});
		AccountActions.orgs();
	},
	componentWillUnmount: function () {
		this.unsubscribe();
	},
	render: function () {
		let membership = this.state.orgs || [];
		let selected = this.state.orgs.filter((org) => {
			if (org.orgId.toString() === this.props.context.id) {
				return true;
			}
			return false;
		});
		return (
			<div className="organizations">
				<h1>My Organizations</h1>
				<div className="list">
					{membership.map((member) => {
						let org = member.org;
						return (
							<div key={org.id} id={org.id} className="org" onClick={this._select}>
								<div className="name">{org.name}</div>
								<Pic img={org.img} />
							</div>
						);
					})}
				</div>
			</div>
		);
	},
	_select: function (e) {
		this.context.router.transitionTo("orgPosts", {id: e.currentTarget.id});
	}
});
