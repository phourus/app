import React from 'react';

import {Org as OrgActions} from '../../actions/profile';
import MemberActions from '../../actions/members';
import OrgStore from '../../stores/orgs';
import MemberStore from '../../stores/members';

export default React.createClass({
    contextTypes: {
      route: React.PropTypes.object
    },
    getInitialState: function () {
      return {
        org: {},
        members: []
      };
    },
    componentDidMount: function () {
      let session = this.context.route;
      this.unsubscribeOrgs = OrgStore.listen(data => {
        if (data.org) {
          this.setState({org: data.org});
        }
      });
      this.unsubscribeMembers = MemberStore.listen(data => {
        this.setState({members: data});
      });
      if (session.id) {
        OrgActions.single(session.id);
        MemberActions.collection(session.id);
      }
    },
    componentWillUnmount: function () {
      this.unsubscribeOrgs();
      this.unsubscribeMembers();
    },
    render: function () {
      let route = this.context.route;
      let view = route.type;

      let details = this._details();
      let users = this._users();
      return (
        <div className="tabs">
          <div onClick={this._select.bind(this, 'details')} className={'details' === view ? 'selected' : ''}>
            <div className="number">{details}%</div>
            <div className="label">Details</div>
          </div>
          <div onClick={this._select.bind(this, 'members')} className={'members' === view ? 'selected' : ''}>
            <div className="number">{users.approved}<span className="pending">{users.pending}</span></div>
            <div className="label">Users</div>
          </div>
          <div onClick={this._select.bind(this, 'teams')} className={'teams' === view ? 'selected' : ''}>
            <div className="number">0</div>
            <div className="label">Teams</div>
          </div>
          <div onClick={this._select.bind(this, 'billing')} className={'billing' === view ? 'selected' : ''}>
            <div className="number"><i className="fa fa-check" /></div>
            <div className="label">Billing</div>
          </div>
        </div>
      )
    },
    _select: function (tab) {
      let route = this.context.route;
      let id = route.id;
      if (id) {
        this.history.pushState(null, `/admin/${tab}`);
      }
    },
    _details: function () {
      // swap 'name' with 'category' when categories are determined
      let notNull = ['name', 'email', 'phone', 'fax', 'website', 'people', 'video', 'channel', 'contact', 'about'].filter((key) => {
        if (this.state.org[key]) {
          return true;
        }
        return false;
      });
      return notNull.length * 10;
    },
    _users: function () {
      let approved = this.state.members.filter((obj) => {
        if (obj.approved) {
          return true;
        }
        return false;
      });
      return  {
        approved: approved.length,
        pending: (this.state.members.length - approved.length)
      };
    }
});
