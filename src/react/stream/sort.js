import React from 'react'

export default class Sort extends React.Component {

	render() {
		const { params } = this.props
    const { direction, sortBy } = params

		return (
			<div className="sortby">
				<div className="triangle"></div>
				<div className="label">Sort by</div>
				<ul className="sort" ref="sort">
					<li className={(sortBy === 'influence') ? "selected" : ""} onClick={this._influence.bind(this)}><i className={"fa " + (sortBy === 'influence' ? "fa-check" : "fa-trophy")} /> Influence</li>
					<li className={(sortBy === 'totalViews') ? "selected" : ""} onClick={this._views.bind(this)}><i className={"fa " + (sortBy === 'totalViews' ? "fa-check" : "fa-eye")} /> Views</li>
					<li className={(sortBy === 'popularity') ? "selected" : ""} onClick={this._popularity.bind(this)}><i className={"fa " + (sortBy === 'popularity' ? "fa-check" : "fa-smile-o")} /> Popularity</li>
					<li className={(sortBy === 'totalThumbs') ? "selected" : ""} onClick={this._thumbs.bind(this)}><i className={"fa " + (sortBy === 'totalThumbs' ? "fa-check" : "fa-thumbs-up")} /> Thumbs</li>
					<li className={(sortBy === 'totalComments') ? "selected" : ""} onClick={this._comments.bind(this)}><i className={"fa " + (sortBy === 'totalComments' ? "fa-check" : "fa-comment")} /> Comments</li>
				</ul>
				<div className="direction"  ref="direction">
					<button className={(direction === 'DESC') ? 'selected' : ''} onClick={this._desc.bind(this)}>
							<i className="fa fa-arrow-down" /> High to Low
					</button>
					<button className={(direction === 'ASC') ? 'selected' : ''} onClick={this._asc.bind(this)}>
						<i className="fa fa-arrow-up" /> Low to High
					</button>
				</div>
			</div>
		)
    // <li className={(sortBy === 'location') ? "selected" : ""} onClick={this._location}><i className={"fa " + (sortBy === 'location' ? "fa-check" : "fa-globe")} /> Location</li>
    // <li className={(sortBy === 'date') ? "selected" : ""} onClick={this._date}><i className={"fa " + (sortBy === 'date' ? "fa-check" : "fa-calendar")} /> Date</li>
	}
	_influence(e) { this.props.actions.sortBy('influence') }
	_views(e) { this.props.actions.sortBy('totalViews') }
	_popularity(e) { this.props.actions.sortBy('popularity') }
	_thumbs(e) { this.props.actions.sortBy('totalThumbs') }
	_comments(e) { this.props.actions.sortBy('totalComments') }
	_location(e) { this.props.actions.sortBy('location') }
	_date(e) { this.props.actions.sortBy('date') }
	_asc(e) { this.props.actions.direction('ASC') }
	_desc(e) { this.props.actions.direction('DESC') }
}
