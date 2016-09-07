import React from 'react';

export default React.createClass({
	render: function () {
		return (
			<div className="dates">
				<div>
					<label>From:</label>
					<button><i className="fa fa-calendar" /></button>
					<input />
				</div>
				<div>
					<label>To:</label>
					<button><i className="fa fa-calendar" /></button>
					<input />
				</div>
			</div>
		);
	}
});
