import React from 'react';
import Router, { Link } from 'react-router';

import util from '../../util';

module.exports = React.createClass({
    getDefaultProps: function () {
        return {
            id: 0,
            name: "",
            type: ""
        };
    },
    getInitialState: function () {
        return {
            default: false
        };
    },
    render: function () {
        let img = this.props.img;
        let link = util.createOrgLink(this.props.id);
        if (this.state.default || !this.props.img) {
            img = '/assets/avatars/default.jpg';
        }
        return (
            <div className="pic">
                {this.props.type === 'org'
                    ? (
                        <a href={link}>
                            <img src={img} onError={this._default} alt={"Phourus Profile Pic for " + this.props.name} />
                        </a>
                    ) : (
                        <Link to={`/${this.props.id}`}>
                            <img src={img} onError={this._default} alt={"Phourus Profile Pic for " + this.props.name} />
                        </Link>
                    )
                }
            </div>
        );
    },
    _default: function () {
        this.setState({default: true});
    }
});
