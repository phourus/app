import React from 'react'
import { Link } from 'react-router'

import util from '../../lib/util'
import Pic from '../shared/pic'

export default class Organizations extends React.Component {

	render() {
		let session = this.props.session
		let orgs = session.orgs || []
		let membership = orgs
		let selected = orgs.filter((org) => {
			if (org.orgId.toString() === this.props.url.id) {
				return true
			}
			return false
		})

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
						)
					})}
				</div>
			</div>
		)
	}

	_select(e) {
		window.location = util.createOrgLink(e.currentTarget.id)
	}
}
