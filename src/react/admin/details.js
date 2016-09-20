import React from 'react'

export default class Details extends React.Component {

  componentDidMount() {
    const url = this.props.url
    if (url.id) {
      this.props.actions.single(url.id)
    }
  }

  render() {
    let { changes, org } = this.props
    Object.keys(changes).forEach((key) => {
      org[key] = changes[key]
    })

    return (
      <div className="info">
        <div id="user_basic">
          <label>Shortname
            <input className={changes.shortname ? 'changed' : ''} type="text" value={org.shortname} disabled="true" />
          </label>
          <label>Type
            <input className={changes.type ? 'changed' : ''} type="text" value={org.type} disabled="true" />
          </label>
          <label>Company Name
            <input className={changes.name ? 'changed' : ''} type="text" value={org.name} onChange={this._name.bind(this)} />
          </label>
          <label>Email
            <input className={changes.email ? 'changed' : ''} type="text" value={org.email} onChange={this._email.bind(this)} />
          </label>
          <label>Phone
            <input className={changes.phone ? 'changed' : ''} type="text" value={org.phone} onChange={this._phone.bind(this)} />
          </label>
          <label>Fax
            <input className={changes.fax ? 'changed' : ''} type="text" value={org.fax} onChange={this._fax.bind(this)} />
          </label>
          <label>Website
            <input className={changes.website ? 'changed' : ''} type="text" value={org.website} onChange={this._website.bind(this)} />
          </label>
          <label>People
            <input className={changes.people ? 'changed' : ''} type="text" value={org.people} onChange={this._people.bind(this)} />
          </label>
          <label>Video
          <input className={changes.video ? 'changed' : ''} type="text" value={org.video} onChange={this._video.bind(this)} />
          </label>
          <label>Youtube Channel
            <input className={changes.channel ? 'changed' : ''} type="text" value={org.channel} onChange={this._channel.bind(this)} />
          </label>
          <label>Contact
            <input className={changes.contact ? 'changed' : ''} type="text" value={org.contact} onChange={this._contact.bind(this)} />
          </label>
          <label>Category
            <select className={changes.category ? 'changed' : ''} value={org.category} onChange={this._category.bind(this)}>
              <option value="">--Please select a category--</option>
            </select>
          </label>
          <label className="full">About
            <textarea className={changes.about ? 'changed' : ''} value={org.about} onChange={this._about.bind(this)}></textarea>
          </label>
          <button className="button green" onClick={this._save.bind(this)}>Save Changes</button>
        </div>
      </div>
    )
  }

  _name(e) {
    this.props.actions.change('name', e.currentTarget.value)
  }

  _email(e) {
    this.props.actions.change('email', e.currentTarget.value)
  }

  _phone(e) {
    this.props.actions.change('phone', e.currentTarget.value)
  }

  _fax(e) {
    this.props.actions.change('fax', e.currentTarget.value)
  }

  _website(e) {
    this.props.actions.change('website', e.currentTarget.value)
  }

  _people(e) {
    this.props.actions.change('people', e.currentTarget.value)
  }

  _video(e) {
    this.props.actions.change('video', e.currentTarget.value)
  }

  _channel(e) {
    this.props.actions.change('channel', e.currentTarget.value)
  }

  _contact(e) {
    this.props.actions.change('contact', e.currentTarget.value)
  }

  _category(e) {
    this.props.actions.change('category', e.currentTarget.value)
  }

  _about(e) {
    this.props.actions.change('about', e.currentTarget.value)
  }

  _save() {
    this.props.actions.save()
  }
}
