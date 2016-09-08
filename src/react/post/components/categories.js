import React from 'react'

import tax from '../../../lib/taxonomy'

export default class Categories extends React.Component {

	render() {
		let type = tax[this.props.post.type] || {}
		if (this.props.owner && this.props.url.type === 'edit') {
			let cats = type.category || []
			let subs = type[this.props.post.category] || false
			return (
				<div className="categories">
					<strong>Post Categories</strong><br />
					<select onChange={this._category} value={this.props.post.category}>
						<option value="">--Please select a category--</option>
						{cats.map((cat) => {
							return <option value={cat.value}>{cat.label}</option>
						})}
					</select>
					{this.props.post.category && subs
						?
							<select onChange={this._subcategory} value={this.props.post.subcategory}>
								<option value="">--Please select a subcategory--</option>
								{subs.map((cat) => {
									return <option value={cat.value}>{cat.label}</option>
								})}
							</select>
						: false
					}
				</div>
			)
		}
		return (
			<div className="categories">
				{this.props.post.category
					? <a href="javascript:void()">{this.props.post.category}</a>
					: false
				}
				{this.props.post.category && this.props.post.subcategory
					? " >> "
					: false
				}
				{this.props.post.subcategory
					? <a href='javascript:void(0)'>{this.props.post.subcategory}</a>
					: false
				}
			</div>
		)
	}

	_category(e) {
		//Actions.change('category', e.currentTarget.value);
	}

	_subcategory(e) {
		//Actions.change('subcategory', e.currentTarget.value);
	}
}

export default Categories
