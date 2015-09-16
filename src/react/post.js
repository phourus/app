"use strict";
let React = require('react');
let Router = require('react-router');
let { Link, State, Navigation } = Router;
let moment = require('moment');
let numeral = require('numeral');
let RTE = require('react-quill');
let File = require('react-dropzone-component');
//let AWS = require('aws-sdk');

let Actions = require('../actions/post');
let Stream = require('../actions/stream');
let ActionsAccount = require('../actions/account');

let Store = require('../stores/post');
let AccountStore = require('../stores/account');

let Loader = require('./loader');
let Influence = require('../influence');
let Popularity = require('../popularity');
let tax = require('../taxonomy');
let thousands = "0,0";
// AWS.config.update({accessKeyId: 'AKIAJJA4YUWAJE5AUIQQ', secretAccessKey: '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'});
// let S3 = AWS.S3;
// let s3 = new S3();

let Post = React.createClass({
	mixins: [State, Navigation],
	getInitialState: function () {
		return {
			scroll: false,
			owner: false,
			location: {},
			saving: false,
			post: {
				id: 0
			},
			user: {
				id: 0
			}
		}
	},
	componentDidUpdate: function () {
		if ((this.props.context.type === 'post' || this.props.context.type === 'edit') && this.props.scroll === false) {
			let element = this.getDOMNode();
			let y = element.offsetTop - element.scrollTop + element.clientTop - 80;
			window.scrollTo(0, y);
		}
	},
	componentDidMount: function () {
		this.unsubscribe = Store.listen((data) => {
			if (data.hasOwnProperty('saving')) {
				this.setState({saving: data.saving});
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
		this._context(this.props);
	},
	componentWillUnmount: function () {
		this.unsubscribe();
	},
	componentWillReceiveProps: function (data) {
		this._context(data);
	},
	render: function () {
		let className = "postItem";
		let meta = [];
		let stats = <Stats post={this.state.post} context={this.props.context} />;
		let post = this.state.post;
		let types = false;
		let comments = false;
		let tags = false;
		let content = false;
		let links = false;
		let thumbs = false;
		let orgs = <Orgs post={this.state.post} />;
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
		if (this.props.context.type === 'post' || this.props.context.type === 'edit') {
			stats = this.props.context.type === 'edit' ? false : <Stats post={this.state.post} context={this.props.context} />;
		types = this.state.types ? <Types post={this.state.post} type={this._type} context={this.props.context} owner={this.props.owner} /> : false;
			tags = <Tags post={this.state.post} context={this.props.context} owner={this.props.owner} />;
			links = <Links post={this.state.post} context={this.props.context} owner={this.props.owner} />;
			content = this.props.context.type === 'edit' && this.props.owner ? <TextEditor post={this.state.post} />: <div className="content" dangerouslySetInnerHTML={{__html: this.state.post.content}}></div>;
			comments = this.props.context.type === 'edit' ? false : <Comments post={this.state.post} />;
			className += " selected";
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
				{this.props.owner && this.props.context.type !== 'edit'
					? <Link to="edit" params={{id: this.state.post.id}} className="edit"><i className="fa fa-pencil" /><br />Edit</Link>
					: false
				}
				<div className={`type ${this.state.post.type}`} onClick={this._type}><i className="fa fa-bell" /> {this.state.post.type ? this.state.post.type : "Please select a type"}</div>
				<div className="categories">
					{this.state.post.category
						? <a href="javascript:void()">{this.state.post.category}</a>
						: false
					}
					{this.state.post.category && this.state.post.subcategory
						? " >> "
						: false
					}
					{this.state.post.subcategory
						? <a href='javascript:void(0)'>{this.state.post.subcategory}</a>
						: false
					}
				</div>
				{types}
				{this.props.context.type === 'edit' && this.props.owner
					? <select ref="privacy" value={this.state.post.privacy} onChange={this._privacy}>
						<option value="private">Private</option>
						<option value="org">Organization Members only</option>
						<option value="phourus">Phourus Users only</option>
						<option value="public">Everyone</option>
					</select>
					: false
				}
				{this.state.post.privacy === 'org' && this.props.context.type === 'edit'
					? {orgs}
					: false
				}
				{this.props.context.type === 'edit' && this.props.owner
					? <input className="title editing" onChange={this._title} value={this.state.post.title} />
				: <h2 className="title"><Link to="post" params={{id: this.state.post.id}}>{this.state.post.title}</Link></h2>
				}
				{this.props.context.type === 'edit'
					? false
					: <Details {...this.state} context={this.props.context} owner={this.props.owner}  />
				}
				{tags}
				{content}
				{stats}
				{links}
				{comments}
			</div>
		);
	},
	_context: function (data) {
		let id = this.getParams().id || null;
		if (this.props.context.type === 'edit' || this.props.context.type === 'post') {
			Actions.single(id);
			Actions.Comments.collection({postId: id});
		}
		this.setState(data);
	},
	_back: function () {
		if (!this.goBack()) {
			if (this.props.context.type === 'edit') {
				this.context.router.transitionTo("myPosts");
			} else {
				this.context.router.transitionTo("stream");
			}
		}
	},
	_type: function () {
		if (this.props.context.type === 'edit' && this.props.owner) {
			this.setState({types: !this.state.types});
		}
	},
	_privacy: function (e) {
		Actions.change('privacy', e.currentTarget.value);
	},
	_title: function (e) {
		Actions.change('title', e.currentTarget.value);
	},
	_update: function () {
		Store.post.id = this.props.post.id;
		this.setState({saving: true});
		Actions.save();
	}
});

let Details = React.createClass({
	render: function () {
		return (
			<div className="details">
				<Pic id={this.props.user.id} img={this.props.user.img} />
				<div className="basic">
					<span>By <Link to="userPosts" params={{id: this.props.user.id}}>{this.props.user.first} {this.props.user.last} </Link></span>
					&bull;
					<span className="location"> {this.props.location.city}, {this.props.location.state}</span>
					<div className="created">{moment(this.props.post.createdAt).fromNow()}</div>
					<Meta post={this.props.post} context={this.props.context} owner={this.props.owner} />
				</div>
				<div className="actions">
					{this.props.context.type === 'edit' && this.props.owner ? <button className="button green" onClick={this._update} disabled={this.props.saving}>{this.props.saving ? 'Saving' : 'Save'}</button> : false}
				</div>
			</div>
		);
	}
});

let Pic = React.createClass({
  getInitialState: function () {
    return {
			id: 0,
      img: '/assets/avatars/default.jpg',
      default: '/assets/avatars/default.jpg',
      upload: 0
    }
  },
  componentWillReceiveProps: function (data) {
    if (data.img) {
      data.upload = this.state.upload + 1;
      this.setState(data);
    }
  },
  render: function () {
    return (
      <div className="pic">
				<Link to="userPosts" params={{id: this.state.id}}>
        	<img src={this.state.img + '?upload=' + this.state.upload} onClick={this._upload} onError={this._default} />
				</Link>
      </div>
    );
  },
  _default: function () {
    this.setState({img: this.state.default});
  }
});

let Orgs = React.createClass({
  mixins: [Navigation],
  getInitialState: function () {
    return {
      orgs: []
    }
  },
  componentDidMount: function () {
    this.unsubscribe = AccountStore.listen((data) => {
      if (data.orgs) {
        this.setState({orgs: data.orgs});
      }
    });
    ActionsAccount.orgs();
  },
  componentWillUnmount: function () {
    this.unsubscribe();
  },
  render: function () {
    return (
      <div className="orgs">
        {this.state.orgs.map((item) => {
					if (item.approved !== true) {
						return false;
					}
					return (
            <div className="org">
							{item.org.name}
              <button id={item.org.id} onClick={this._select} className="button blue" disabled={this.props.post.orgId === item.org.id}>Select Organization</button>
            </div>
          );
        })}
      </div>
    );
  },
  _select: function (e) {
		Actions.change('orgId', e.currentTarget.id);
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
		let descriptions = {
			blog: "General Post type, start here if you dont know what to choose",
			event: "Virtual or real-world event",
			subject: "Share your knowledge or expertise with the community on a variety of Subjects",
			question: "Need help or clarification on a topic? Ask it with a Question",
			debate: "Get the discussion started with a local, county, state or national-level Debate",
			poll: "Get the discussion started with a local, county, state or national-level Debate",
			quote: "Has someone else already described how you feel? Post their Quote here",
			belief: "Tell us more about your Belief on something dear to you"
		};
		let icons = {
			blog: "laptop",
			event: "calendar",
			subject: "puzzle-piece",
			question: "question",
			debate: "bullhorn",
			poll: "line-chart",
			quote: "quote-right",
			belief: "road"
		};
	  return (
			<div className="types">
				{['blog', 'event', 'subject', 'question', 'debate', 'poll', 'quote', 'belief'].map((item) => {
					let fields = <Meta {...this.props} context={this.props.context} owner={this.props.owner} />
console.log(item, type);
					return (<div className={classes[item]} onClick={this._select.bind(this, item)}>
						<strong><i className={"fa fa-" + icons[item]} /> {item}</strong>
						{item === type
							? <div className=""><p>{descriptions[item]}</p>{fields}</div>
							: false
						}
					</div>)
				})}
			</div>
	  );
	},
	_select: function (type) { Actions.change('type', type); },
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
		let fields = {
			blog: ['positive'],
			event: ['date', 'address'],
			subject: ['difficulty'],
			question: ['difficulty'],
			debate: ['scope', 'zip'],
			poll: ['scope', 'zip'],
			quote: [''],
			belief: ['author']
		};
		let inputs = {
			positive: (<label>Positive?
					{this.props.context.type === 'edit' && this.props.owner
						? <input ref="positive" type="checkbox" value={this.props.post.positive} onChange={this._positive} />
						: <strong>{this.props.post.positive}</strong>
					}
				</label>),
			date: (<label>Date
					{this.props.context.type === 'edit' && this.props.owner
						? <input ref="date" value={this.props.post.date} onChange={this._date} />
						: <strong>{this.props.post.date}</strong>
					}
				</label>),
			address: (<label>Address
				{this.props.context.type === 'edit' && this.props.owner
					? <input ref="address" value={this.props.post.address} onChange={this._address} />
					: <strong>{this.props.post.address}</strong>
				}
			</label>),
			difficulty: (<label>Difficulty:
				{this.props.context.type === 'edit' && this.props.owner
					? <select ref="difficulty" value={this.props.post.difficulty} onChange={this._difficulty}>
						<option>Easy</option>
						<option>Medium</option>
						<option>Hard</option>
					</select>
					: <strong>{this.props.post.difficulty}</strong>
				}
			</label>),
			scope: (<label>Scope:
				{this.props.context.type === 'edit' && this.props.owner
					? <select ref="scope" value={this.props.post.scope} onChange={this._scope}>
							<option>Local</option>
							<option>County</option>
							<option>State</option>
						</select>
					: <strong>{this.props.post.scope}</strong>
				}
			</label>),
			zip: (<label>Zip
				{this.props.context.type === 'edit' && this.props.owner
					? <input ref="zip" value={this.props.post.zip} onChange={this._zip} />
					: <strong>{this.props.post.zip}</strong>
				}
			</label>),
			author: (<label>Source/Author
				{this.props.context.type === 'edit' && this.props.owner
					? <input ref="author" value={this.props.post.author} onChange={this._author} />
					: <strong>{this.props.post.author}</strong>
				}
			</label>)
		};
		let data = fields[type] || [];
		return (
			<div>
				{data.map((item) => {
					return inputs[item];
				})}
			</div>
		);
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
		if (!this.props.post.hasOwnProperty('content')) {
			return false;
		}
		let content = this.props.post.content;
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
				{this.props.context.type === 'post' ? <Thumbs post={this.props.post} /> : false}
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
    let tags = this.props.post.tags || [];
		return (
      <div className="tags">
        <i className="fa fa-tag" />
        {tags.map((item, index) => {
          return (
            <span className="tag" key={index}>
							<a href="">{item.tag}</a>
							{this.props.context.type === 'edit' && this.props.owner
								? <a href="javascript:void(0)" id={item.id} className="remove" onClick={this._remove}>x</a>
								: false
							}
						</span>
          );
        })}
				{this.props.context.type === 'edit' && this.props.owner
					? <div className="tagField">
					<input placeholder="add tags here" onChange={this._change} type="text" value={this.state.tag} />
					<button ref="add" onClick={this._add}>Add Tag</button>
				</div>
					: false
				}
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
		}
	},
	_remove: function (e) {
		let id = e.currentTarget.id;
		Actions.Tags.remove(id);
	}
});

let Links = React.createClass({
	componentDidMount: function () {
		this.unsubscribe = Store.Links.listen((data) => {
			this.setState(data);
		});
	},
	componentWillUnmount: function () {
		this.unsubscribe();
	},
	render: function () {
		return (
			<div className="links">
				<h2>Links & Attachments</h2>
				{this.props.context.type === 'edit' && this.props.owner ? <Links.Edit post={this.props.post} {...this.state} /> : false}
				<Links.List post={this.props.post} context={this.props.context} owner={this.props.owner} edit={this._edit} />
			</div>
		);
	},
	_edit: function (e) {
		var id = e.currentTarget.id;
		var state = this.props.post.links[id];
		state.mode = 'edit';
		this.setState(state);
	}
});

Links.List = React.createClass({
	render: function () {
		let links = this.props.post.links || [];
		if (links.length < 1) {
			return (
				<div className="list">
					<h3>This post does not have any links</h3>
				</div>
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
		Actions.Links.remove(id);
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
			</div>
		);
	},
	_add: function () {
		let model = {};
		model.title = this.state.title;
		model.url = this.state.url;
		model.caption = this.state.caption;
		model.postId = this.props.post.id;
		Actions.Links.add(model);
		this._clear();
	},
	_save: function () {
		let link = {};
		link.title = this.state.title;
		link.url = this.state.url;
		link.caption = this.state.caption;
		Actions.Links.save(this.state.id, link);
		this._clear();
	},
	_changeTitle: function (e) {
		let value = e.currentTarget.value;
		this.setState({title: value});
		this._clear();
	},
	_changeURL: function (e) {
		let value = e.currentTarget.value;
		this.setState({url: value});
		this._clear();
	},
	_changeCaption: function (e) {
		let value = e.currentTarget.value;
		this.setState({caption: value});
		this._clear();
	},
	_clear: function () {
		this.setState({code: null, action: null});
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
	 getInitialState: function () {
		 return {
			 id: null,
			 positive: null
		 }
	 },
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
   render: function () {
		 let classLike = "button green medium";
		 let classDislike = "button red medium";
     if (this.state.positive === true) {
       classLike += ' selected';
     } else if (this.state.positive === false) {
       classDislike += ' selected';
     }
     // <p>You have decided you {current} this post. Click the button below to change your mind.</p>
     return (
        <div className="thumb">
          <div className="buttons">
            <button className={classLike} onClick={this.state.positive === true ? this._remove : this._like}><i className="fa fa-arrow-circle-o-up" /> <span className="total"> Like</span></button>
            <button className={classDislike} onClick={this.state.positive === false ? this._remove: this._dislike}><i className="fa fa-arrow-circle-o-down" /> <span className="total"> Dislike</span></button>
          </div>
        </div>
     );
   },
	 _like: function () {
		 let model = {
			 positive: 1
		 };
		 if (this.state.id) {
			 Actions.Thumbs.save(this.state.id, model);
		 } else {
			 model.postId = this.props.post.id;
			 Actions.Thumbs.add(model);
		 }
	 },
	 _dislike: function () {
		 let model = {
			 positive: 0
		 };
			if (this.state.id) {
				Actions.Thumbs.save(this.state.id, model);
			} else {
				model.postId = this.props.post.id;
				Actions.Thumbs.add(model);
			}
	 },
	 _remove: function () {
		 Actions.Thumbs.remove(this.state.id);
	 }
});

let Comments = React.createClass({
  mixins: [Router.State],
  getInitialState: function () {
    return {
			ready: false,
      count: 0,
      rows: []
    }
  },
  componentDidMount: function () {
    this.unsubscribe = Store.Comments.listen((data) => {
			if (this.state.ready === false) {
				data.ready = true;
			}
			this.setState(data);
    });
		// Actions.Comments.collection moved to Post component because initial
		// render postID = 0
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
    if (data && this.state.ready === true) {
			if (data.length > 0) {
				comments = data.map(function (item, i) {
					return <Comments.Comment key={item.id} comment={item} user={item.user} />;
				});
			} else {
				comments = <h3>This post does not have any comments. Be the first!</h3>;
			}
    } else {
			//comments = <Loader />
		}
    if (AccountStore.authenticated) {
      create = <Comments.Create post={this.props.post} />
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
  getInitialState: function () {
		return {
			content: ""
		}
	},
	render: function () {
    return (
      <div className="create">
        <div className="pic">
          <Link to="account">
            <img src={"/assets/avatars/1.jpg"} />
          </Link>
        </div>
        <textarea ref="comment" placeholder="Comment goes here" value={this.state.content} onChange={this._content} />
        <button className="button green add" onClick={this._add}>
          <i className="fa fa-comment" /> Post Comment
        </button>
      </div>
    );
  },
	_add: function () {
		let model = {};
		model.content = this.state.content;
		model.postId = this.props.post.id;
		Actions.Comments.add(model);
		this.setState({content: ""});
	},
	_content: function (e) {
		let value = e.currentTarget.value;
		this.setState({content: value});
	}
});

Comments.Comment = React.createClass({
  mixins: [Navigation],
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
</Link>

    }
    */
    return (
      <div className="comment" id={this.props.comment.id}>
				<Pic id={this.props.user.id} img={this.props.user.img} />
        <div className="content">
					<Link to="userPosts" params={{id: this.props.user.id}} className="username">
						{this.props.user.first} {this.props.user.last} ({this.props.user.influence})
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
