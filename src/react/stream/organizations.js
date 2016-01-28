"use strict";
let React = require('react');
let Router = require('react-router');
let { Link, History } = Router;

let AccountStore = require('../../stores/account');
let AccountActions = require('../../actions/account');

let Pic = require('../shared/pic');

module.exports = React.createClass({
	mixins: [History],
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
			if (org.orgId.toString() === this.props._route.id) {
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
								<Pic id={org.id} img={org.img} name={org.shortname} type="org" />
							</div>
						);
					})}
				</div>
			</div>
		);
	},
	_select: function (e) {
		this.history.pushState(null, `/stream/org/${e.currentTarget.id}`);
	}
});
