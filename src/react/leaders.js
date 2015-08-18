"use strict";
let React = require('react');
let { Link, RouteHandler } = require('react-router');
let map = require('../map');
let tax = require('../taxonomy');
let msg = require('../actions/alerts').add;

let Leaders = React.createClass({
    getInitialState: function () {
        return {
         id: 4,
         img: "2",
         username: "jessedrelick",
         first: "Jesse",
         last: "Drelick",
         email: "info@jessedrelick.com",
         phone: "(603)783-1358",
         company: "Tyco Int.",
         occupation: "Front-End Engineer",
         website: "www.jessedrelick.com",
         dob: "July 9, 1987",
         gender: "M",
         address: {
             street: "100 White Cap Lane",
             city: "Newport Coast",
             state: "CA",
             zip: "92657"
         }
       }
    },
     render: function () {
        return (
          <div className="leaders">
            <h1>Leaders</h1>
            <Filter {...this.state} />
            <Visualization {...this.state} />
            <List {...this.state} />
            <Profile {...this.state} />
            <Tabs {...this.state} />
            <RouteHandler {...this.state} />
          </div>
        );
     }
});

let Profile = React.createClass({
    render: function () {
        return (
            <div className="profile">
                <h2>jessedrelick</h2>
                <div className="pic">
                    <img src="/assets/default.png" />
                    <div className="rank">
                        117
                    </div>
                </div>
                <div className="info">
                  <div>{`Full Name: ${this.props.first} ${this.props.last}`}</div>
                  <div>{this.props.address.city}, {this.props.address.state}</div>
                  <div>{this.props.company}</div>
                  <div>{this.props.dob}</div>
                  <div>{this.props.gender}</div>
                </div>
                <div className="compare">
                    <h2>133 Likes</h2>
                    <div>Top User: 1,345 Likes</div>
                    <img src="/assets/percentile.png" />
                </div>
            </div>
        );
    }
});

let Tabs = React.createClass({
  render: function () {
    return (
      <div>
        <ul className="tabs">
          <li>
            <Link to="topPosts"><i className="fa fa-medium" /> Posts</Link>
          </li>
          <li>
            <Link to="topUsers"><i className="fa fa-user" /> Users</Link>
          </li>
          <li>
            <Link to="topOrgs"><i className="fa fa-building" /> Orgs</Link>
          </li>
          <li>
            <Link to="topPhourus"><i className="fa fa-connectdevelop" /> Phourus</Link>
          </li>
        </ul>
      </div>
    );
  }
});

Leaders.Posts = React.createClass({
  render: function () {
    return (
      <div className="tab">
        <Micro type="post" />
      </div>
    )
  }
});

Leaders.Users = React.createClass({
  render: function () {
    return (
      <div className="tab">
        <Micro type="user" />
      </div>
    )
  }});

Leaders.Orgs = React.createClass({
  render: function () {
    return (
      <div className="tab">
        <input type="checkbox" label="Companies" />
        <Micro type="companies" />
        <input type="checkbox" label="Schools" />
        <Micro type="schools" />
        <input type="checkbox" label="Govs" />
        <Micro type="govs" />
        <input type="checkbox" label="Groups" />
        <Micro type="groups" />
      </div>
    )
  }});

Leaders.Phourus = React.createClass({
  render: function () {
    return (
      <div className="tab">
        <Micro type="phourus" />
      </div>
    )
}});

let Filter = React.createClass({
   render: function () {
       return (
         <div className="filter">
           <div className="elements">
              <button className="button green medium">
                World
                <div>[Blogs & Events]</div>
              </button>
              <button className="button blue medium">
                Mind
                <div>[Subjects & Questions]</div>
              </button>
              <button className="button red medium">
                Voice
                <div>[Debates & Polls]</div>
              </button>
              <button className="button gold medium">
                Self
                <div>[Quotes & Beliefs]</div>
              </button>
              <button className="button">Select All</button>
            </div>
         </div>
       );
   }
});

let Visualization = React.createClass({
    getInitialState: function () {
      return {
          type: "donut",
          metric: "likes",
          data: [1345, 1280, 1156, 1002, 922, 897, 773, 625, 572, 412]
      };
    },
    render: function () {
      return (
        <div className="visualization">
          <div className="metric">
            <select>
                <option>User Influence Points</option>
                <option>Popularity</option>
                <option>Comments</option>
                <option>Views</option>
                <option>Likes</option>
            </select>
          </div>
          <div className="visual">
            <select onChange={this._visual}>
                <option>Map</option>
                <option>Heatmap</option>
                <option value="bar">Bar chart</option>
                <option value="donut">Pie chart</option>
                <option>Area Chart</option>
            </select>
          </div>
          <div className="date">
            <button className="button blue">3/15/2015 <i className="fa fa-calendar" /></button>
          </div>
          <Chart {...this.state} />
        </div>
      );
    },
    _visual: function (e) {
      let id = e.currentTarget.value;
      this.setState({type: id});
    }
});

let Map = React.createClass({
    componentDidMount: function () {
      //map.render();
    },
    render: function () {
        return (
            <div id="map"></div>
        );
    }
});

let Chart = React.createClass({
  render: function () {
    this._draw();
    return (
      <div id="chart"></div>
    );
  },
  _draw: function () {
    let options = {};
    let columns = this.props.data;

    switch (this.props.type) {
      case 'bar':
        columns.unshift(this.props.metric);
        options.data = {columns: [columns], type: this.props.type};
        options.bar = {
              width: {
                  ratio: 0.8 // this makes bar width 50% of length between ticks
              }
          };
        options.axis = {
            x: {
              tick: {
                format: function (x) { return `#${x + 1}`; },
                culling: false
              }
            }
          };
        break;
      case 'donut':
        options.data = {columns: [], type: this.props.type}
        for (let i in columns) {
          options.data.columns.push([`#${i}`, columns[i]]);
        }

        options.donut = {
          title: "likes"
        };
        break;
    }

    c3.generate(options);
  }
})

let List = React.createClass({
    getInitialState: function () {
      return {
        leaders: [
          {
            name: "Jesse Drelick",
            title: "Lead Gangsta'",
            company: "Phourus Inc.",
            location: "Santa Monica, CA"
          },
          {
            name: "Bob Smith",
            title: "Some Guy",
            company: "SomeCorp Inc.",
            location: "Irvine, CA"
          },
          {
            name: "Bonnie Clyde",
            title: "Some Position",
            company: "Another LLC",
            location: "Portsmouth, NH"
          }
        ]
      }
    },
    render: function () {
        return (
          <div className="list">
            <Item {...this.state.leaders[1]} />
            <Item {...this.state.leaders[0]}  />
            <Item {...this.state.leaders[2]} />
          </div>
        );
    }
});

let Item = React.createClass({
    render: function () {
        return (
            <div>
              <div className="heading">
                <i className="fa fa-bookmark" />
                #1 out of 3,241
              </div>
              <div className="center">
                <img src="/assets/avatars/1.jpg" />
                <h3 className="centerText">{this.props.name}</h3>
              </div>
              <div className="footing">
                <div>{this.props.location}</div>
                <div>{this.props.title}</div>
              </div>
            </div>
        );
    }
});

let Select = React.createClass({
    render: function () {
        let list = this.props.data.map(function (item) {
            return <option key={item.label} value={item.value}>{item.label}</option>;
        });
        return (
            <select>
                {list}
            </select>
        );
    }
});

let Micro = React.createClass({
    render: function () {
/*
        if (this.props.type) {
            return (<div></div>);
        }
*/
        switch (this.props.type) {
            case 'post':
                return (
                  <div>
                    <label>Keyword <input /></label>
                    <label>Category <Select data={tax.filters.users.gender}></Select></label>
                    <label>Subcategory <Select data={tax.filters.users.party}></Select></label>
                    <label>Another <Select data={tax.filters.users.religion}></Select></label>
                  </div>
                );
            break;
            case 'user':
                return (
                  <div>
                    <label>Members <Select data={tax.filters.groups.members}></Select></label>
                    <label>Type <Select data={tax.filters.groups.type}></Select></label>
                    <label>Size <Select data={tax.filters.groups.size}></Select></label>
                  </div>
                );
            break;
            case 'phourus':
                return (
                  <div></div>
                );
            break;
            case 'company':
                return (
                   <div>
                    <label>Members</label>
                    <Select data={tax.companies.members}></Select>
                    <label>Type</label>
                    <Select data={tax.companies.type}></Select>
                    <label>Size</label>
                    <Select data={tax.companies.size}></Select>
                  </div>
                );
            break;
            case 'school':
                return (
                   <div>
                    <label>Members</label>
                    <Select data={tax.schools.members}></Select>
                    <label>Type</label>
                    <Select data={tax.schools.type}></Select>
                    <label>Size</label>
                    <Select data={tax.schools.size}></Select>
                  </div>
                );
            break;
            case 'gov':
                return (
                  <div>
                    <label>Members</label>
                    <Select data={tax.govs.members}></Select>
                    <label>Type</label>
                    <Select data={tax.govs.type}></Select>
                    <label>Size</label>
                    <Select data={tax.govs.size}></Select>
                  </div>
                );
            break;
            case 'groups':
                return (
                  <div>
                    <label>Members</label>
                    <Select data={tax.filters.groups.members}></Select>
                    <label>Type</label>
                    <Select data={tax.filters.groups.type}></Select>
                    <label>Size</label>
                    <Select data={tax.filters.groups.size}></Select>
                  </div>
                );
            break;
            default:
                return (
                    <div></div>
                );
            break;
        }
    }
});

module.exports = Leaders;
