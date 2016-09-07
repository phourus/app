import React from 'react';
import Actions from '../../actions/stream';

export default React.createClass({
  getDefaultProps: function () {
    return {
      sortBy: 'influence',
      direction: 'DESC'
    };
  },
	render: function () {
    let sortBy = this.props.sortBy;
    let direction = this.props.direction;

		return (
			<div className="sortby">
				<div className="triangle"></div>
				<div className="label">Sort by</div>
				<ul className="sort" ref="sort">
					<li className={(sortBy === 'influence') ? "selected" : ""} onClick={this._influence}><i className={"fa " + (sortBy === 'influence' ? "fa-check" : "fa-trophy")} /> Influence</li>
					<li className={(sortBy === 'totalViews') ? "selected" : ""} onClick={this._views}><i className={"fa " + (sortBy === 'totalViews' ? "fa-check" : "fa-eye")} /> Views</li>
					<li className={(sortBy === 'popularity') ? "selected" : ""} onClick={this._popularity}><i className={"fa " + (sortBy === 'popularity' ? "fa-check" : "fa-smile-o")} /> Popularity</li>
					<li className={(sortBy === 'totalThumbs') ? "selected" : ""} onClick={this._thumbs}><i className={"fa " + (sortBy === 'totalThumbs' ? "fa-check" : "fa-thumbs-up")} /> Thumbs</li>
					<li className={(sortBy === 'totalComments') ? "selected" : ""} onClick={this._comments}><i className={"fa " + (sortBy === 'totalComments' ? "fa-check" : "fa-comment")} /> Comments</li>
				</ul>
				<div className="direction"  ref="direction">
					<button className={(direction === 'DESC') ? 'selected' : ''} onClick={this._desc}>
							<i className="fa fa-arrow-down" /> High to Low
					</button>
					<button className={(direction === 'ASC') ? 'selected' : ''} onClick={this._asc}>
						<i className="fa fa-arrow-up" /> Low to High
					</button>
				</div>
			</div>
		);
    // <li className={(sortBy === 'location') ? "selected" : ""} onClick={this._location}><i className={"fa " + (sortBy === 'location' ? "fa-check" : "fa-globe")} /> Location</li>
    // <li className={(sortBy === 'date') ? "selected" : ""} onClick={this._date}><i className={"fa " + (sortBy === 'date' ? "fa-check" : "fa-calendar")} /> Date</li>
	},
	_influence: function (e) { Actions.sortBy('influence'); },
	_views: function (e) { Actions.sortBy('totalViews'); },
	_popularity: function (e) { Actions.sortBy('popularity'); },
	_thumbs: function (e) { Actions.sortBy('totalThumbs'); },
	_comments: function (e) { Actions.sortBy('totalComments'); },
	_location: function (e) { Actions.sortBy('location'); },
	_date: function (e) { Actions.sortBy('date'); },
	_asc: function (e) { Actions.direction('ASC'); },
	_desc: function (e) { Actions.direction('DESC'); },
});
