'use strict';
let React = require('react');

let Actions = require('../../actions/profile').Org;
let Store = require('../../stores/orgs');

module.exports = React.createClass({
  contextTypes: {
    route: React.PropTypes.object
  },
  getInitialState: function () {
    return {
      org: {},
      changes: {}
    };
  },
  componentDidMount: function () {
    let route = this.context.route;
    this.unsubscribe = Store.listen(data => {
      if (data.org) {
        this.setState({org: data.org});
      }
      if (data.changes) {
        this.setState({changes: data.changes});
      }
    });
    if (route.id) {
      Actions.single(route.id);
    }
  },
  componentWillUnmount: function () {
    this.unsubscribe();
  },
  render: function () {
    let org = this.state.org || {};
    Object.keys(this.state.changes).forEach((key) => {
      org[key] = this.state.changes[key];
    });
    return (
      <div className="info">
        <div id="user_basic">
          <label>Shortname
            <input className={this.state.changes.shortname ? 'changed' : ''} type="text" value={org.shortname} disabled="true" />
          </label>
          <label>Type
            <input className={this.state.changes.type ? 'changed' : ''} type="text" value={org.type} disabled="true" />
          </label>
          <label>Company Name
            <input className={this.state.changes.name ? 'changed' : ''} type="text" value={org.name} onChange={this._name} />
          </label>
          <label>Email
            <input className={this.state.changes.email ? 'changed' : ''} type="text" value={org.email} onChange={this._email} />
          </label>
          <label>Phone
            <input className={this.state.changes.phone ? 'changed' : ''} type="text" value={org.phone} onChange={this._phone} />
          </label>
          <label>Fax
            <input className={this.state.changes.fax ? 'changed' : ''} type="text" value={org.fax} onChange={this._fax} />
          </label>
          <label>Website
            <input className={this.state.changes.website ? 'changed' : ''} type="text" value={org.website} onChange={this._website} />
          </label>
          <label>People
            <input className={this.state.changes.people ? 'changed' : ''} type="text" value={org.people} onChange={this._people} />
          </label>
          <label>Video
          <input className={this.state.changes.video ? 'changed' : ''} type="text" value={org.video} onChange={this._video} />
          </label>
          <label>Youtube Channel
            <input className={this.state.changes.channel ? 'changed' : ''} type="text" value={org.channel} onChange={this._channel} />
          </label>
          <label>Contact
            <input className={this.state.changes.contact ? 'changed' : ''} type="text" value={org.contact} onChange={this._contact} />
          </label>
          <label>Category
            <select className={this.state.changes.category ? 'changed' : ''} value={org.category} onChange={this._category}>
              <option value="">--Please select a category--</option>
            </select>
          </label>
          <label className="full">About
            <textarea className={this.state.changes.about ? 'changed' : ''} value={org.about} onChange={this._about}></textarea>
          </label>
          <button className="button green" onClick={this._save}>Save Changes</button>
        </div>
      </div>
    );
  },
  _name: function (e) { Actions.change('name', e.currentTarget.value); },
  _email: function (e) { Actions.change('email', e.currentTarget.value); },
  _phone: function (e) { Actions.change('phone', e.currentTarget.value); },
  _fax: function (e) { Actions.change('fax', e.currentTarget.value); },
  _website: function (e) { Actions.change('website', e.currentTarget.value); },
  _people: function (e) { Actions.change('people', e.currentTarget.value); },
  _video: function (e) { Actions.change('video', e.currentTarget.value); },
  _channel: function (e) { Actions.change('channel', e.currentTarget.value); },
  _contact: function (e) { Actions.change('contact', e.currentTarget.value); },
  _category: function (e) { Actions.change('category', e.currentTarget.value); },
  _about: function (e) { Actions.change('about', e.currentTarget.value); },
  _save: function () {
    Actions.save();
  }
});
