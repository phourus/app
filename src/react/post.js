"use strict";
let React = require('react');
let Router = require('react-router');
let { Link, State, Navigation } = Router;
let moment = require('moment');
let numeral = require('numeral');
let RTE = require('react-quill');
let File = require('react-dropzone-component');
let AWS = require('aws-sdk');

let Actions = require('../actions/post');
let Stream = require('../actions/stream');

let Store = require('../stores/post');
let Account = require('../stores/account');

let Influence = require('../influence');
let Popularity = require('../popularity');
let tax = require('../taxonomy');
let thousands = "0,0";
AWS.config.update({accessKeyId: 'AKIAJJA4YUWAJE5AUIQQ', secretAccessKey: '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'});
let S3 = AWS.S3;
let s3 = new S3();

let Post = React.createClass({
	mixins: [State, Navigation],
	getInitialState: function () {
		return {
			selected: false,
			editing: false,
			scroll: false,
			location: {},
			post: {
				id: 0
			},
			user: {
				id: 0
			}
		}
	},
	componentDidUpdate: function () {
		if (this.props.selected === true && this.props.scroll === false) {
			let element = this.getDOMNode();
			let y = element.offsetTop - element.scrollTop + element.clientTop - 80;
			window.scrollTo(0, y);
		}
	},
	componentDidMount: function () {
		this.unsubscribe = Store.listen((data) => {
			if (data.add === true) {
				this.transitionTo("edit", {id: data.post.id});
			}
			if (data.post) {
				this.setState({post: data.post});
			}
			if (data.changes) {
				let current = this.state.post;
				Object.keys(data.changes).forEach((key) => {
					current[key] = data.changes[key];
				});
				this.setState({post: current});
			}
		});
		let id = this.getParams().id || null;
		if (id) {
			Actions.single(id);
		}
		this.unsubscribeAccount = Account.listen((data) => {
			this.setState({account: data});
		});
	},
	componentWillUnmount: function () {
		this.unsubscribe();
		this.unsubscribeAccount();
	},
	componentWillReceiveProps: function (data) {
		this.setState(data);
	},
	render: function () {
		let className = "postItem";
		let meta = [];
		let stats = <Stats post={this.state.post} />;
		let post = this.state.post;
		let types = false;
		let details = false;
		let comments = false;
		let tags = false;
		let content = false;
		let links = false;
		let thumbs = false;
		for (let i = 0, keys = Object.keys(post); i < keys.length; i++) {
			let key = keys[i];
			let value = post[keys[i]];
			if (['element', 'category', 'subcategory', 'difficulty', 'scope', 'zip', 'author', 'vote'].indexOf(key) !== -1 && value !== null) {
				meta.push(<li key={key} ><strong>{key.toUpperCase()}</strong>: {value}</li>);
			}
		}
		if (this.state.hidden === true) {
			return false;
		}
		if (this.props.selected === true) {
			stats = this.state.editing ? false : <Stats post={this.state.post} selected={this.state.selected} />;
		types = this.state.types ? <Types post={this.state.post} type={this._type} /> : false;
			tags = <Tags tags={this.state.post.tags} />;
			links = <Links post={this.state.post} editing={this.state.editing} />;
			content = this.state.editing ? <TextEditor post={this.state.post} />: <div className="content" dangerouslySetInnerHTML={{__html: this.state.post.content}}></div>;
			comments = this.state.editing ? false : <Comments post={this.state.post} />;
			className += " selected";
			details = <Meta post={this.state.post} />;
		}
		if (this.state.post.privacy === 'org') {
			// let organizations = [{id: 1, name: "Phourus Inc."}, {id: 2, name: "Tyco Intl."}, {id: 3, name: "Intuit Inc."}, {id: 4, name: "Enco Industries Inc."}];
			// orgs = (
			// 	<label>Organization:
			// 		<select value={this.state.post.orgId} onChange={this._orgId}>
			// 			{organizations.map((item) => {
			// 				return (<option value={item.id}>{item.name}</option>);
			// 			})}
			// 		</select>
			// 	</label>
			// );
		}
		//<Link to="post" params={{id: this.props.post.id}}>{this.props.post.title}</Link>
		return (
			<div className={className}>
				<button className="close" onClick={this._back}>X</button>
				<div className={`type ${this.state.post.type}`} onClick={this._type}><i className="fa fa-bell" /> {this.state.post.type ? this.state.post.type : "Please select a type"}</div>
				{types}
				{this.props.editing
					? <select ref="privacy" value={this.state.post.privacy} onChange={this._privacy}>
						<option value="private">Private</option>
						<option value="org">Organization Members only</option>
						<option value="phourus">Phourus Users only</option>
						<option value="public">Everyone</option>
					</select>
					: false
				}
				{this.props.editing
					? false
					: <Link to="edit" params={{id: this.state.post.id}} className="edit"><i className="fa fa-pencil" /><br />Edit</Link>
				}
				{this.props.editing
					? <div contentEditable={true} className="title editing" onInput={this._title}>{this.state.post.title}</div>
				: <h2 className="title"><Link to="post" params={{id: this.state.post.id}}>{this.state.post.title}</Link></h2>
				}
				<div className="details">
					<div className="pic">
						<Link to="userPosts" params={{id: this.state.user.id}}>
								<img src={`/assets/avatars/${this.state.user.img || 'default'}.jpg`} />
						</Link>
					</div>
					<div className="basic">
						<span>By <Link to="userPosts" params={{id: this.state.user.id}}>{this.state.user.first} {this.state.user.last} </Link></span>
						&bull;
						<span className="location"> {this.state.location.city}, {this.state.location.state}</span>
						<div className="created">{moment(this.state.post.createdAt).fromNow()}</div>
						{details}
					</div>
					<div className="actions">
						{this.state.editing ? <button className="button green" onClick={this._update}>Save</button> : false}
					</div>
				</div>
				<div className="footing">
					{tags}
					{content}
				</div>
				{stats}
				{links}
				{comments}
			</div>
		);
	},
	_back: function () {
		this.context.router.transitionTo("stream");
	},
	_type: function () {
		this.setState({types: !this.state.types});
	},
	_privacy: function (e) {
		Actions.change('privacy', e.currentTarget.value);
	},
	_title: function (e) {
		Actions.change('title', e.currentTarget.innerHTML);
	},
	_update: function () {
		Actions.save();
	}
});

let Types = React.createClass({
	render: function () {
	  let type = this.props.post.type;
	  let classes = {};
		for (var i in Object.keys(tax)) {
			var key = Object.keys(tax)[i].slice(0, -1);
			classes[key] = key;
			if (type === key) {
				classes[key] += ' selected';
			}
		}
	  return (
				<div className="types">
	    			<div className={classes.blog} onClick={this._blog}>
		    			<strong><i className="fa fa-laptop" /> Blog</strong>
							<p>General Post type, start here if you dont know what to choose</p>
						</div>
	    			<div className={classes.event} onClick={this._events}>
		    			<strong><i className="fa fa-calendar" /> Event</strong>
							<p>Virtual or real-world event</p>
						</div>
	    			<div className={classes.subject} onClick={this._subjects}>
		    			<strong><i className="fa fa-puzzle-piece" /> Subject</strong>
							<p>Share your knowledge or expertise with the community on a variety of Subjects</p>
						</div>
	    			<div className={classes.question} onClick={this._questions}>
		    			<strong><i className="fa fa-question" /> Question</strong>
							<p>Need help or clarification on a topic? Ask it with a Question</p>
						</div>
	    			<div className={classes.debate} onClick={this._debates}>
		    			<strong><i className="fa fa-bullhorn" /> Debate</strong>
							<p>Get the discussion started with a local, county, state or national-level Debate</p>
						</div>
						<div className={classes.poll} onClick={this._polls}>
							<strong><i className="fa fa-line-chart" /> Poll</strong>
							<p>Get the discussion started with a local, county, state or national-level Debate</p>
						</div>
	    			<div className={classes.quote} onClick={this._quotes}>
		    			<strong><i className="fa fa-road" /> Quote</strong>
							<p>Has someone else already described how you feel? Post their Quote here</p>
						</div>
	    			<div className={classes.belief} onClick={this._beliefs}>
		    			<strong><i className="fa fa-quote-right" /> Belief</strong>
							<p>Tell us more about your Belief on something dear to you</p>
						</div>
				</div>
	  );
	},
	_blog: function () { Actions.change('type', 'blog'); this.props.type(); },
	_events: function () { Actions.change('type', 'event'); this.props.type(); },
	_subjects: function () { Actions.change('type', 'subject'); this.props.type(); },
	_questions: function () { Actions.change('type', 'question'); this.props.type(); },
	_debates: function () { Actions.change('type', 'debate'); this.props.type(); },
	_polls: function () { Actions.change('type', 'poll'); this.props.type(); },
	_beliefs: function () { Actions.change('type', 'belief'); this.props.type(); },
	_quotes: function () { Actions.change('type', 'quote'); this.props.type(); },
	_element: function (e) {
		var value = e.currentTarget.value;
		Actions.change('element', value);
	},
	_category: function (e) {
		var value = e.currentTarget.value;
		Actions.change('category', value);
	},
	_subcategory: function (e) {
		var value = e.currentTarget.value;
		Actions.change('subcategory', value);
	},
	_positive: function (e) {
		var value = e.currentTarget.value;
		Actions.change('positive', value);
	},
	_date: function (e) {
		var value = e.currentTarget.value;
		Actions.change('date', value);
	},
	_address: function (e) {
		var value = e.currentTarget.value;
		Actions.change('address', value);
	},
	_difficulty: function (e) {
		var value = e.currentTarget.value;
		Actions.change('difficulty', value);
	},
	_scope: function (e) {
		var value = e.currentTarget.value;
		Actions.change('scope', value);
	},
	_zip: function (e) {
		var value = e.currentTarget.value;
		Actions.change('zip', value);
	},
	_author: function (e) {
		var value = e.currentTarget.value;
		Actions.change('author', value);
	}
});

let Meta = React.createClass({
	render: function () {
	  let type = this.props.post.type;
	  let classes = {};
		for (var i in Object.keys(tax)) {
			var key = Object.keys(tax)[i].slice(0, -1);
			classes[key] = key;
			if (type === key) {
				classes[key] += ' selected';
			}
		}
		let element =
		<select ref="element" value={this.props.post.element} onChange={this._element}>
			<option value="world">World</option>
			<option value="mind">Mind</option>
			<option value="voice">Voice</option>
			<option value="self">Self</option>
		</select>
	  return (
			<div className="meta">
				<div className="types">
	    			<div className={classes.blog}>
								<div className={(type === 'blog') ? "selected" : ""}>
									<label>Element: {element}</label>
									<label>Category:
										<Select ref="category" value={this.props.post.category} onChange={this._category} data={tax.blogs[this.props.post.element]} />
									</label>
									<label>Subcategory:
										<Select ref="subcategory" value={this.props.post.subcategory} onChange={this._subcategory} data={tax.blogs.subcategory} />
									</label>
									<label>Positive?
										<input ref="positive" type="checkbox" value={this.props.post.positive} onChange={this._positive} />
									</label>
								</div>
						</div>
	    			<div className={classes.event}>
							<div className={(type === 'event') ? "selected" : ""}>
								<label>Element:</label>
								{element}
								<br />
								<label>Category:</label>
								<Select ref="category" value={this.props.post.category} onChange={this._category} data={tax.events[this.props.post.element]} />
								<br />
								<label>Date</label>
								<input ref="date" value={this.props.post.date} onChange={this._date} />
								<br />
								<label>Address</label>
								<input ref="address" value={this.props.post.address} onChange={this._address} />
								<br />
							</div>
						</div>
	    			<div className={classes.subject}>
							<div className={(type === 'subject') ? "selected" : ""}>
								<label>Category:</label>
								<Select ref="category" value={this.props.post.category} onChange={this._category} data={tax.subjects.category} />
								<br />
								<label>Subcategory:</label>
								<Select ref="subcategory" value={this.props.post.subcategory} onChange={this._subcategory} data={tax.subjects[this.props.post.category]} />
								<br />
								<label>Difficulty:</label>
								<select ref="difficulty" value={this.props.post.difficulty} onChange={this._difficulty}>
									<option>Easy</option>
									<option>Medium</option>
									<option>Hard</option>
								</select>
								<br />
							</div>
						</div>
	    			<div className={classes.question}>
							<div className={(type === 'question') ? "selected" : ""}>
								<label>Category:</label>
								<Select ref="category" value={this.props.post.subcategory} onChange={this._category} data={tax.subjects.category} />
								<br />
								<label>Subcategory:</label>
								<Select ref="subcategory" value={this.props.post.subcategory} onChange={this._subcategory} data={tax.subjects[this.props.post.category]} />
								<br />
								<label>Difficulty:</label>
								<select ref="difficulty" value={this.props.post.difficulty} onChange={this._difficulty}>
									<option>Easy</option>
									<option>Medium</option>
									<option>Hard</option>
								</select>
								<br />
							</div>
						</div>
	    			<div className={classes.debate}>
							<div className={(type === 'debate') ? "selected" : ""}>
								<label>Category:</label>
								<Select ref="category" value={this.props.post.category} onChange={this._category} data={tax.debates.category} />
								<br />
								<label>Scope:</label>
								<select ref="scope" value={this.props.post.scope} onChange={this._scope}>
									<option>Local</option>
									<option>County</option>
									<option>State</option>
								</select>
								<br />
								<label>Zip</label>
								<input ref="zip" value={this.props.post.zip} onChange={this._zip} />
								<br />
							 </div>
						</div>
						<div className={classes.poll}>
								<div className={(type === 'poll') ? "selected" : ""}>
									<label>Category:</label>
									<Select ref="category" value={this.props.post.category} onChange={this._category} data={tax.debates.category} />
									<br />
									<label>Scope:</label>
									<select ref="scope" value={this.props.post.scope} onChange={this._scope}>
										<option>Local</option>
										<option>County</option>
										<option>State</option>
									</select>
									<br />
									<label>Zip</label>
									<input ref="zip" value={this.props.post.zip} onChange={this._zip} />
									<br />
								 </div>
						</div>
	    			<div className={classes.quote}>
							<div className={(type === 'quote') ? "selected" : ""}>
								<label>Source/Author</label>
								<input ref="author" value={this.props.post.author} onChange={this._author} />
								<br />
							</div>
						</div>
	    			<div className={classes.belief} onClick={this._beliefs}>
							<div className={(type === 'belief') ? "selected" : ""}>
								<label>Category:</label>
								<Select ref="category" value={this.props.post.category} onChange={this._category} data={tax.beliefs.category} />
								<br />
							</div>
						</div>
				</div>
			</div>
	  );
	},
	_element: function (e) {
		var value = e.currentTarget.value;
		Actions.change('element', value);
	},
	_category: function (e) {
		var value = e.currentTarget.value;
		Actions.change('category', value);
	},
	_subcategory: function (e) {
		var value = e.currentTarget.value;
		Actions.change('subcategory', value);
	},
	_positive: function (e) {
		var value = e.currentTarget.value;
		Actions.change('positive', value);
	},
	_date: function (e) {
		var value = e.currentTarget.value;
		Actions.change('date', value);
	},
	_address: function (e) {
		var value = e.currentTarget.value;
		Actions.change('address', value);
	},
	_difficulty: function (e) {
		var value = e.currentTarget.value;
		Actions.change('difficulty', value);
	},
	_scope: function (e) {
		var value = e.currentTarget.value;
		Actions.change('scope', value);
	},
	_zip: function (e) {
		var value = e.currentTarget.value;
		Actions.change('zip', value);
	},
	_author: function (e) {
		var value = e.currentTarget.value;
		Actions.change('author', value);
	}
});


let TextEditor = React.createClass({
	render: function () {
		let content = this.props.post.content || "";
		return (
			<div>
				<RTE ref="content" placeholder="insert content here" value={content} onChange={this._content} theme="snow" />
			</div>
		);
	},
	_content: function (value) {
		Actions.change('content', value);
	}
});

let Stats = React.createClass({
	componentDidMount: function () {
		let element = document.getElementById(`popularity${this.props.post.id}`);
		let popularity = new Popularity(element, this.props.post.popularity);
	},
	render: function () {
		return (
			<div className="interact">
				{this.props.selected ? <Thumbs post={this.props.post} /> : false}
				<Influence influence={this.props.post.influence}/>
				<div className="popularity">
					<canvas id={`popularity${this.props.post.id}`}></canvas>
					<div>Popularity</div>
				</div>
				<div className="stats">
					<div><strong>{numeral(this.props.post.totalViews).format(thousands)}</strong><br /><i className="fa fa-eye" /> Views</div>
					<div><strong>{numeral(this.props.post.totalComments).format(thousands)}</strong><br /><i className="fa fa-comments" /> Comments</div>
					<div><strong>{numeral(this.props.post.totalThumbs).format(thousands)}</strong><br /><i className="fa fa-thumbs-up" /> Thumbs</div>
				</div>
			</div>
		);
	}
});

let Tags = React.createClass({
  getDefaultProps: function () {
		return {
			tags: []
		}
	},
	render: function () {
    return (
      <div className="tags">
        <i className="fa fa-tag" />
        {this.props.tags.map((item, index) => {
          return (
            <span className="tag" key={index}><a href="">{item.tag}</a></span>
          );
        })}
      </div>
    );
  }
});

Tags.Editor = React.createClass({
	getDefaultProps: function () {
		return {
			post: {
				id: null,
				tags: []
			}
		}
	},
	getInitialState: function () {
		return {
			tag: ""
		}
	},
	render: function () {
		let currentTags = [];
		if (this.props.post && this.props.post.tags) {
			currentTags = this.props.post.tags.map((item) => {
				return <div key={item.id} className="tag">{item.tag}<a href="javascript:void(0)" id={item.id} className="remove" onClick={this._remove}>x</a></div>
			});
		}
		return (
			<div>
				<label>Tag your post:<br />
					<div className="tagField">
						{currentTags}
						<input placeholder="add tags here" onChange={this._change} type="text" value={this.state.tag} />
						<button ref="add" onClick={this._add} className="button green small">Add Tag</button>
					</div>
				</label>
			</div>
		);
	},
	_change: function (e) {
		let value = e.currentTarget.value;
		this.setState({tag: value});
	},
	_add: function () {
		let model = {};
		if (this.state.tag.length > 1 && this.props.post.id) {
			model.tag = this.state.tag;
			model.postId = this.props.post.id;
			Actions.Tags.add(model);
			this.setState({tag: ""});
			return;
		}
		console.error('post must have an id first');
	},
	_remove: function (e) {
		let id = e.currentTarget.id;
		Actions.Tags.remove(id);
	},
});

let Links = React.createClass({
	render: function () {
		return (
			<div className="links">
				<h2>Links & Attachments</h2>
				{this.props.editing ? <Links.Edit post={this.props.post} /> : false}
				<Links.List post={this.props.post} />
			</div>
		);
	}
});

Links.List = React.createClass({
	render: function () {
		let links = this.props.post.links || [];
		return (
			<div className="list">
				{links.map((item, index) => {
					let icon = 'fa fa-link';
					if (item.upload) {
						let ext = item.url.split(".").slice(-1)[0];
						icon = 'fa fa-file' + this._icon(ext) + '-o';
					}

					return (
						<div key={item.id}>
							<div className="icon">
								<i className={icon} />
								<a id={index} className="edit" onClick={this._edit}>Edit</a>
							</div>
							<div>
								<button id={item.id} className="remove" onClick={this._remove}>X</button>
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
		this.unsubscribe = Store.Links.listen((data) => {
			this.setState(data);
		});
	},
	componentWillUnmount: function () {
		this.unsubscribe();
	},
	render: function () {
		let button = <button onClick={this._add} className="button green small add">Add Link</button>;
		if (this.state.mode === 'edit') {
			button = <button onClick={this._save} className="button green small edit">Save Changes</button>;
		}
		return (
			<div className="fields">
				<label>Link Title:<br />
					<input type="text" onChange={this._changeTitle} value={this.state.title} placeholder="enter title" />
				</label>
				<label className="upload">Link URL/Upload:
					<input type="text" onChange={this._changeURL} value={this.state.url} placeholder="enter URL or upload"/>
					<Links.Upload />
					<button className="button blue"><i className="fa fa-dropbox" /> DropBox</button>
				</label>
				<label>Caption:
					<textarea type="text" onChange={this._changeCaption} placeholder="enter short description">{this.state.caption}</textarea>
				</label>
				{button}
			</div>
		);
	},
	_add: function () {
		if (this.props.post.id) {
			let model = {};
			model.title = this.state.title;
			model.url = this.state.url;
			model.caption = this.state.caption;
			model.postId = this.props.post.id;
			Actions.Links.add(model);
			return;
		}
		console.error('post must have an id first');
	},
	_remove: function (e) {
		let id = e.currentTarget.id;
		Actions.Links.remove(id);
	},
	_edit: function (e) {
		var id = e.currentTarget.id;
		var state = this.props.post.links[id];
		state.mode = 'edit';
		this.setState(state);
	},
	_save: function () {
		let link = {};
		link.title = this.state.title;
		link.url = this.state.url;
		link.caption = this.state.caption;
		Actions.Links.save(this.state.id,  link);
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

let Thumbs = React.createClass({
   mixins: [Router.State],
   componentDidMount: function () {
     let params = this.getParams();
     this.unsubscribe = Store.Thumbs.listen((data) => {
       this.setState(data);
     });
     Actions.Thumbs.post(params.id);
   },
   componentWillUnmount: function () {
     this.unsubscribe();
   },
   like: function () {
     let model = {};
     model.post_id = this.props.post.id;
     model.positive = 1;
     thumbs.add(model);
   },
   dislike: function () {
     let model = {};
     model.post_id = this.props.post.id;
     model.positive = 0;
     thumbs.add(model);
   },
   render: function () {
     let c = '';
     let current = '';
     if (this.props.post.popularity) {
       //new Popularity(document.getElementById('popularity'), this.props.post.popularity);
     }
     if (this.props.thumb === 1) {
       current = 'like';
     } else if (this.props.thumb === 0) {
       current = 'dislike';
     }
     // <p>You have decided you {current} this post. Click the button below to change your mind.</p>
     return (
        <div className="thumb">
          <div className="buttons">
            <button className="button green medium" onClick={this.like}><i className="fa fa-arrow-circle-o-up" /> <span className="total"> {numeral(1434).format(thousands)}</span></button>
            <button className="button red medium" onClick={this.dislike}><i className="fa fa-arrow-circle-o-down" /> <span className="total"> {numeral(137).format(thousands)}</span></button>
          </div>
        </div>
     );
   }
});

let Comments = React.createClass({
  mixins: [Router.State],
  getInitialState: function () {
    return {
      count: 0,
      rows: []
    }
  },
  componentDidMount: function () {
    //let params = this.getParams();
    this.unsubscribe = Store.Comments.listen((data) => {
			this.setState(data);
    });
    Actions.Comments.collection(this.props.post.id);
  },
  componentWillUnmount: function () {
    this.unsubscribe();
  },
  render: function () {
    let create = <h3>You must be logged-in to comment</h3>
    let token = null;
    if (token === null) {
      //pic = <a href="#user/{this.props.id}"><img src="{this.props.pic}" width="100"></a>
    }
    let data = this.state.rows;
    let comments = [];
    if (data) {
      comments = data.map(function (item, i) {
        return <Comments.Comment key={item.id} comment={item} user={item.user} />;
      });
    }
    if (1) {
      create = <Comments.Create />
    }
    return (
      <div>
				<h2>Comments</h2>
        <div className="comments">{comments}</div>
        {create}
      </div>
    );
  }
});

Comments.Create = React.createClass({
  add: function () {
    let model = {};
    model.content = this.refs.comment.getDOMNode().value;
    model.post_id = this.props.postID;
    Actions.Comments.add(model);
  },
  render: function () {
    return (
      <div className="create">
        <div className="pic">
          <Link to="account">
            <img src={"/assets/avatars/1.jpg"} />
          </Link>
        </div>
        <textarea ref="comment" placeholder="Comment goes here"></textarea>
        <button className="button green add" onClick={this.add}>
          <i className="fa fa-comment" /> Post Comment
        </button>
      </div>
    );
  }
});

Comments.Comment = React.createClass({
  render: function () {
    let textarea = '';
    /*
    if (owner === true) {
    textarea =   <textarea>{this.props.id}</textarea>
    actions =
    <% if(owner === true){ %>
    <div class="actions-admin">
    <button class="button blue edit">Edit Comment</button>
    <button class="button red delete">Delete Comment</button>
    </div>
    <div class="actions-edit">
    <button class="button green save">Save Changes</button>
    <button class="button red cancel">Cancel</button>
    </div>
    <div class="actions-delete">
    <button class="button green confirm">Confirm Delete</button>
    <button class="button red cancel">Cancel</button>
    </div>

    }
    */
    return (
      <div className="comment" ref={this.props.id}>
        <div className="pic">
          <Link to="userPosts" params={{id: this.props.user.id}}>
            <img src={`/assets/avatars/${this.props.user.img}.jpg`} width="100" />
          </Link>
        </div>
        <div className="content">
          <Link to="userPosts" params={{id: this.props.user.id}} className="username">
            {this.props.user.username} ({this.props.user.influence})
          </Link>
          <p>{this.props.comment.content}</p>
          <span className="date">{moment(this.props.comment.createdAt).fromNow()}</span>
        </div>
        <div className="actions"></div>
      </div>
    );
  }
});

let Select = React.createClass({
  render: function () {
    let list =[];
    if (!this.props.data) {
      return (<select><option disabled={true}>--Please Select a Category--</option></select>);
    }
    list = this.props.data.map(function (item) {
      return <option key={item.label} value={item.value}>{item.label}</option>;
    });
    return (
      <select>
      	{list}
      </select>
    );
  }
});
/*
<li><strong>Positive:</strong> {this.props.meta.positive}</li>
<li><strong>Category:</strong> {this.props.meta.category}</li>
<li><strong>Element:</strong> {this.props.meta.element}</li>
<li><strong>Date/Time:</strong> {this.props.post.date}</li>
<li><strong>Address:</strong> {this.props.address.city}</li>
<li><strong>Difficulty:</strong> {this.props.meta.difficulty}</li>
<li><strong>Scope:</strong> {this.props.meta.scope}</li>
*/

module.exports = Post;
