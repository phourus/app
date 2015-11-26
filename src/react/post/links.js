"use strict";
let React = require('react');

let Actions = require('../../actions/post/links');
let Store = require('../../stores/post/links');

let File = require('react-dropzone-component');

//let AWS = require('aws-sdk');
// AWS.config.update({accessKeyId: 'AKIAJJA4YUWAJE5AUIQQ', secretAccessKey: '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'});
// let S3 = AWS.S3;
// let s3 = new S3();

let Links = React.createClass({
	getDefaultProps: function () {
		return {
			context: {},
			owner: false
		};
	},
	getInitialState: function () {
		return {
			mode: null,
			post: {}
		}
	},
	componentDidMount: function () {
		this.unsubscribe = Store.listen((data) => {
			this.setState(data);
		});
	},
	componentWillUnmount: function () {
		this.unsubscribe();
	},
	componentWillReceiveProps: function (data) {
		if (data.post) {
			this.setState(data);
		}
	},
	render: function () {
		return (
			<div className="links">
				{this.props.context.type === 'edit' ? <h2>Links & Attachments</h2> : false}
				{this.props.context.type === 'edit' && this.props.owner && this.state.mode !== 'edit' && this.state.mode !== 'add'
					? <button className="green button" onClick={this._add}>Add Link</button>
					: false
				}
				{this.props.context.type === 'edit' && this.props.owner && (this.state.mode === 'edit' || this.state.mode === 'add')
					? <Links.Edit {...this.state} edit={this._edit} hide={this._hide} />
					: false
				}
				<Links.List {...this.state} context={this.props.context} owner={this.props.owner} edit={this._edit} />
			</div>
		);
	},
	_add: function () {
		this.setState({mode: 'add'});
	},
	_hide: function () {
		this.setState({mode: null});
	},
	_edit: function (e) {
		var id = e.currentTarget.id;
		var state = this.state.post.links[id];
		state.mode = 'edit';
		this.setState(state);
	}
});

Links.List = React.createClass({
	render: function () {
		let links = this.props.post.links || [];
		if (links.length < 1) {
			return (
				<div className="list"></div>
			);
		}
		return (
			<div className="list">
				{links.map((item, index) => {
					let icon = 'fa fa-link';
					if (item.upload) {
						let ext = item.url.split(".").slice(-1)[0];
						icon = 'fa fa-file' + this._icon(ext) + '-o';
					}

					return (
						<div className="link" key={item.id}>
							<div className="icon">
								<i className={icon} />
								{this.props.context.type === 'edit' && this.props.owner
									? <a id={index} href="javascript:void(0)" className="edit" onClick={this.props.edit}>Edit</a>
									: false
								}
							</div>
							<div>
								{this.props.context.type === 'edit' && this.props.owner
									? <button id={item.id} className="remove" onClick={this._remove}>X</button>
									: false
								}
								<a href={item.url} target="_blank">{item.title}</a>
								<p>{item.caption}</p>
							</div>
							<div style={{clear: 'both'}}></div>
						</div>
					);
				})}
			</div>
		);
	},
	_remove: function (e) {
		let id = e.currentTarget.id;
		Actions.remove(id);
	},
	_icon: function (ext) {
		let out = '';
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
		};
		Object.keys(icons).forEach(function (key) {
			if (icons[key].hasOwnProperty(ext)) {
				out = '-' + key;
			}
		});
		return out;
	}
});

Links.Edit = React.createClass({
	getDefaultProps: function () {
		return {
			post: {}
		}
	},
	getInitialState: function () {
		return {
			mode: 'add',
			id: null,
			url: "",
			caption: "",
			title: ""
		};
	},
	componentDidMount: function () {
		this.unsubscribe = Store.listen((data) => {
			this.setState(data);
		});
		this.setState(this.props);
	},
	componentWillUnmount: function () {
		this.unsubscribe();
	},
	componentWillReceiveProps: function (data) {
		if (data.id) {
			this.setState(data);
		}
	},
	render: function () {
		let button = <button onClick={this._add} className="button green small add">Add Link</button>;
		if (this.state.mode === 'edit') {
			button = <button onClick={this._save} className="button green small edit">Save Changes</button>;
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
		);
	},
	_add: function () {
		let model = {};
		model.title = this.state.title;
		model.url = this.state.url;
		model.caption = this.state.caption;
		model.postId = this.props.post.id;
		Actions.add(model);
		this._clear();
	},
	_save: function () {
		let link = {};
		link.title = this.state.title;
		link.url = this.state.url;
		link.caption = this.state.caption;
		Actions.save(this.state.id, link);
		this._clear();
	},
	_changeTitle: function (e) {
		let value = e.currentTarget.value;
		this.setState({title: value});
	},
	_changeURL: function (e) {
		let value = e.currentTarget.value;
		this.setState({url: value});
	},
	_changeCaption: function (e) {
		let value = e.currentTarget.value;
		this.setState({caption: value});
	},
	_clear: function () {
		this.setState({code: null, action: null});
		this.props.hide();
	}
});

Links.Upload = React.createClass({
	render: function () {
		return (
			<File className="button blue" config={this.config} eventHandlers={this.handlers}>
				Click or drag files here
			</File>
		);
	},
	config: {
		allowedFiletypes: ['.jpg', '.png', '.gif', '.pdf', '.doc', '.docx', '.xls', '.xlsx'],
    showFiletypeIcon: true,
    postUrl: '/rest/links/attachment'
	},
	handlers: {
		// This one receives the dropzone object as the first parameter
    // and can be used to additional work with the dropzone.js
    // object
    init: null,
    // All of these receive the event as first parameter:
    drop: function (e) {
			console.log(e);
		},
    dragstart: null,
    dragend: null,
    dragenter: null,
    dragover: null,
    dragleave: null,
    // All of these receive the file as first parameter:
    addedfile: function (e) {
			s3.upload({Bucket: 'phourus-users', Key: 'some-user', Body: e}, {}, (err, data) => {
				console.log(err, data);
			});
		},
    removedfile: null,
    thumbnail: null,
    error: null,
    processing: null,
    uploadprogress: null,
    sending: null,
    success: null,
    complete: null,
    canceled: null,
    maxfilesreached: null,
    maxfilesexceeded: null,
    // All of these receive a list of files as first parameter
    // and are only called if the uploadMultiple option
    // in djsConfig is true:
    processingmultiple: null,
    sendingmultiple: null,
    successmultiple: null,
    completemultiple: null,
    canceledmultiple: null,
    // Special Events
    totaluploadprogress: null,
    reset: null,
    queuecompleted: null
	},
});

module.exports = Links;
