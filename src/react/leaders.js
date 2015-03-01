/** @jsx React.DOM */
"use strict";
var React = require('react');
var tax = require('../taxonomy');

var Leaders = React.createClass({
     render: function () {
        return (
          <div>
            <h1>Leaders</h1>
            <Profile {...this.props} />
            <Filter {...this.props} />
            <Micro {...this.props} />
            <Map {...this.props} />
            <List {...this.props} />
          </div>
        );
     }
});

var Profile = React.createClass({
    render: function () {
        return (
            <div>
                <h2>jessedrelick</h2>
                <div className="pic">
                    <img src="/assets/default.png" />
                </div>
                <div className="rank">
                    117
                </div>
                <ul className="compare">
                    <li>133 Likes</li>
                    <li>Next User</li>
                    <li>Top User</li>
                </ul>
            </div>
        );
    }
});

var Filter = React.createClass({
   render: function () {
       return (
         <div>
            <select>
                <option>All</option>
                <option>World (Blogs & Events)</option>
                <option>Mind (Subjects & Questions)</option>
                <option>Voice (Debates & Polls)</option>
                <option>Self (Quotes & Beliefs)</option>
            </select>
            <select>
                <option>User Influence Points</option>
                <option>Popularity</option>
                <option>Comments</option>
                <option>Views</option>
                <option>Likes</option>
            </select>
            <br />
            <input type="checkbox" label="Individuals" />
            <Micro type="users" />
            <input type="checkbox" label="Companies" />
            <Micro type="companies" />
            <input type="checkbox" label="Schools" />
            <Micro type="schools" />
            <input type="checkbox" label="Govs" />
            <Micro type="govs" />
            <input type="checkbox" label="Groups" />
            <Micro type="groups" />
         </div>
       );
   } 
});

var Select = React.createClass({
    render: function () {
        var list = this.props.data.map(function (item) {
            return <option key={item.label} value={item.value}>{item.label}</option>;
        });
        return (
            <select>
                {list}
            </select>
        );
    }    
});

var Micro = React.createClass({
    render: function () {
/*
        if (this.props.type) {
            return (<div></div>);
        }
*/
        switch (this.props.type) {
            case 'user':
                return (
                  <div>
                    <label>Age</label>
                    <Select data={tax.filters.users.age}></Select>
                    <label>Gender</label>
                    <Select data={tax.filters.users.gender}></Select>
                    <label>Party</label>
                    <Select data={tax.filters.users.party}></Select>
                    <label>Religion</label>
                    <Select data={tax.filters.users.religion}></Select>
                  </div>
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

var Map = React.createClass({
    render: function () {
        return (
            <div>Map</div>
        );
    }
});

var List = React.createClass({
    render: function () {
        var list = <Item />;
        return (
            <div>
                {list}
            </div>
        );
    }
});

var Item = React.createClass({
    render: function () {
        return (
            <div>Item</div>
        );
    }
});

module.exports = Leaders;