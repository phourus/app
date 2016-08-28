import React from 'react'
import Select from 'react-select'

export default class Collaborators extends React.Component {

	componentDidMount() {
		// this.unsubscribe = Store.listen((data) => {
		// 	this.setState(data)
		// });
		// Actions.collection(this.props.post.id)
		// Actions.lookup(this.props.post.orgId)
	}

	componentWillReceiveProps(updated) {
		if (updated.post && updated.post.orgId) {
			//Actions.lookup(updated.post.orgId)
		}
	}

	render() {
    let lookup = this._lookup()
		let list = this._values()
		return (
      <div className="collaborators">
				<strong>Collaborators</strong><br />
				<Select
					allowCreate={false}
					delimiter={'|'}
					value={list}
					multi
					placeholder={false}
					options={lookup}
					onChange={this._change} />
      </div>
    )
  }

	_change(value) {
		let current = this._values().map((data) => {
			return data.value
		});
		let updated = value.map((data) => {
			return data.value
		});
		let diff = this._diff(updated, current)
		if (!diff) {
			return
		}
		if (diff.action === 'add') {
			let model = {postId: this.props.post.id}
			if (diff.type === 'user') {
				model.userId = diff.id
			} else if (diff.type === 'team') {
				model.teamId = diff.id
			} else {
				return
			}
			Actions.add(model)
		}
		if (diff.action === 'remove') {
			Actions.remove(diff.type, diff.id)
		}
	}

	_diff(updated, current) {
		let action = 'add'
		let long = updated
		let short = current
		let diff
		let out = []
		if (updated.length < current.length) {
			action = 'remove'
			long = current
			short = updated
		}
		long.forEach((item) => {
			if (short.indexOf(item) === -1 && !diff) {
				diff = item
			}
		});
		if (diff) {
			let out = diff.split(':')
			return {
				action: action,
				type: out[0],
				id: out[1]
			}
		}
		return false
	}

	_lookup() {
		let out = []
		let lookup = this.props.lookup
		if (lookup.members && lookup.members.forEach) {
			lookup.members.forEach((item) => {
				let user = item.user
				if (user) {
					out.push({value: 'user:' + user.id, label: user.first + ' ' + user.last + ' (' + user.username + ') <' + user.email + '>' });
				}
			})
		}
		if (lookup.teams && lookup.teams.forEach) {
			lookup.teams.forEach((team) => {
				out.push({value: 'team:' + team.id, label: 'Team: ' + team.name})
			});
		}
		return out
	}

	_values() {
		let list = this.props.list
		if (list && list.map) {
			return list.map((item) => {
				if (item.user) {
					let user = item.user
					return {value: 'user:' + item.userId, label: user.first + ' ' + user.last}
				}
				if (item.team) {
					return {value: 'team:' + item.teamId, label: 'Team: ' + item.team.name}
				}
				return false
			})
		}
		return []
	}
}
