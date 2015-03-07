"use strict";
let React = require('react');
let Router = require('react-router');
let RouteHandler = Router.RouteHandler;
let account = require('../sockets/account');
let token = require('../token');
let View401 = require('./401');
let msg = require('../actions/alerts').add;
let Mutant = require('react-mutant');

let Account = React.createClass({
     getInitialState: function () {
         return new Mutant({
            user: {
                id: null,
                pic: "",
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
            },
            notifications: [],
            history: []
        });
     },
     save: function () {
        account.edit(this.props.user);
     },
     componentDidMount: function () {
         let self = this;
         this.state.mutant.on('update', function (mutant) {
             self.setState(mutant);
         });
         account.on('get', function (code, data) {
             if (code != 200) {
                 msg('yellow', 'Account could not be loaded', code);
                 return;
             }
             self.state.mutant.set({user: data});
         });
         account.on('edit', function (code, data) {
            if (code == 204) {
                msg('green', 'Account updated', code);
                return;
            }
            msg('red', 'Account could not be updated', code);
         });
         account.on('password', function (code, data) {
            if (code == 204) {
                msg('green', 'Password updated', code);
                return;
            }
            msg('red', 'Password could not be updated', code);
         });
         account.on('deactivate', function (code, data) {
            if (code == 202) {
                msg('green', 'Account deactivated', code);
                return;
            }
            msg('red', 'Account could not be deactivated', code);
         });
         account.get();
	 },
	 componentWillUnmount: function () {
    	account.off('get');
    	account.off('edit');
    	account.off('password');
    	account.off('deactivate');
	 },
     deactivate: function () {
       account.deactivate();
     },
	 history: function () {
    	 this.navigate('/account/history');
	 },
	 notifications: function () {
    	 this.navigate('/account');
	 },
     render: function () {
        let button, view, password;
        button = <button className="button blue" onClick={this.history}>View History</button>;
        if (token.get() !== false) {
            return (
                <div className="account">
                    <h1>My Account</h1>
                    <div className="heading">
                        <PicUploader {...this.state.user} mutant={this.state.mutant} />
                    </div>
                    {password}
                    {button}
                    <RouteHandler {...this.state} />
                </div>
            );
        } else {
            return (
                <View401 force={this.force} />
            );
        }
     }
});

let PicUploader = React.createClass({
    logout: function () {
	    token.remove()
	    this.forceUpdate();
	 },
    render: function () {
    //<Link href="/account/password">Change my password</Link>
        return (
            <div className="uploader">
                <div className="pic">
                    <img src={"/assets/avatars/" + this.props.img + ".jpg"} height="200" />
                </div>
                <form action={`/rest/pic/${this.props.id}`} method="post" encType="multipart/form-data" target="upload">
                  <input type="file" ref="pic" id="pic" />
                  <input type="hidden" ref="type" value="user" />
                </form>
                <br />
                <a onClick={this.logout}>Logout</a>
                <br />
            </div>
        );
    }
});

Account.Edit = React.createClass({
    render: function () {
        return (
            <div>
                <Info {...this.props.user} mutant={this.props.mutant} />
                <Details {...this.props.user} mutant={this.props.mutant} />
                <Address {...this.props.user} mutant={this.props.mutant} />
                <Social />
            </div>
        );
    }
});

let Info = React.createClass({
    change: function (e) {
        let user = this.props.mutant.get().user;
        user[e.target.className] = e.target.value;
        this.props.mutant.set({user: user});
    },
    render: function () {
        return (
          <div className="info">
            <div id="user_basic">
                <label>Username</label>
                <input ref="username" className="username" type="text" value={this.props.username} disabled="true" />
                <br />
                <label>First</label>
                <input ref="first" className="first" type="text" value={this.props.first} onChange={this.change} />
                <br />
                <label>Last</label>
                <input ref="last" className="last" type="text" value={this.props.last} onChange={this.change} />
                <br />
                <label>Email</label>
                <input ref="email" className="email" type="text" value={this.props.email} onChange={this.change} />
                <br />
                <label>Phone</label>
                <input ref="phone" className="phone" type="text" value={this.props.phone} onChange={this.change} />
                <br />
            </div>
          </div>
        );
    }
});

let Details = React.createClass({
    change: function (e) {
      let user = this.props.mutant.get().user;
        user[e.target.className] = e.target.value;
        this.props.mutant.set({user: user});
    },
    render: function () {
        return (
          <div className="details">
            <div id="user_detail">
                <label>Company</label>
                <input ref="company" className="company" type="text" value={this.props.company} onChange={this.change} />
                <br />
                <label>Occupation</label>
                <input ref="occupation" className="occupation" type="text" value={this.props.occupation} onChange={this.change} />
                <br />
                <label>Website</label>
                <input ref="website" className="website" type="text" value={this.props.website} onChange={this.change} />
                <br />
                <label>Date of Birth</label>
                <input ref="dob" className="dob" type="datetime" value={this.props.dob} onChange={this.change} />
                <br />
                <label>Gender</label>
                <select ref="gender" className="gender" value={this.props.gender} onChange={this.change}>
                    <option value="">Private</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                </select>
                <br />
            </div>
          </div>
        );
    }
});

let Address = React.createClass({
    render: function () {
        return (
          <div>
            <h3>My Address</h3>
            <div id="user_address">
                <label>Street</label>
                <input ref="street" className="street" type="text" value={this.props.address.street} onChange={this.props.change} />
                <label>Zip</label>
                <input ref="zip" className="zip" type="text" value={this.props.address.zip} onChange={this.props.change} />
                <label>City</label>
                <input ref="city" className="city" type="text" value={this.props.address.city} onChange={this.props.change} />
                <label>State</label>
                <input ref="state" className="state" type="text" value={this.props.address.state} onChange={this.props.change} />
            </div>
          </div>
        );
    }
});

let Social = React.createClass({
    render: function () {
        return (
          <div id="social">
            <h3>Verify Social Accounts</h3>
            <button id="facebook" className="social"></button>
            <button id="linkedin" className="social"></button>
            <button id="linkedin" className="social"></button>
            <button id="google" className="social"></button>
          </div>
        );
    }
});

Account.Password = React.createClass({
    change: function () {
      let current = this.refs.current.getDOMNode().value;
      let changed = this.refs.changed.getDOMNode().value;
      let verify = this.refs.verify.getDOMNode().value;
     if (changed === verify) {
         account.password(current, changed);
     }
    },
    render: function () {
        return (
          <div id="password">
            <h3>Change Password</h3>
            <div id="user_password">
                <input ref="current" type="password" />
                <input ref="changed" type="password" />
                <input ref="verify" type="password" />
            </div>
            <button id="save_password" className="button green save" onClick={this.change}>Update Password</button>
          </div>
        );
    }
});

Account.Notifications = React.createClass({
    componentDidMount: function () {
        let self = this;
        account.on('notifications', function (code, data) {
             if (code != 200) {
                msg('yellow', 'Notifications could not be loaded', code);
                return;
             }
             self.props.mutant.set({notifications: data});
         });
         account.notifications({});
    },
    componentWillUnmount: function () {
        account.off('notifications');
    },
    render: function () {
        let views = this.props.notifications[0] || [];
        let comments = this.props.notifications[1] || [];
        let thumbs = this.props.notifications[2] || [];

        views = views.map(function (item) {
           return <li key={item.id}><img src={`/assets/avatars/${item.viewer.img}.jpg`} /><a href={`/user/${item.viewer.id}`}>{item.viewer.username}</a> viewed your profile</li>;
        });
        comments = comments.map(function (item) {
           return <li key={item.id}><img src={`/assets/avatars/${item.user.img}.jpg`} /> <a href={`/user/${item.userId}`}>{item.user.username}</a> commented on your post
                <a href={`/post/${item.post.id}`}>{` \"${item.post.title}\"`}</a>
            </li>;
        });
        thumbs = thumbs.map(function (item) {
           return <li key={item.id}><img src={`/assets/avatars/${item.user.img}.jpg`} /><a href={`/user/${item.user.id}`}>{item.user.username}</a> {(item.positive) ? "dis": ""} liked your post
                <a href={`/post/${item.post.id}`}>{` \"${item.post.title}\"`}</a>
            </li>;
        });
        return (<div><h3>Notifications</h3><ul>{views}</ul><ul>{comments}</ul><ul>{thumbs}</ul></div>);
    }
});

Account.History = React.createClass({
    componentDidMount: function () {
        let self = this;
        account.on('history', function (code, data) {
             if (code != 200) {
                msg('yellow', 'History could not be loaded', code);
                return;
             }
             self.props.mutant.set({history: data});
         });
         account.history({});
    },
    componentWillUnmount: function () {
        account.off('history');
    },
    render: function () {
        let views = this.props.history[0] || [];
        let comments = this.props.history[1] || [];
        let thumbs = this.props.history[2] || [];

        views = views.map(function (item) {
           return <li key={item.id}><img src={"/assets/avatars/1.jpg"} /><i className="fa fa-eye" />You viewed <img src={"/assets/avatars/1.jpg"} /><a href={"/user/"}></a></li>;
        });
        comments = comments.map(function (item) {
           return <li key={item.id}><img src={`/assets/avatars/${item.post.user.img}.jpg`} /><i className="fa fa-comment" /> You commented on
           <a href={"/post/" + item.post.id}>{" \"" + item.post.title + "\""}</a> by
                <a href={`/user/${item.post.user.id}`}> {item.post.user.username}</a>
            </li>;
        });
        thumbs = thumbs.map(function (item) {
           return <li key={item.id}><img src={`/assets/avatars/${item.post.user.img}.jpg`} /><i className="fa fa-thumb" /> You {(item.positive) ? "dis": ""}liked
                <a href={`/post/${item.post.id}`}>{` \"${item.post.title}\"`}</a> by
                <a href={`/user/${item.post.user.id}`}> {item.post.user.username}</a>

            </li>;
        });
        return (<div><h3>History</h3><ul>{views}</ul><ul>{comments}</ul><ul>{thumbs}</ul></div>);

    }
});

module.exports = Account;
