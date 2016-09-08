import React from 'react'

import List from './list'
import Edit from './edit'

// Isomorphic support?
//let File from 'react-dropzone-component');

//let AWS from 'aws-sdk');
// AWS.config.update({accessKeyId: 'AKIAJJA4YUWAJE5AUIQQ', secretAccessKey: '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'});
// let S3 = AWS.S3;
// let s3 = new S3();

export default class Links extends React.Component {

	componentDidMount() {
		// this.unsubscribe = Store.listen((data) => {
		// 	let links = this.props.post.links;
		// 	if (data.added) {
		// 		links.push(data.added);
		// 		this.setState({post: {links: links}});
		// 	}
		// 	if (data.saved) {
		// 		links.forEach((item, index) => {
		// 			if (parseInt(item.id) === parseInt(data.saved.id)) {
		// 				links[index] = data.saved;
		// 			}
		// 		});
		// 		this.setState({post: {links: links}});
		// 	}
		// 	if (data.removed) {
		// 		links = links.filter((item) => {
		// 			if (parseInt(item.id) !== parseInt(data.removed)) {
		// 				return true;
		// 			}
		// 			return false;
		// 		});
		// 		this.setState({post: {links: links}});
		// 	}
		// });
	}

	componentWillReceiveProps(data) {
		if (data.post) {
			//this.setState(data);
		}
	}

	render() {
		const url = this.props.url
		const type = url.type

		return (
			<div className="links">
				{type === 'edit' ? <h2>Links & Attachments</h2> : false}
				{type === 'edit' && this.props.owner && this.props.mode !== 'edit' && this.props.mode !== 'add'
					? <button className="green button" onClick={this._add}>Add Link</button>
					: false
				}
				{type === 'edit' && this.props.owner && (this.props.mode === 'edit' || this.props.mode === 'add')
					? <Edit {...this.props} edit={this._edit} hide={this._hide} />
					: false
				}
				<List {...this.props} owner={this.props.owner} edit={this._edit} remove={this._remove} icon={this._icon} />
			</div>
		)
	}

	_add() {
		//this.setState({mode: 'add', id: null, url: "", caption: "", title: ""});
	}

	_hide() {
		//this.setState({mode: null});
	}

	_edit(e) {
		let id = e.currentTarget.id;
		let props = this.props.post.links[id];
		props.mode = 'edit'
		//this.setState(state)
	}

	_remove(e) {
		let id = e.currentTarget.id
		//Actions.remove(id)
	}

	_icon(ext) {
	  let out = ''
	  let icons = {
	    image: ['png', 'jpg', 'gif', 'jpeg'],
	    pdf: ['pdf'],
	    video: ['mpeg', 'mp4'],
	    sound: ['mp3', 'wav'],
	    zip: ['zip'],
	    text: ['txt', 'rtf'],
	    word: ['doc', 'docx', 'pages'],
	    excel: ['xls', 'xlsx', 'numbers'],
	    powerpoint: ['ppt', 'pptx', 'keynote'],
	    code: ['js', 'html', 'css']
	  }
	  Object.keys(icons).forEach(function (key) {
	    if (icons[key].hasOwnProperty(ext)) {
	      out = '-' + key
	    }
	  })
	  return out
	}
}
