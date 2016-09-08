import React from 'react'

export default class Tabs extends React.Component {

    componentDidMount() {
      let session = this.props.route;
      if (session.id) {
        //OrgActions.single(session.id);
        //MemberActions.collection(session.id);
      }
    }

    render() {
      let route = this.props.route
      let view = route.type

      let details = this._details()
      let users = this._users()

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
    }

    _select(tab) {
      let route = this.props.route
      let id = route.id
      if (id) {
        this.history.pushState(null, `/admin/${tab}`)
      }
    }

    _details() {
      // swap 'name' with 'category' when categories are determined
      let notNull = ['name', 'email', 'phone', 'fax', 'website', 'people', 'video', 'channel', 'contact', 'about'].filter((key) => {
        if (this.props.org[key]) {
          return true
        }
        return false
      });
      return notNull.length * 10
    }

    _users() {
      let approved = this.props.members.filter((obj) => {
        if (obj.approved) {
          return true
        }
        return false
      })
      return  {
        approved: approved.length,
        pending: (this.props.members.length - approved.length)
      }
    }
}
