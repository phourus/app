import React from 'react'
import { DragSource } from 'react-dnd'

const target = {
	beginDrag: (props) => {
		return {
			id: props.id
		}
	}
}

const collect = (connect, monitor) => {
  return {
		connectDragSource: connect.dragSource(),
 	 	isDragging: monitor.isDragging()
  }
}

const Drag = ({id, isDragging, connectDragSource}) => {
	let className = ['handle'];
	if (isDragging) {
		className.push('dragging')
	}

	return connectDragSource(
		<div className={className.join(' ')}>
			<i className="fa fa-th" />
		</div>
	);
}

export default DragSource('posts', target, collect)(Drag)
