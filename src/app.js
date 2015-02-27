"use strict";
var React = require('react');
var Mutant = require('react-mutant');
var Router = require('react-router-component');
var Locations = Router.Locations;
var Location = Router.Location;
var NotFound = Router.NotFound;
var Link = Router.Link;

// JSX       
var Search = require('./react/search');
var Post = require('./react/post');
var Factory = require('./react/editor');
var Account = require('./react/account');
var Profile = require('./react/profile');
var Leaders = require('./react/leaders');
var General = require('./react/general');
var Landing = require('./react/landing');
var Map = require('./map');
var View404 = require('./react/404');

var validAlert = {
    color: React.PropTypes.string,
    msg: React.PropTypes.string,
    code: React.PropTypes.number
}

var searchMutant = new Mutant({
    posts: [],
    exclude: [],
    search: '',
    sort: 'influence',
    direction: 'DESC',
    page: 1,
    limit: 10,
    total: 0,
    datesVisible: false,
    typesVisible: false
});

var postMutant = new Mutant({
    post: {
        id: null,
        title: "",
        created: "",
        influence: null,
        element: '',
        scope: '',
        type: ''    
    },
    user: {
        id: null
    },
    comments: {
        rows: [],
        total: 0
    }
});

var accountMutant = new Mutant({
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

var profileMutant = new Mutant({
    id: "",
    type: "",
    view: "",
    profile: {}
});

var editorMutant = new Mutant({
    post: {},
    posts: [],
    link: {
        url: "",
        caption: ""
    }
});

var App = React.createClass({
    getDefaultProps: function () {
       return {
          alerts: new Mutant({alerts: []}, {mixins: {someFN: function() { return 'hey'; }}, validate: validAlert}),
          search: searchMutant,
          post: postMutant,
          account: accountMutant,
          profile: profileMutant,
          editor: editorMutant,
          leaders: {},
          general: {}
       } 
    },
    componentWillMount: function () {
        var self = this;
        this.props.alerts.mutant.on('update', function (mutant) {
            self.setProps({alerts: mutant});
        });
        this.props.account.mutant.on('update', function (mutant) {
            self.setProps({account: mutant});
        });
        this.props.profile.mutant.on('update', function (mutant) {
            self.setProps({profile: mutant});
        });
        this.props.post.mutant.on('update', function (mutant) {
            self.setProps({post: mutant});
        });
        this.props.editor.mutant.on('update', function (mutant) {
            self.setProps({editor: mutant});
        });
        this.props.search.mutant.on('update', function (mutant) {
            self.setProps({search: mutant});
        });
    },
    render: function () {
        return  (
            <div>
                <header className="header">
                    <div className="brand">
                    	<a href="./">
                    		<img src="/assets/logos/logo-new.png" /> 
                    	</a>
                    </div>
                    <nav className="nav">
                        <Link href="/leaders" className="game fa fa-trophy"></Link>
                    	<Link href="/search" className="search fa fa-search"></Link>
                    	<Link href="/editor" className="editor fa fa-pencil"></Link>
                    	<Link href="/account" className="account fa fa-user"><span className="notifications">13</span></Link>
                    </nav>
                </header>
                <div className="spacer"></div>
                <Alerts {...this.props.alerts} />
                <div className="main">
                    <div id="content">
                        <Content {...this.props} />
                    </div>
                    <footer className="footer">
                        © 2013 Phourus LLC. All Rights Reserved.
                        <br />
        				<Link href="/">Home</Link> | 
        				<Link href="./about">About</Link> | 
        				<Link href="./terms">Terms</Link>
        				<br clear="all" />
                    </footer>
                </div>
            </div>    
        );
    }
});

var Alerts = React.createClass({
    remove: function (e) {
        var id = e.currentTarget.id;
        var alerts = this.props.alerts;
        alerts.splice(id, 1);
    },
    render: function () {
        var list = [];
        if (this.props.alerts) {
            for (var i in this.props.alerts) {
                list.push(<Alert {...this.props.alerts[i]} id={i} remove={this.remove} />);
            }
        }
        return (
            <div className="alerts">
                {list}
            </div>
        );
    }
});

var Alert = React.createClass({
    propTypes: {
      color: React.PropTypes.string,
      msg: React.PropTypes.string,
      code: React.PropTypes.number  
    },
    render: function () {
        return (
            <div className={this.props.color + " alert"}>
                <button id={this.props.id} className="remove fa fa-remove" onClick={this.props.remove}></button>
                <div className="msg">{this.props.msg}</div>
                <div className="code">HTTP Status Code: {this.props.code}</div>
            </div>
        );
    } 
});

var Content = React.createClass({
    render: function () {
        return (
            <Locations path={this.props.path}>
                <Location path="/" handler={Landing} />
                <Location path="/search" handler={Search} {...this.props.search} />
                <Location path={/^\/post\/?([a-zA-Z0-9]*)?/} handler={Post} {...this.props.post} />
                <Location path="/leaders" handler={Leaders} {...this.props.leaders} />
                <Location path={/^\/editor\/?([a-zA-Z0-9]*)?/} handler={Factory} {...this.props.editor} />
                <Location path={/^\/account\/?(notifications|history|password)?/} handler={Account}{...this.props.account} />
                <Location path={/^\/(about|terms)/} handler={General} {...this.props.general} />
                <Location path={/^\/(org|user)\/([0-9]*)\/?([a-zA-Z]*)?/} handler={Profile}{...this.props.profile} />
                <NotFound handler={View404} />
            </Locations>
        );
    }
});

module.exports = App;