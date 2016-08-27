import React from 'react'
import { DragSource } from 'react-dnd'

let target = {
	beginDrag: function (props) {
		return {
			id: props.id
		};
	}
};

let collect = function (connect, monitor) {
  return {
		connectDragSource: connect.dragSource(),
 	 	isDragging: monitor.isDragging()
  };
}

let Drag = React.createClass({
	render: function () {
		var className = ['handle'];
		var id = this.props.id;
		var isDragging = this.props.isDragging;
		var connectDragSource = this.props.connectDragSource;
		if (isDragging) {
			className.push('dragging')
		}

		return connectDragSource(
			<div className={className.join(' ')}>
				<i className="fa fa-th" />
			</div>
		);
	}
});

module.exports = DragSource('posts', target, collect)(Drag);
