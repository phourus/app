let React = require('react');
let Router = require('react-router');
let { RouteHandler, Link } = Router;

let Admin = React.createClass({
  getInitialState: function () {
    return {
      id: 1,
      img: 1,
      name: "ABC Company",
      address: {
        city: "Santa Monica",
        state: "CA"
      },
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
  render: function () {
    return (
      <div className="admin">
        <Heading {...this.state} />
        <Tabs {...this.state} />
        <RouteHandler {...this.state} />
      </div>
    );
  }
});

let Heading = React.createClass({
  render: function () {
    return (
      <div className="heading">
        <Pic {...this.props} />
        <Basic {...this.props} />
      </div>
    );
  }
});

let Pic = React.createClass({
  render: function () {
    //<Link href="/account/password">Change my password</Link>
    return (
      <div className="pic">
        <Link to="user" params={{id: this.props.id}}>
          <img src={`/assets/avatars/${this.props.img}.jpg`} />
        </Link>
      </div>
    );
  }
});

let Basic = React.createClass({
  render: function () {
    return (
      <div className="basic">
        <div>{this.props.name}</div>
        <div>{this.props.address.city}, {this.props.address.state}</div>
      </div>
    );
  }
});

let Tabs = React.createClass({
    mixins: [Router.Navigation, Router.State],
    getInitialState: function () {
      return {
        id: 3,
        details: 70,
        users: 142,
        pending: 11,
        apps: 6
      }
    },
    render: function () {
      let view = this.context.router.getCurrentRoutes()[2].name;
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
      return (
        <div className="tabs">
          <div onClick={this._select.bind(this, 'details')} className={'details' === view ? 'selected' : ''}>
            <div className="number">{this.state.details}%</div>
            <div className="label">Details</div>
          </div>
          <div onClick={this._select.bind(this, 'users')} className={'users' === view ? 'selected' : ''}>
            <div className="number">{this.state.users}<span className="pending">{this.state.pending}</span></div>
            <div className="label">Users</div>
          </div>
          <div onClick={this._select.bind(this, 'categories')} className={'categories' === view ? 'selected' : ''}>
            <div className="number">{countCat}/{countSub}</div>
            <div className="label">Categories</div>
          </div>
          <div onClick={this._select.bind(this, 'apps')} className={'apps' === view ? 'selected' : ''}>
            <div className="number">{this.state.apps}</div>
            <div className="label">Apps</div>
          </div>
        </div>
      )
    },
    _select: function (id) {
      this.transitionTo(id, {id: this.state.id});
    }
});

Admin.Details = React.createClass({
  render: function () {
    return (
      <div>Organization Details</div>
    );
  }
});

Admin.Users = React.createClass({
  render: function () {
    return (
      <div>Manage Users</div>
    );
  }
});

Admin.Categories = React.createClass({
  render: function () {
    return (
      <div>
        <h2>Manage Categories</h2>
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

Admin.Apps = React.createClass({
  render: function () {
    return (
      <div>Apps</div>
    );
  }
});

module.exports = Admin;
