import React from 'react';
import Router, { History, Link } from 'react-router';

import ga from '../../analytics';
import util from '../../util';

import HeaderNav from '../../components/HeaderNav';

import Actions from '../../actions/session';
import Store from '../../stores/session';

import Search from '../StreamSearch';

module.exports = React.createClass({
    contextTypes: {
        session: React.PropTypes.object,
        route: React.PropTypes.object
    },
    render: function () {
        let session = this.context.session;
        let route = this.context.route;
        let r = route.root;
        if (['contact', 'pricing', 'about', 'docs'].indexOf(r) > -1) {
            return <Static />
        }
        if (r === 'home') {
            return <Home />
        }
        if (!r && !route.subdomain) {
            return <Home />
        }
        return (
            <header className="header">
                {!session.authenticated
                    ? (
                        <nav>
                            <ul>
                                <li className="create">
                                    <Link to="/home">
                                        <i className="fa fa-sign-in" />
                                        Login
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    )
                    : <Private />
                }
                <div className="brand">
                    {route.subdomain
                        ? <a href={util.createHomeURL()}></a>
                        : <Link to="/"></Link>
                    }
                </div>
                <Search />
            </header>
        );
    }
});

let Home = React.createClass({
    render: function () {
        return (
            <header className="header home">
                <div className="brand">
                    <Link to="/home"></Link>
                </div>
                <HeaderNav classType="home" />
            </header>
        );
    }
});

let Static = React.createClass({
    render: function () {
        return (
            <header className="header">
                <div className="brand">
                    <Link to="/home"></Link>
                </div>
                <HeaderNav classType="static" />
            </header>
        );
    }
});

let Private = React.createClass({
    mixins: [History],
    contextTypes: {
        session: React.PropTypes.object,
        route: React.PropTypes.route
    },
    componentDidMount: function () {
        this.unsubscribe = Store.listen(data => {
            if (data.action === 'logout') {
                let url = util.createHomeURL();
                window.location = url;
            }
            this.setState(data);
        });
    },
    componentWillUnmount: function () {
        this.unsubscribe();
    },
    render: function () {
        let session = this.context.session;
        let orgs = session.orgs;
        let route = this.context.route;

        return (
            <nav className="nav">
                <ul>
                    <li className="posts">
                        <Link to={route.subdomain ? "/" : "/stream"} >
                            <i className="fa fa-file" />
                            Posts
                        </Link>
                    </li>
                    <li className="me">
                        <Link to="/activity" className="me">
                            <i className="fa fa-user" />
                            <span className="notifications"></span>
                            Me
                        </Link>
                        <div>
                            <ul>
                                {orgs.map((org) => {
                                    let link = '';
                                    if (org.org && org.org.shortname) {
                                        link = util.createOrgLink(org.org.shortname);
                                    }
                                    if (!org.approved) {
                                        return false;
                                    }
                                    return <li key={org.org.id}><a href={link}>{org.org.shortname || org.org.name} <i className="fa fa-users" /></a></li>
                                })}
                            </ul>
                            <ul>
                                <li><Link to="/me">My Posts <i className="fa fa-edit" /></Link></li>
                                <li><Link to="/activity">My Activity <i className="fa fa-bell" /></Link></li>
                                <li><Link to="/account">My Account <i className="fa fa-user" /></Link></li>
                                <li><a href="javascript:void(0)" onClick={this._logout}>Logout <i className="fa fa-sign-out" /></a></li>
                            </ul>
                        </div>
                    </li>
                    <li className="create">
                        <Link to="/create">
                            <i className="fa fa-pencil" />
                            Create
                        </Link>
                    </li>
                </ul>
            </nav>
        );
    },
    _logout: function () {
        Actions.logout();
        ga('send', 'event', 'account', 'logout');
    }
});