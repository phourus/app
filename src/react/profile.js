"use strict";
let React = require('react');
let Router = require('react-router');
let { Link, RouteHandler } = Router;
let msg = require('../actions/alerts').add;
let Actions = require('../actions/profile');
let { User, Org } = Actions;

let Profile = React.createClass({
     mixins: [Router.State],
     getInitialState: function () {
        return {
            id: "",
            type: "",
            profile: {}
        }
     },
     componentDidMount: function () {
        let params = this.getParams();
    		if (params.type === 'org') {
        		Org.single(params.id);
    		} else {
        		User.single(params.id);
    		}
  	 },
     render: function () {
          return (
            <div className="profile">
                <Heading {...this.state} />
                <RouteHandler {...this.state} />
            </div>
          );
     }
});

let Heading = React.createClass({
    render: function () {
        return (
            <div className="heading">
                <h1>{this.props.profile.username || this.props.profile.shortname}</h1>
                <Basic className="basic" {...this.props} />
                <Details className="details" {...this.props} />
                <Stats className="stats" {...this.props} />
            </div>
        );
    }
});

let Basic = React.createClass({
    render: function () {
        return (
          <div className="basic">Basic</div>
        );
    }
});

let Details = React.createClass({
    render: function () {
/*
        let details;
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
*/
/*
                <li><Link to={type + id + "/posts"}>1032 Posts</Link></li>
                <li><Link href={type + id + "/members"}>244 Members</Link></li>
                <li><Link href={type + id + "/events"}>15 Events</Link></li>
                <li><Link href={type + id + "/reviews"}>22 Reviews</Link></li>
*/

        let type, id;
        //type = "/" + this.props._[0] + "/";
        //id = this.props._[1];
        return (
            <ul>
            </ul>
        );
    }
});

let Stats = React.createClass({
    mixins: [Router.State],
    //<Link href={type + id + "/rank"}>View Rank</Link>
    render: function () {
        let type, id;
        let params = this.getParams();
        //type = "/" + params.view + "/";
        //id = params.view;

        return (
          <div className="stats">
            <div className="influence">67</div>

          </div>
        );
    }
});

Profile.About = React.createClass({
    render: function () {
        let clout, contact;
        clout = 'clout goes here';
        contact = 'contact goes here';
        return (
          <div className="viewInfo">
              <h3>About</h3>
              About
              <h3>Social</h3>
              Social info here
              <h3>Clout</h3>
              {clout}
              <h3>Contact</h3>
              {contact}
          </div>
        );
    }
});

Profile.Posts = React.createClass({
    render: function () {
        return (
            <div className="viewPosts">Posts</div>
        );
    }
});

Profile.Rank = React.createClass({
    render: function () {
        return (
            <div className="viewRank">Rank</div>
        );
    }
});

Profile.Members = React.createClass({
    render: function () {
        return (
            <div className="viewMembership">Membership</div>
        );
    }
});

Profile.Reviews = React.createClass({
    render: function () {
        return (
            <div className="viewReviews">Reviews</div>
        );
    }
});

Profile.Events = React.createClass({
    render: function () {
        return (
            <div className="viewEvents">Events</div>
        );
    }
});

let Premium = React.createClass({
    render: function () {
        let specific;
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
              <ul className="extras">
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

let Widget = React.createClass({
    render: function () {
        return (
            <div className="widget">Widget</div>
        );
    }
});

module.exports = Profile;
