"use strict";
let React = require('react');
let Router = require('react-router');
let { Link, RouteHandler } = Router;
let moment = require('moment');
let msg = require('../actions/alerts').add;
let Actions = require('../actions/profile');
let Store = require('../stores/profile');
let { User, Org } = Actions;

let Profile = React.createClass({
     mixins: [Router.State],
     getInitialState: function () {
         return {
          id: 0,
          img: "",
          username: "",
          first: "",
          last: "",
          email: "",
          phone: "",
          company: "",
          occupation: "",
          website: "",
          dob: "",
          gender: "",
          address: {
              street: "",
              city: "",
              state: "",
              zip: ""
          }
        }
     },
     componentDidMount: function () {
        let params = this.getParams();
    		if (params.type === 'org') {
        	Org.single(params.id);
    		} else {
        	User.single(params.id);
    		}
        this.unsubscribe = Store.listen((data) => {
          this.setState(data);
        });
  	 },
     componentWillUnmount: function () {
       this.unsubscribe();
     },
     render: function () {
          return (
            <div className="profile">
                <h1 className="name"><Link to="user" params={{id: this.state.id}}>{this.state.username || this.state.shortname}</Link></h1>
                <Heading {...this.state} />
                <Tabs />
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
                <Details {...this.props} />
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
    },
    _logout: function () {
      token.remove()
      this.forceUpdate();
   }
});

let Basic = React.createClass({
    render: function () {
        return (
          <div className="basic">
            <div>{this.props.first} {this.props.last}</div>
            <div>{this.props.address.city}, {this.props.address.state}</div>
            <div>{this.props.company}</div>
            <div>{this.props.dob}</div>
            <div>{this.props.gender}</div>
          </div>
        );
    }
});

/** MOVE DETAILS TO ABOUT **/
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
          <div className="details">
            <Stats />
          </div>
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

let Tabs = React.createClass({
    mixins: [Router.Navigation, Router.State],
    getInitialState: function () {
      return {
        id: 3,
        influence: 66,
        posts: 23,
        orgs: 2,
        events: 6,
        reviews: 45
      }
    },
    render: function () {
      let view = this.context.router.getCurrentRoutes()[2].name;
      return (
        <div className="tabs">
          <div onClick={this._select.bind(this, 'rank')} className={'rank' === view ? 'selected' : ''}>
            <div className="number">{this.state.influence}</div>
            <div className="label">Influence</div>
          </div>
          <div onClick={this._select.bind(this, 'userPosts')} className={'posts' === view ? 'selected' : ''}>
            <div className="number">{this.state.posts}</div>
            <div className="label">Posts</div>
          </div>
          <div onClick={this._select.bind(this, 'membership')} className={'membership' === view ? 'selected' : ''}>
            <div className="number">{this.state.orgs}</div>
            <div className="label">Orgs</div>
          </div>
          <div onClick={this._select.bind(this, 'events')} className={'events' === view ? 'selected' : ''}>
            <div className="number">{this.state.events}</div>
            <div className="label">Events</div>
          </div>
          <div onClick={this._select.bind(this, 'reviews')} className={'reviews' === view ? 'selected' : ''}>
            <div className="number">{this.state.reviews}</div>
            <div className="label">Reviews</div>
          </div>
        </div>
      )
    },
    _select: function (id) {
      this.transitionTo(id, {id: this.state.id});
    }
});

Profile.About = React.createClass({
    getInitialState: function () {
      return {
        about: "about",
        locations: [
          {
            name: "California Office",
            street: "100 White Cap Lane",
            city: "Newport Coast",
            state: "CA",
            zip: "92657",
            email: "info@jessedrelick.com",
            phone: "(603)783-1368",
            fax: "(603)its-2015"
          },
          {
            name: "New Hampshire Office",
            street: "100 White Cap Lane",
            city: "Newport Coast",
            state: "CA",
            zip: "92657",
            email: "info@jessedrelick.com",
            phone: "(603)783-1368",
            fax: "(603)its-2015"
          },
          {
            name: "Colorado Office",
            street: "100 White Cap Lane",
            city: "Newport Coast",
            state: "CA",
            zip: "92657",
            email: "info@jessedrelick.com",
            phone: "(603)783-1368",
            fax: "(603)its-2015"
          },
          {
            name: "North Carolina Office",
            street: "100 White Cap Lane",
            city: "Newport Coast",
            state: "CA",
            zip: "92657",
            email: "info@jessedrelick.com",
            phone: "(603)783-1368",
            fax: "(603)its-2015"
          },
          {
            name: "Massachusetts Office",
            street: "100 White Cap Lane",
            city: "Newport Coast",
            state: "CA",
            zip: "92657",
            email: "info@jessedrelick.com",
            phone: "(603)783-1368",
            fax: "(603)its-2015"
          }
        ]
      }
    },
    render: function () {
        return (
          <div className="viewInfo">
              <h3>About</h3>
              <p>Zionjo alo id lauh min wuleut tel wefer ciru det pik mof hipugwij leb opduh. Pa laava viege hosibo merliwe me ravwabo gehoav apelabube wijpoz kejjoh vammem giz. Neg niguwbe nu we vu ki geowucu wuta femdu hebculot pijeppi eb. Bazlo medhizkoh kuv noze kavpokin wos unani borafi siv lufep ukeuzzat weboc mazmios vanijiz tamvet biemuoja feco fozew.</p>
              <p>Gusajagak koltit te me zudzun sogiepi kizuj batoziwil kugwet co buskuamu ov. Fe mirbe umo wubo eca ne ge wurja zuhfod esihjaf akisubec gutnirot etewicog defba sebavla edoji tetgihaf. Zuubikir suruvzi ug iminuw eve nu lulfaohu hagi gidapohod seudo pac esuvsuh pitjoca pucporola jofzemda erijatpo bi zac.</p>
              <Contact locations={this.state.locations}/>
          </div>
        );
    }
});

let Contact = React.createClass({
  render: function () {
    return (
      <div className="contact">
        {this.props.locations.map(function (item) {
          return (
            <div key={item.name}>
              <i className="fa fa-map-marker" />
              <div className="info">
                <h3 className='name'>{item.name}</h3>
                <div className="address">
                  {item.street}<br />
                {item.city}, {item.state} {item.zip}<br /><br />
                </div>
                <div className="email"><strong>Email: </strong><a href={item.email}>{item.email}</a></div>
                <div className="phone"><strong>Phone: </strong>{item.phone}</div>
                <div className="fax"><strong>Fax: </strong>{item.fax}</div>
              </div>
            </div>
          )
        })}
      </div>
    );
  }
});

Profile.Posts = React.createClass({
    render: function () {
        return (
            <div className="viewPosts">
              <h2>Posts</h2>
            </div>
        );
    }
});

Profile.Rank = React.createClass({
    render: function () {
        return (
            <div className="viewRank">
              <h2>Influence</h2>
            </div>
        );
    }
});

Profile.Membership = React.createClass({
    render: function () {
        return (
            <div className="viewMembership">
              <h2>Membership</h2>
            </div>
        );
    }
});

Profile.Reviews = React.createClass({
  getInitialState: function () {
    return {
      reviews: [
        {
          title: "Great Company",
          content: "Pa laava viege hosibo merliwe me ravwabo gehoav apelabube wijpoz kejjoh vammem giz. Neg niguwbe nu we vu ki geowucu wuta femdu hebculot pijeppi eb. Bazlo medhizkoh kuv noze kavpokin wos unani borafi siv lufep ukeuzzat weboc mazmios vanijiz tamvet biemuoja feco fozew.",
          rating: 5,
          username: "jdrelick",
          date: new Date(),
          pic: 1
        },
        {
          title: "Terrible Service",
          content: "Fe mirbe umo wubo eca ne ge wurja zuhfod esihjaf akisubec gutnirot etewicog defba sebavla edoji tetgihaf.",
          rating: 1,
          username: "hsmith4234",
          date: new Date(),
          pic: 2
        },
        {
          title: "Overall good experience",
          content: "Bo tedke oplut reafa iti la kur filawu ut ol ac sevmep ab vovni. Isiliw ip cut rim pa hehtejo no godigu sidfi ivfizoj suc aj.",
          rating: 4,
          username: "moo1234",
          date: new Date(),
          pic: 3
        },
        {
          title: "Nothing special",
          content: "Awaub necagtew wul volziji osodahfu kuteb momer duras kotoguza kowage jojwi ce.",
          rating: 3,
          username: "kevans32",
          date: new Date(),
          pic: 4
        },
        {
          title: "Almost perfect!",
          content: "Jilwas efi le ugi somirvu izgo vaic mo ab izil wih hehamo bahima. Tomajaz sonnil jogovujoc zipijjub ipa tel uluzin ma ege tigdet puzijaka lifufzeh ja. Kitop fegigbug tu impooh wekumzig suziw lutmutobe uv gikzevos ropgoga wojig mocenge. Larmazsi urpudsu faw duto mip reziv no ec zikugu he bag uveocji ruvfueha betcoc rubkowef vizizi.",
          rating: 4,
          username: "rogerdodger213",
          date: new Date(),
          pic: 5
        }
      ]
    }
  },
  render: function () {
    return (
      <div className="viewReviews">
        <h4>16 Reviews</h4>
        {this.state.reviews.map(function (item) {
          return (
            <div key={item.title}>
              <h2 className="title">{item.title}</h2>
              <div className="content">{item.content}</div>
              <div className="pic">
                <Link to="user" params={{id: 2}}>
                  <img src={`/assets/avatars/${item.pic}.jpg`} />
                </Link>
              </div>
              <div className="details">
                <div className="rating">
                  <Stars rating={item.rating} />
                </div>
                <div className="user">
                  <Link to="user" params={{id: 2}}>
                    {item.username}
                  </Link>
                  <span className="date"> Reviewed {moment(item.date).fromNow()}</span>
                </div>
              </div>
            </div>
          )
        })}
        <button className="button blue">Load More</button>
      </div>
    );
  }
});

let Stars = React.createClass({
    render: function () {
      let stars = [];
      for (let i = 0; i < this.props.rating; i++) {
        stars.push(<i className="fa fa-star" key={i} />);
      }
      return (
        <div className={`stars stars${this.props.rating}`}>
          {stars}
        </div>
      );
    }
});

Profile.Events = React.createClass({
    render: function () {
        return (
            <div className="viewEvents">
              <h2>Events</h2>
            </div>
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
