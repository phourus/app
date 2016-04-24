import React from 'react';
import { DropTarget } from 'react-dnd';

import Actions from '../../actions/stream';

let target = {
    drop: function (props, monitor, component) {
        var item = monitor.getItem();
        Actions.save(item.id, props.item.id);
        return {
            postId: item.id,
            folderId: props.item.id
        };
    }
};

let collect = function (connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
    };
}

let Drop = React.createClass({
    render: function () {
        var className = [];
        var item = this.props.item;
        var index = this.props.index;
        var isOver = this.props.isOver;
        var connectDropTarget = this.props.connectDropTarget;

        if (index === this.props.selected) {
            className.push('selected');
        }
        if (isOver) {
            className.push('over');
        }

        return connectDropTarget(
            <li key={item.name} className={className.join(' ')}>
                <a id={'id' + item.id} href="javascript:void(0)" onClick={this.props.select}>
                    <span className="title">{item.name}</span><br />
                </a>
                {index === this.props.selected && 0
                    ? <ul>
                    <li>Social Media</li>
                    <li>Search Engine Management</li>
                    <li>Direct</li>
                    <li><input /><button>Add subfolder</button></li>
                </ul>
                : false}
            </li>
        );
    }
});

module.exports = DropTarget('posts', target, collect)(Drop);
