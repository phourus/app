let React = require('react');
let Router = require('react-router');
let { RouteHandler, Link, State } = Router;

let Store = require('../stores/admin');
let Actions = require('../actions/admin');
let ImageUploader = require('../pic');

let Admin = React.createClass({
  mixins: [State],
  getInitialState: function () {
    return {
      org: {
        id: 0,
        img: null,
        name: "",
        type: "",
        address: {},
      },
      changes: {},
      members: [],
      categories: {
        green: [
          {category: "Sales", subcategories: ["Fire Safety", "Security", "Retail", "Personal Protection"]},
          {category: "Marketing", subcategories: ["Fire Safety", "Security", "Retail", "Personal Protection"]},
          {category: "Admin", subcategories: ["Fire Safety", "Security", "Retail", "Personal Protection"]},
          {category: "Finance", subcategories: ["Fire Safety", "Security", "Retail", "Personal Protection"]},
          {category: "HR", subcategories: ["Fire Safety", "Security", "Retail", "Personal Protection"]},
          {category: "Product", subcategories: ["Fire Safety", "Security", "Retail", "Personal Protection"]}
        ],
        blue: [
          {category: "Fire Safety", subcategories: ["Commercial", "Residential"]},
          {category: "Security", subcategories: ["Intrusion", "Video Surveillance", "Access Control"]},
          {category: "Retail", subcategories: ["RFID tags", "Loss Prevention", "Traffic Intelligence"]},
          {category: "Personal Protection", subcategories: ["Respiratory", "Eye, Ear & Face", "Communication"]}
        ],
        red: [
          {category: "Fire Safety", subcategories: ["Commercial", "Residential"]},
          {category: "Security", subcategories: ["Intrusion", "Video Surveillance", "Access Control"]},
          {category: "Retail", subcategories: ["RFID tags", "Loss Prevention", "Traffic Intelligence"]},
          {category: "Personal Protection", subcategories: ["Respiratory", "Eye, Ear & Face", "Communication"]}
        ],
        gold: [
          {category: "Vision & Mission"},
          {category: "Inspiration & Motivation"}
        ],
      }
    }
  },
  componentDidMount: function () {
    this.unsubscribe = Store.listen(data => {
      this.setState(data);
    });
    this.unsubscribeMembers = Store.Members.listen(data => {
      this.setState({members: data});
    });
    this._route();
  },
  componentWillUnmount: function () {
    this.unsubscribe();
    this.unsubscribeMembers();
  },
  componentWillReceiveProps: function () {
    this._route();
  },
  render: function () {
    return (
      <div className="admin">
        <Heading {...this.state} />
        <Tabs {...this.state} />
        <RouteHandler {...this.state} />
      </div>
    );
  },
  _route: function () {
    let id = this.getParams().id || null;
    if (id) {
      Actions.single(id);
      Actions.Members.collection(id);
    }
  }
});

let Heading = React.createClass({
  render: function () {
    return (
      <div className="heading">
        <Pic id={this.props.org.id} img={this.props.org.img} />
        <Basic {...this.props} />
      </div>
    );
  }
});

let Pic = React.createClass({
  getInitialState: function () {
    return {
      img: '/assets/avatars/default.jpg',
      default: '/assets/avatars/default.jpg',
      upload: 0
    }
  },
  componentDidMount: function () {
    this.uploader = document.getElementById('uploader');
  },
  componentWillReceiveProps: function (data) {
    if (data.img) {
      data.upload = this.state.upload + 1;
      this.setState(data);
    }
  },
  render: function () {
    return (
      <div className="pic">
        <input id="uploader" type="file" name="uploader" className="uploader" />
        <img src={this.state.img + '?upload=' + this.state.upload} onClick={this._upload} onError={this._default} />
      </div>
    );
  },
  _upload: function (e) {
    var id = this.state.id;
    this.uploader.click();
    var uploader = new ImageUploader({
      inputElement: this.uploader,
      uploadUrl: '/rest/orgs/' + id + '/pic',
      headers: {
        "Authorization": require('../token').get()
      },
      onProgress: function (event) {
        // event.done, event.total
      },
      onFileComplete: function (event, file) {
        // file.fileName, event.target.status
      },
      onComplete: function (event) {
        Actions.single(id);
        // event.done, event.total
      },
      maxWidth: 400,
      quality: 1,
      //timeout: 5000,
      debug : true
    });
  },
  _default: function () {
    this.setState({img: this.state.default});
  }
});

let Basic = React.createClass({
  render: function () {
    let address = this.props.org.address || {};
    return (
      <div className="basic">
        <div className="name">{this.props.org.name}</div>
        <div className={this.props.org.type + " type"}>{this.props.org.type.toUpperCase()}</div>
        {address.city || address.state ? <div>{address.city}{address.city && address.state ? ", " : ""}{address.state}</div> : false}
        {this.props.org.website ? <div><a href={this.props.org.website} target="_blank">{this.props.org.website}</a></div> : false}
        {this.props.org.phone ? <div>{this.props.org.phone}</div> : false}
        {this.props.org.email ? <div><a href={"mailto:" + this.props.org.email + "&Subject=Phourus"}>{this.props.org.email}</a></div> : false}
      </div>
    );
  }
});

let Tabs = React.createClass({
    mixins: [Router.Navigation, Router.State],
    render: function () {
      let view = this.context.router.getCurrentRoutes()[2].name;
      let categories = this._categories();
      let details = this._details();
      let users = this._users();
      return (
        <div className="tabs">
          <div onClick={this._select.bind(this, 'details')} className={'details' === view ? 'selected' : ''}>
            <div className="number">{details}%</div>
            <div className="label">Details</div>
          </div>
          <div onClick={this._select.bind(this, 'users')} className={'users' === view ? 'selected' : ''}>
            <div className="number">{users.approved}<span className="pending">{users.pending}</span></div>
            <div className="label">Users</div>
          </div>
          <div onClick={this._select.bind(this, 'categories')} className={'categories' === view ? 'selected' : ''}>
            <div className="number">{categories.primary}/{categories.subcategories}</div>
            <div className="label">Categories</div>
          </div>
          <div onClick={this._select.bind(this, 'teams')} className={'teams' === view ? 'selected' : ''}>
            <div className="number">0</div>
            <div className="label">Teams</div>
          </div>
        </div>
      )
    },
    _select: function (id) {
      this.transitionTo(id, {id: this.props.org.id});
    },
    _details: function () {
      // swap 'name' with 'category' when categories are determined
      let notNull = ['name', 'email', 'phone', 'fax', 'website', 'people', 'video', 'channel', 'contact', 'about'].filter((key) => {
        if (this.props.org[key]) {
          return true;
        }
        return false;
      });
      return notNull.length * 10;
    },
    _users: function () {
      let approved = this.props.members.filter((obj) => {
        if (obj.approved) {
          return true;
        }
        return false;
      });
      return  {
        approved: approved.length,
        pending: (this.props.members.length - approved.length)
      };
    },
    _categories: function () {
      let cats = this.props.categories;
      let countCat = [cats.green.length, cats.blue.length, cats.red.length, cats.gold.length]
      .reduce((prev, current, index, elements) => {
        return current + prev;
      });
      let subs = Object.keys(cats).map(key => {
        let category = cats[key];
        if (!category.length) {
          return false;
        }
        return category
        .map(item => {
          if (!item.subcategories) {
            return 0;
          }
          return item.subcategories.length;
        })
        .reduce((prev, current, index, elements) => {
          return prev + current;
        });
      });
      let countSub = subs
      .reduce((prev, current, index, elements) => {
        return current + prev;
      });
      return {
        primary: countCat,
        subcategories: countSub
      }
    }
});

Admin.Details = React.createClass({
  render: function () {
    let org = this.props.org || {};
    Object.keys(this.props.changes).forEach((key) => {
      org[key] = this.props.changes[key];
    });
    return (
      <div className="info">
        <div id="user_basic">
          <label>Shortname
            <input className={this.props.changes.shortname ? 'changed' : ''} type="text" value={org.shortname} disabled="true" />
          </label>
          <label>Type
            <input className={this.props.changes.type ? 'changed' : ''} type="text" value={org.type} disabled="true" />
          </label>
          <label>Company Name
            <input className={this.props.changes.name ? 'changed' : ''} type="text" value={org.name} onChange={this._name} />
          </label>
          <label>Email
            <input className={this.props.changes.email ? 'changed' : ''} type="text" value={org.email} onChange={this._email} />
          </label>
          <label>Phone
            <input className={this.props.changes.phone ? 'changed' : ''} type="text" value={org.phone} onChange={this._phone} />
          </label>
          <label>Fax
            <input className={this.props.changes.fax ? 'changed' : ''} type="text" value={org.fax} onChange={this._fax} />
          </label>
          <label>Website
            <input className={this.props.changes.website ? 'changed' : ''} type="text" value={org.website} onChange={this._website} />
          </label>
          <label>People
            <input className={this.props.changes.people ? 'changed' : ''} type="text" value={org.people} onChange={this._people} />
          </label>
          <label>Video
          <input className={this.props.changes.video ? 'changed' : ''} type="text" value={org.video} onChange={this._video} />
          </label>
          <label>Youtube Channel
            <input className={this.props.changes.channel ? 'changed' : ''} type="text" value={org.channel} onChange={this._channel} />
          </label>
          <label>Contact
            <input className={this.props.changes.contact ? 'changed' : ''} type="text" value={org.contact} onChange={this._contact} />
          </label>
          <label>Category
            <select className={this.props.changes.category ? 'changed' : ''} value={org.category} onChange={this._category}>
              <option value="">--Please select a category--</option>
            </select>
          </label>
          <label className="full">About
            <textarea className={this.props.changes.about ? 'changed' : ''} value={org.about} onChange={this._about}></textarea>
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

Admin.Users = React.createClass({
  render: function () {
    return (
      <div>
        {this.props.members.map(member => {
          return (
            <div>
              {member.first} {member.last}
              {member.admin
                ? <button id={member.memberId} className="button red" onClick={this._revoke}>Revoke Admin</button>
              : <button id={member.memberId} className="button blue" onClick={this._admin}>Make Admin</button>
              }
              {member.approved
                ? <button id={member.memberId} className="button red" onClick={this._deny}>Remove Member</button>
                : <button id={member.memberId} className="button green" onClick={this._approve}>Approve Member</button>
              }
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

Admin.Categories = React.createClass({
  render: function () {
    return (
      <div>
        {Object.keys(this.props.categories).map(element => {
          let categories = this.props.categories[element];
          return (
            <ul className={element}>
              {categories.map(category => {
                return (<li>{category.category}
                    {category.subcategories
                      ? <ul>
                          {category.subcategories.map(subcategory => {
                            return <li>{subcategory}</li>
                          })}
                        </ul>
                      : false
                    }
                  </li>
                );
              })}
            </ul>
          );
        })}
      </div>
    );
  }
});

Admin.Teams = React.createClass({
  render: function () {
    return (
      <div>
        <h2>Coming Soon</h2>
        <p>Would you like to create smaller groups within your Organization? Teams can help you do just that! <a href="mailto:info@phourus.com&Subject=Teams">Contact us for more information.</a></p>
      </div>
    );
  }
});

module.exports = Admin;
