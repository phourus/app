import React from 'react'

export default (props) => {

	let links = props.post.links || []
	if (links.length < 1) {
		return (
			<div className="list"></div>
		)
	}
	return (
		<div className="list">
			{links.map((item, index) => {
				let icon = 'fa fa-link'
				if (item.upload) {
					let ext = item.url.split(".").slice(-1)[0]
					icon = 'fa fa-file' + this.props.icon(ext) + '-o'
				}

				return (
					<div className="link" key={item.id}>
						<div className="icon">
							<i className={icon} />
							{props.url.type === 'edit' && props.owner
								? <a id={index} href="javascript:void(0)" className="edit" onClick={props.edit}>Edit</a>
								: false
							}
						</div>
						<div>
							{props.url.type === 'edit' && props.owner
								? <button id={item.id} className="remove" onClick={this.props.remove}>X</button>
								: false
							}
							<a href={item.url} target="_blank">{item.title}</a>
							<p>{item.caption}</p>
						</div>
						<div style={{clear: 'both'}}></div>
					</div>
				)
			})}
		</div>
	)
}
