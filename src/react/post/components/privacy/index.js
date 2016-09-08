import React from 'react'
import Router from 'react-router'

import Collaborators from './collaborators'
import Contexts from './contexts'

export default class Privacy extends React.Component {

	render() {
		let privacy = this.props.post.privacy || 'private'
		let icons = {
			private: "fa fa-lock",
			members: "fa fa-building",
			public: "fa fa-globe",
			trash: "fa fa-trash"
		}
		let classes = {
			private: "button blue inverted",
			members: "button blue inverted",
			public: "button blue inverted"
		}
		classes[privacy] = "button blue"
		if (this.props.url.type !== 'edit') {
			return <i className={icons[privacy]} />
		}

		return (
			<div className="privacy">
				{this.props.owner && this.props.url.type === 'edit' && this.state.privacy
					? <div>
							<h2>Privacy
								{this.props.owner && this.props.url.type === 'IGNORE'
									? <div className="privacyToggle" onClick={this._privacy}><i className={icons[privacy]} /> <span style={{textDecoration: 'underline'}}>{this.props.post.privacy}</span></div>
									: false
								}
							</h2>
							<div>
								<Contexts {...this.props} select={this._select} />
								<input type="radio" onClick={this._private} checked={privacy === 'private'} /><label>Private</label><br />
								<input type="radio" onClick={this._public} checked={privacy === 'public'} /><label>Public</label><br />
								<input type="radio" onClick={this._members} checked={privacy === 'members'} /><label>Internal</label>
								{this.props.post.orgId && this.props.post.orgId !== 'null' ? <Collaborators {...this.props} s/> : false}
							</div>
						</div>
					: false
				}
			</div>
		)
	}

	_privacy() {
		//this.setState({privacy: !this.state.privacy});
	}

	_private(e) {
		//PostActions.change('privacy', 'private');
	}

	_members(e) {
		//PostActions.change('privacy', 'members');
	}

	_public(e) {
		//PostActions.change('privacy', 'public');
	}

	_select(e) {
		//PostActions.change('orgId', e.currentTarget.value);
	}
}
