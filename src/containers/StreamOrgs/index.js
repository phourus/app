import React from 'react';
import Router, { History, Link } from 'react-router';

import util from '../../util';

import Pic from '../Pic';

module.exports = React.createClass({
	mixins: [History],
	contextTypes: {
		session: React.PropTypes.object,
		route: React.PropTypes.object
	},
	render: function () {
		let session = this.context.session;
		let orgs = session.orgs || [];
		let membership = orgs;
		let selected = orgs.filter((org) => {
			if (org.orgId.toString() === this.context.route.id) {
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
							<div key={org.id} id={org.shortname} className="org" onClick={this._select}>
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
		window.location = util.createOrgLink(e.currentTarget.id);
	}
});