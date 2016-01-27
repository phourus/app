'use strict';
let React = require('react');

let Actions = require('../../actions/admin');

let Pic = require('../shared/pic');

module.exports = React.createClass({
  render: function () {
    return (
      <div className="members">
        <h2>Manage Users</h2>
        {this.props.members.map(member => {
          return (
            <div>
              <Pic img={member.img} _route={this.props._route} />
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
          );
        })}
      </div>
    );
  },
  _approve: function (e) {
    Actions.Members.approve(e.currentTarget.id);
  },
  _admin: function (e) {
    Actions.Members.admin(e.currentTarget.id);
  },
  _revoke: function (e) {
    Actions.Members.revoke(e.currentTarget.id);
  },
  _deny: function (e) {
    Actions.Members.deny(e.currentTarget.id);
  }
});
