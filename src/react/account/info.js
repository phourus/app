import React from 'react'
import ga from '../../lib/analytics'

export default class Info extends React.Component {

  componentDidMount() {
    //TutorialActions.ready(true)
  }

  render() {
    let session = this.props.session
    let account = session.user

    Object.keys(this.props.changes).forEach((key) => {
      account[key] = this.props.changes[key]
    })

    return (
      <div className="info">
        <h3>Basic Information</h3>
        <div id="user_basic">
          <label>Username
            <input className="username" type="text" value={account.username} disabled="true" />
          </label>
          <label>Email
            <input className="email" type="text" value={account.email} onChange={this._email.bind(this)} />
          </label>
          <label>First
            <input className="first" type="text" value={account.first} onChange={this._first.bind(this)} />
          </label>
          <label>Last
          <input className="last" type="text" value={account.last} onChange={this._last.bind(this)} />
          </label>
          <label>Phone
            <input className="phone" type="text" value={account.phone} onChange={this._phone.bind(this)} />
          </label>
          <label>Company
            <input className="company" type="text" value={account.company} onChange={this._company.bind(this)} />
          </label>
          <label>Occupation
            <input className="occupation" type="text" value={account.occupation} onChange={this._occupation.bind(this)} />
          </label>
          <label>Website
            <input className="website" type="text" value={account.website} onChange={this._website.bind(this)} />
          </label>
          <label>Date of Birth
            <input className="dob" type="datetime" value={account.dob} onChange={this._dob.bind(this)} />
          </label>
          <label>Gender
            <select className="gender" value={account.gender} onChange={this._gender.bind(this)}>
              <option value="">Private</option>
              <option value="F">Female</option>
              <option value="M">Male</option>
            </select>
          </label>
        </div>
        <button className="button green" onClick={this._save.bind(this)}>Save Changes</button>
      </div>
    )
  }

  _first(e) {
    this.props.actions.change('first', e.currentTarget.value)
  }

  _last(e) {
    this.props.actions.change('last', e.currentTarget.value)
  }

  _email(e) {
    this.props.actions.change('email', e.currentTarget.value)
  }

  _phone(e) {
    this.props.actions.change('phone', e.currentTarget.value)
  }

  _company(e) {
    this.props.actions.change('company', e.currentTarget.value)
  }

  _occupation(e) {
    this.props.actions.change('occupation', e.currentTarget.value)
  }

  _website(e) {
    this.props.actions.change('website', e.currentTarget.value)
  }

  _dob(e) {
    this.props.actions.change('dob', e.currentTarget.value)
  }

  _gender(e) {
    this.props.actions.change('gender', e.currentTarget.value)
  }

  _save() {
    this.props.actions.save()
    ga('send', 'event', 'account', 'edit')
  }
}
