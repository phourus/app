/** @jsx React.DOM */
"use strict";
var React = require('react');

var Profile = React.createClass({
     getDefaultProps: function () {
       return {
           profile: {
               username: "jessedrelick",
               type: "individual"       
           },
           stats: {
               people: 1434,
               members: 143,
               pending: 22,
               influence: 55
           },
           view: 'info',
           widget: 'about'
       }  
     },
     componentDidMount: function () {
		var update = this.props.update;
		$.ajax({
			url: "/rest/account",
			dataType: "json",
			success: function (data) {
				update({posts: data});
			},
			error: function (err) {
				console.log(err);
			}
		});		
	 },
     update: function (obj) {
		 this.setProps(obj);
	 },
     render: function () {
          return (
            <div className="profile">
                <Heading profile={this.props.profile} stats={this.props.stats} />
                <Tabs />
                <Views widget={this.props.widget} profile={this.props.profile} stats={this.props.stats} />
            </div>
          );
     }
});

var Heading = React.createClass({
    render: function () {
        return (
            <div className="heading">
                <h1>{this.props.profile.username}</h1>
                <Basic className="basic" />
                <Details className="details" stats={this.props.stats} profile={this.props.profile} />
                <Stats className="stats" />
            </div>
        );
    }    
});

var Basic = React.createClass({
    render: function () {
        return (
          <div className="basic">Basic</div>      
        );
    } 
});

var Details = React.createClass({
    render: function () {
        var details;
        switch(this.props.profile.type){
            case 'individual':
                details = <li></li>;
            break;
            case 'company':
                details = <li><strong>Employees:</strong> {this.props.stats.people}</li>;
            break;
            case 'school':
                details = <li><strong>Students/Faculty:</strong> {this.props.stats.people}</li>;
            break;
            case 'gov':
                details = <li><strong>Population:</strong> {this.props.stats.people}</li>;
            break;
            case 'group':
                details = <li><strong>Members:</strong> {this.props.stats.people}</li>;
            break;
        }
        return (
            <div className="stats">
            	<div className="influence">{this.props.stats.influence}</div>
            	<ul className="detail">
                    {details}
            		<li><strong>Members:</strong> {this.props.stats.members}</li>
            		<li><strong>Pending:</strong> {this.props.stats.pending}</li>
            	</ul>	 
            </div>
        );
    } 
});

var Stats = React.createClass({
    render: function () {
        return (
          <div className="stats">Stats</div>      
        );
    } 
});

var Tabs = React.createClass({
    render: function () {
        return (
          <div className="tabs">
              <ul>
                <li><a href="/profile/1/about" className="selected">Info</a></li>
                <li><a href="/profile/1/posts">Posts</a></li>
                <li><a href="/profile/1/rank">Rank</a></li>
                <li><a href="/profile/1/users">Members</a></li>
                <li><a href="/profile/1/extras">Extras</a></li>
              </ul>
          </div>
        );
    } 
});

var Views = React.createClass({
    render: function () {
        return (
            <div className="views">
                <ViewInfo path="/profile/1/info" widget={this.props.widget} />
                <ViewPosts path="/profile/1/posts" />
                <ViewMembership path="/profile/1/membership" />
                <ViewRank path="/profile/1/rank" />
                <ViewExtras widget={this.props.widget} profile={this.props.profile} />
            </div>
        );
    } 
});


var ViewInfo = React.createClass({
    render: function () {
        return (
          <div className="viewInfo">
              <ul>
                <li><a href="/profile/1/about">About</a></li>
                <li><a href="/profile/1/social">Social</a></li>
                <li><a href="/profile/1/reviews">Reviews</a></li>
                <li><a href="/profile/1/clout">Clout</a></li>
                <li><a href="/profile/1/events">Events</a></li>
                <li><a href="/profile/1/contact">Contact</a></li>
              </ul>
              <Widget widget={this.props.widget} />
          </div>
        );
    }
});

var ViewPosts = React.createClass({
    render: function () {
        return (
            <div className="viewPosts">Posts</div>
        );
    }
});

var ViewRank = React.createClass({
    render: function () {
        return (
            <div className="viewRank">Rank</div>
        );
    }    
});

var ViewMembership = React.createClass({
    render: function () {
        return (
            <div className="viewMembership">Membership</div>
        );
    }    
});

var ViewExtras = React.createClass({
    render: function () {
        var specific;
        switch(this.props.profile.type){
            case 'individual':
                specific = <li></li>;
            break;
            case 'company':
                specific = <li><a href="/profile/1/extras">Mission</a></li>;
            break;
            case 'school':
                specific = <li><a href="/profile/1/extras">Featured Students</a></li>;
              /*<li><a href="/profile/1/extras">Student Body</a></li>
              <li><a href="/profile/1/extras">Courses &amp; Departments</a></li>
              <li><a href="/profile/1/extras">School Schedule</a></li>
              <li><a href="/profile/1/extras">Administration</a></li>
              <li><h3>PRIVATE</h3></li>
              <li><a href="/profile/1/extras">Grades</a></li>
              <li><a href="/profile/1/extras">Assignments</a></li>;*/
            break;
            case 'gov':
                specific = <li><a href="/profile/1/extras">Climate & Demographics</a></li>;
                /*
              <li><a href="/profile/1/extras">Financial</a></li>
              <li><a href="/profile/1/extras">Projects</a></li>
              <li><a href="/profile/1/extras">Real Estate</a></li>;*/
            break;
            case 'group':
                specific = <li><a href="/profile/1/extras">Donate</a></li>;
            break;
        }
        
        return (
          <div className="viewExtras">
              <ul class="extras">  
                {specific} 
                <li><h3>COMMON</h3></li>
                <li><a href="/profile/1/extras">Jobs</a></li>
                <li><a href="/profile/1/extras">Org Chart</a></li>
                <li><a href="/profile/1/extras">Pages</a></li>
                <li><a href="/profile/1/extras">* Feedback</a></li>
              </ul>
              <Widget widget={this.props.widget} />
          </div>
        );
    } 
});

var Widget = React.createClass({
    render: function () {
        return (
            <div className="widget"></div>
        );
    }
});

module.exports = Profile;