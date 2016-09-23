import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import Pic from '../pic'
import Uploader from '../uploader'

import * as actions from './redux/actions'
import styles from './styles.less'

class Profile extends React.Component {

	componentDidMount() {
		this._load(this.props.url)
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.url) {
			this._load(nextProps.url)
		}
	}

	render() {
		const { url } = this.props
		const { root, type } = url
		let profile = this.props.profile || {}
		let address = profile.address || {}
		let name = ''

		// stream, account, activity, admin
		if (['stream', 'account', 'admin', 'activity'].indexOf(root) === -1) {
			return false
		}

		// if stream not (my posts, org posts, user posts)
		if (root === 'stream' && ['org', 'me', 'user'].indexOf(type) === -1) {
			return false
		}

		// name
		if (profile.first && profile.last) {
			name = profile.first + ' ' + profile.last
		} else if (profile.username) {
			name = profile.username
		} else if (profile.name) {
			name = profile.name
		} else if (profile.shortname) {
			name = profile.shortname
		}
		return (
			<div className="profile">
				{root === 'account' || root === 'admin'
					? <Uploader img={profile.img} />
				: <Pic id={profile.id} img={profile.img} type={profile.type} name={profile.type === 'org' ? profile.shortname : profile.username} />
				}
				<div className="basic">
					<h1 className="name">{name}</h1>
					{address.city || address.state ? <div>{address.city}{address.city && address.state ? ", " : ""}{address.state}</div> : false}
					{profile.website ? <div><a href={profile.website} target="_blank">{profile.website}</a></div> : false}
					{profile.phone ? <div>{profile.phone}</div> : false}
					{profile.email ? <div><a href={"mailto:" + profile.email + "&Subject=Phourus"}>{profile.email}</a></div> : false}
				</div>
				<div className="detail">
					<div className={profile.type + " type"}>{profile.type ? profile.type.toUpperCase() : ""}</div>
				</div>
			</div>
		)
	}

	_back() {
		this.props.history.push("/stream")
	}

	_load(url) {
		const { root, type, id } = url

		// ADMIN
		if (root === 'admin' && id > 0) {
			this.props.actions.get('org', id)
		}
		// ACCOUNT
		if (root === 'account' || root === 'activity' || type === 'me') {
			this.props.actions.get('me', 0)
		}

		// STREAM
		if (root === 'stream') {
			if (type === 'user') {
				this.props.actions.get('user', id)
			}
			if (type === 'org') {
				this.props.actions.get('org', id)
			}
		}
	}
}

const Basic = ({ org }) => {
  const address = org.address || {}
  return (
    <div className="basic">
      <div className="name">{org.name}</div>
      <div className={org.type + " type"}>{org.type.toUpperCase()}</div>
      {address.city || address.state ? <div>{address.city}{address.city && address.state ? ", " : ""}{address.state}</div> : false}
      {org.website ? <div><a href={org.website} target="_blank">{org.website}</a></div> : false}
      {org.phone ? <div>{org.phone}</div> : false}
      {org.email ? <div><a href={"mailto:" + org.email + "&Subject=Phourus"}>{org.email}</a></div> : false}
    </div>
  )
}

const mapState = (state, props) => {
  return {
    url: props.url,
    profile: state.profile
  }
}

const mapDispatch = (dispatch) => {
	return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapState, mapDispatch)(Profile)
