let React = require('react');

let Actions = require('../../actions/members');
let Store = require('../../stores/members');

let Pic = require('../shared/pic');

module.exports = React.createClass({
  contextTypes: {
    route: React.PropTypes.object
  },
  getInitialState: function () {
    return {
      members: []
    };
  },
  componentDidMount: function () {
    let route = this.context.route;
    this.unsubscribe = Store.listen(data => {
      this.setState({members: data});
    });
    Actions.collection(route.id);
  },
  componentWillUnmount: function () {
    this.unsubscribe();
  },
  render: function () {
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
          );
        })}
      </div>
    );
  },
  _approve: function (e) {
    Actions.approve(e.currentTarget.id);
  },
  _admin: function (e) {
    Actions.admin(e.currentTarget.id);
  },
  _revoke: function (e) {
    Actions.revoke(e.currentTarget.id);
  },
  _deny: function (e) {
    Actions.deny(e.currentTarget.id);
  }
});
