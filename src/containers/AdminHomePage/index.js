import React from 'react';

import Tabs from '../AdminTabs';

module.exports = React.createClass({
    contextTypes: {
        route: React.PropTypes.object
    },
    render: function () {
        let route = this.context.route;

        return (
            <div className="admin">
                <Tabs {...this.state} />
                {React.cloneElement(this.props.children, route)}
            </div>
        );
    }
});
