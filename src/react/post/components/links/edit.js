import React from 'react'

export default class Edit extends React.Component {

	componentDidMount() {
		// this.unsubscribe = Store.listen((data) => {
		// 	this.setState(data)
		// });
		// this.setState(this.props)
	}

	componentWillUnmount() {
		// this.unsubscribe()
	}

	componentWillReceiveProps(data) {
		if (data.id) {
			//this.setState(data);
		}
	}

	render() {
		let button = <button onClick={this._add} className="button green small add">Add Link</button>
		if (this.state.mode === 'edit') {
			button = <button onClick={this._save} className="button green small edit">Save Changes</button>
		}
		let errors = {
			add: 'creating Link',
			save: 'saving Link',
			remove: 'removing Link'
		}
		// <Links.Upload />
		// <button className="button blue"><i className="fa fa-dropbox" /> DropBox</button>
		return (
			<div className="fields">
				<label>Link Title:<br />
					<input type="text" onChange={this._changeTitle} value={this.state.title} placeholder="enter title" />
				</label>
				<label className="upload">Link URL/Upload:
					<input type="text" onChange={this._changeURL} value={this.state.url} placeholder="enter URL or upload"/>
				</label>
				<label>Caption:
					<textarea type="text" onChange={this._changeCaption} placeholder="enter short description" value={this.state.caption} />
				</label>
				{this.state.code
					? <div className="message red" onClick={this._clear}>There was an error {errors[this.state.action]}</div>
					: false
				}
				{button}
				<button className="button red" onClick={this.props.hide}>Cancel</button>
			</div>
		)
	}

	_add() {
		// let model = {};
		// model.title = this.state.title;
		// model.url = this.state.url;
		// model.caption = this.state.caption;
		// model.postId = this.props.post.id;
		// Actions.add(model);
		// this._clear();
	}

	_save() {
		// let link = {};
		// link.title = this.state.title;
		// link.url = this.state.url;
		// link.caption = this.state.caption;
		// Actions.save(this.state.id, link);
		// this._clear();
	}

	_changeTitle(e) {
		let value = e.currentTarget.value;
		//this.setState({title: value});
	}

	_changeURL(e) {
		let value = e.currentTarget.value;
		//this.setState({url: value});
	}

	_changeCaption(e) {
		let value = e.currentTarget.value;
		//this.setState({caption: value});
	}

	_clear() {
		// this.setState({code: null, action: null});
		// this.props.hide();
	}
}
