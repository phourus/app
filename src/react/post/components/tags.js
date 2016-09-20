import React from 'react'

export default class Tags extends React.Component {

	componentDidMount() {
		// this.unsubscribe = Store.listen((data) => {
		// 	let tags = this.state.post.tags;
		// 	if (data.added) {
		// 		tags.push(data.added);
		// 		this.setState({post: {tags: tags}});
		// 	}
		// 	if (data.removed) {
		// 		tags = tags.filter((item) => {
		// 			if (parseInt(item.id) !== parseInt(data.removed)) {
		// 				return true;
		// 			}
		// 			return false;
		// 		});
		// 		this.setState({post: {tags: tags}});
		// 	}
		// });
	}

	componentWillReceiveProps(data) {
		if (data.post) {
			//this.setState(data);
		}
	}

	render() {
    let tags = this.props.post.tags || []
		const url = this.props.url
		const type = url.type

		return (
      <div className="tags">
				{type === 'edit' && this.props.owner ? <h2>Edit Tags</h2> : false}
        <i className="fa fa-tag" />
        {tags.map((item, index) => {
          return (
            <span className="tag" key={index}>
							<a id={item.tag} href="javascript:void(0)" onClick={this._tag}>{item.tag}</a>
							{type === 'edit' && this.props.owner
								? <a href="javascript:void(0)" id={item.id} className="remove" onClick={this._remove}>x</a>
								: false
							}
						</span>
          );
        })}
				{type === 'edit' && this.props.owner
					? <div className="tagField">
					<input ref="tag" placeholder="add tags here" type="text" />
					<button onClick={this._add.bind(this)}>Add Tag</button>
				</div>
					: false
				}
      </div>
    )
  }

	_change(e) {
		let value = e.currentTarget.value
		//this.setState({tag: value})
	}

	_add() {
		let model = {}
		if (this.refs.tag.length > 1 && this.props.post.id) {
			model.tag = this.refs.tag.value
			model.postId = this.props.post.id
			//Actions.add(model)
			//this.setState({tag: ""})
		}
	}

	_remove(e) {
		let id = e.currentTarget.id
		//Actions.remove(id)
	}

	_tag(e) {
		let id = e.currentTarget.id
		//StreamActions.search(id)
	}
}
