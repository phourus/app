import React from 'react'
import Pic from '../shared/pic'

export default class Members extends React.Component {

  componentDidMount() {
    let route = this.props.route
    this.props.actions.collection(route.id)
  }

  render() {
    return (
      <div className="members">
        <h2>Manage Users</h2>
        {this.state.members.map(member => {
          return (
            <div>
              <Pic img={member.img} id={member.id} type="user" name={member.username} />
              <div className="profile">
                <strong>{member.first} {member.last}</strong>
                <div>{member.occupation}</div>
                <a href={"mailto:" + member.email + "&Subject=Phourus"}>{member.email}</a>
              </div>
              <div className="manage">
                {member.admin
                  ? <button id={member.memberId} className="button blue inverted" onClick={this._revoke}>Revoke Admin</button>
                  : <button id={member.memberId} className="button blue" onClick={this._admin}>Make Admin</button>
                }
                {member.approved
                  ? <button id={member.memberId} className="button green inverted" onClick={this._deny}>Remove Member</button>
                  : <button id={member.memberId} className="button green" onClick={this._approve}>Approve Member</button>
                }
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  _approve(e) {
    this.props.actions.approve(e.currentTarget.id)
  }

  _admin(e) {
    this.props.actions.admin(e.currentTarget.id)
  }

  _revoke(e) {
    this.props.actions.revoke(e.currentTarget.id)
  }

  _deny(e) {
    this.props.actions.deny(e.currentTarget.id)
  }
}
