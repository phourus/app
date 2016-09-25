import React from 'react'
import util from '../../lib/util'

export default class List extends React.Component {

  render() {
    let session = this.props.session
    let orgs = session.orgs

    return (
      <div className="list">
        {orgs.map((item) => {
          let admin = false
          let link = util.createOrgLink(item.org.shortname)

          if (item.admin === true && item.approved) {
            admin = <button id={item.org.shortname} className="button blue" onClick={this._edit}>Admin</button>
          }
          return (
            <div className="org" key={item.id}>
              {admin}<br />
            <a href={link}>{item.org.name || item.org.shortname}</a><br />
              {item.approved
                ? <span className="approved">
                  <i className="fa fa-check" /> Approved
                </span>
                : <span className="pending">
                  <i className="fa fa-clock-o" /> Pending
                </span>
              }
              <a href="javascript:void(0)" id={item.id} className="remove" onClick={this._remove}>
                {item.approved ? ' Remove Me' : ' Cancel Request'}
              </a><br />
              <div style={{clear: 'right'}}></div>
            </div>
          )
        })}
      </div>
    )
  }

  _edit(e) {
    let id = e.currentTarget.id
    window.location = util.createOrgLink(id) + '/admin/details'
  }

  _remove(e) {
    let id = e.currentTarget.id
    //MemberActions.remove(id)
  }
}
