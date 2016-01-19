"use strict";
let React = require('react');
let { DragSource } = require('react-dnd');

let boxSource = {
	beginDrag: function (props) {
		console.log(props);
		return {
			name: props.name
		};
	},

	endDrag: function (props, monitor) {
		const item = monitor.getItem();
		const dropResult = monitor.getDropResult();
		console.log(item);

		if (dropResult) {
			window.alert( // eslint-disable-line no-alert
				`You dropped ${item.name} into ${dropResult.name}!`
			);
		}
	}
};

let Handle = React.createClass({
  render: function () {
    return <button>Drag here</button>;
  }
});

module.exports = React.createClass({
	render: function () {
		let Out = DragSource('post', boxSource, (connect, monitor) => ({
  		 connectDragSource: connect.dragSource(),
  		 isDragging: monitor.isDragging()
  	 }))(Handle);
     return <Out />
	}
});
