'use strict';
let React = require('react');
let Router = require('react-router');
let { Link, History } = Router;

let Store = require('../stores/admin');
let Actions = require('../actions/admin');

let Admin = React.createClass({
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
        green: [],
        blue: [],
        red: [],
        gold: []
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
    let copy = this.state;
    copy._route = this.props._route;
    return (
      <div className="admin">
        <Tabs {...this.state} _route={this.props._route} />
        {React.cloneElement(this.props.children, copy)}
      </div>
    );
  },
  _route: function () {
    let params = this.props.params || {};
    let id = params.id;
    if (id) {
      Actions.single(id);
      Actions.Members.collection(id);
    }
  }
});

let Tabs = React.createClass({
    mixins: [History],
    render: function () {
      let route = this.props._route;
      let view = route.type;
      let categories = this._categories();
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
      this.history.pushState(null, `/admin/${this.props.org.id}/${id}`);
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

module.exports = Admin;
