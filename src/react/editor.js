let React = require('react');
let Router = require('react-router');
let { RouteHandler, Link } = Router;
let moment = require('moment');
let View401 = require('./401');
let Actions = require('../actions/editor');
let Store = require('../stores/editor');
let token = require('../token');
let tax = require('../taxonomy');
let RTE = require('react-quill');

let Editor = React.createClass({
	mixins: [Router.State, Router.Navigation],
	getInitialState: function () {
		return {
			post: {}
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
	},
	componentWillUnmount: function () {
		this.unsubscribe();
	},
	render: function () {
		let orgs = false;
		let view = <TextEditor ref="rte" post={this.state.post}></TextEditor>
		if (token.get() === false) {
			return (<View401 />);
		}
		let remove = false;
		if (this.state.post.id) {
       remove = <button ref="remove" className="button red">Delete Post <i className="fa fa-trash" /></button>
    }
    let privacy = this.state.post.privacy || 'private';

		if (this.state.mode === 'tags') {
			view = (<div>
				<h1>Types & Tags</h1>
				<Tags ref="tags" {...this.state}></Tags>
				<Details ref="details" post={this.state.post}></Details>
			</div>);
		}

		if (this.state.mode === 'links') {
			view = <Links post={this.state.post} />
		}

		if (this.state.mode === 'share') {
			view = (<div>
				<h1>Share Post</h1>
			</div>);
		}

		if (this.state.mode === 'import') {
			view = <Import />
		}

		if (this.state.post.privacy === 'org') {
			let organizations = [{id: 1, name: "Phourus Inc."}, {id: 2, name: "Tyco Intl."}, {id: 3, name: "Intuit Inc."}, {id: 4, name: "Enco Industries Inc."}];
			orgs = (
				<label>Organization:
					<select value={this.state.post.orgId} onChange={this._orgId}>
						{organizations.map((item) => {
							return (<option value={item.id}>{item.name}</option>);
						})}
					</select>
				</label>
			);
		}
		//
		//
		//
		// <div ref="actions" className="actions">
		// 	<button ref="save" className="button green" onClick={this._save}>
		// 		{this.state.post.id ? "Update Post" : "Create New Post"}
		// 		<i className="fa fa-pencil" />
		// 	</button>
		// 	{remove}
		// 	<button ref="back" className="button blue" onClick={this._list}>
		// 		Back to List
		// 		<i className="fa fa-list" />
		// 	</button>
		// </div>
		let classes = {
			content: "fa fa-quote-right",
			tags: "fa fa-tags",
			links: "fa fa-photo",
			share: "fa fa-cloud"
		}
		classes[this.state.mode] += ' selected';
		return (
			<div className="editor">
				<div className="heading">
				  <div>
						<label>Title:
							<input ref="title" type="text" placeholder="title" value={this.state.post.title} onChange={this._title} />
						</label>
						<label>Privacy:
							<select ref="privacy" value={privacy} onChange={this._privacy}>
								<option value="private">Private</option>
								<option value="org">Organization Members only</option>
								<option value="phourus">Phourus Users only</option>
								<option value="public">Everyone</option>
							</select>
						</label>
						{orgs}
					</div>
					<div className="actions">
						<div>
							<button onClick={this._save} style={{height: "80px"}} className="button green save">Save</button>
						</div>
						<div>
							<Link to="myPosts" className="button blue">Edit my posts</Link>
							<a href="javascript:void(0)" className="button blue" onClick={this._import}>Import content</a><br />
						</div>
					</div>
					<div className="modes">
						<button className={classes.content} onClick={this._content}><br />Content</button>
						<button className={classes.tags} onClick={this._tags}><br />Tags</button>
						<button className={classes.links} onClick={this._links}><br />Links</button>
						<button className={classes.share} onClick={this._share}><br />Share</button>
					</div>
				</div>
				<div className="subview">{view}</div>
			</div>
		);
	},
	_content: function () {
		this.setState({mode: 'content'});
	},
	_tags: function () {
		this.setState({mode: 'tags'});
	},
	_links: function () {
		this.setState({mode: 'links'});
	},
	_share: function () {
		this.setState({mode: 'share'});
	},
	_import: function () {
		this.setState({mode: 'import'});
	},
	_save: function () {
		if (this.state.post.id) {
			Actions.save();
		} else {
			Actions.add();
		}
	},
	_reset: function () {
		Actions.reset();
	},
	_privacy: function (e) {
		let value = e.currentTarget.value;
		Actions.change('privacy', value);
	},
	_orgId: function (e) {
		let value = e.currentTarget.value;
		Actions.change('orgId', value);
	},
	_title: function (e) {
		let value = e.currentTarget.value;
		Actions.change('title', value);
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

let Details = React.createClass({
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
			<div className="details">
				<div className="types">
	    			<div className={classes.blog} onClick={this._blog}>
		    			<strong><i className="fa fa-laptop" /> Blog</strong>
							<p>General Post type, start here if you dont know what to choose</p>
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
	    			<div className={classes.event} onClick={this._events}>
		    			<strong><i className="fa fa-calendar" /> Event</strong>
							<p>Virtual or real-world event</p>
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
	    			<div className={classes.subject} onClick={this._subjects}>
		    			<strong><i className="fa fa-puzzle-piece" /> Subject</strong>
							<p>Share your knowledge or expertise with the community on a letiety of Subjects</p>
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
	    			<div className={classes.question} onClick={this._questions}>
		    			<strong><i className="fa fa-question" /> Question</strong>
							<p>Need help or clarification on a topic? Ask it with a Question</p>
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
	    			<div className={classes.debate} onClick={this._debates}>
		    			<strong><i className="fa fa-bullhorn" /> Debate</strong>
							<p>Get the discussion started with a local, county, state or national-level Debate</p>
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
						<div className={classes.poll} onClick={this._polls}>
							<strong><i className="fa fa-line-chart" /> Poll</strong>
							<p>Get the discussion started with a local, county, state or national-level Debate</p>
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
	    			<div className={classes.quote} onClick={this._quotes}>
		    			<strong><i className="fa fa-road" /> Quote</strong>
							<p>Has someone else already described how you feel? Post their Quote here</p>
							<div className={(type === 'quote') ? "selected" : ""}>
								<label>Source/Author</label>
								<input ref="author" value={this.props.post.author} onChange={this._author} />
								<br />
							</div>
						</div>
	    			<div className={classes.belief} onClick={this._beliefs}>
		    			<strong><i className="fa fa-quote-right" /> Belief</strong>
							<p>Tell us more about your Belief on something dear to you</p>
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
	_blog: function () { Actions.change('type', 'blog'); },
	_events: function () { Actions.change('type', 'event'); },
	_subjects: function () { Actions.change('type', 'subject'); },
	_questions: function () { Actions.change('type', 'question'); },
	_debates: function () { Actions.change('type', 'debate'); },
	_polls: function () { Actions.change('type', 'poll'); },
	_beliefs: function () { Actions.change('type', 'belief'); },
	_quotes: function () { Actions.change('type', 'quote'); },
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
		let currentTags = [];
		if (this.props.post && this.props.post.tags) {
			currentTags = this.props.post.tags.map((item) => {
				return <div key={item.id} className="tag">{item.tag} <button id={item.id} className="remove" onClick={this._remove}>x</button></div>
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
		let links = this.props.post.links || [];
		let button = <button onClick={this._add} className="button green small add">Add Link</button>;
		let list = links.map((item, index) => {
			let image = item.img || '/assets/logos/logo-emblem.png';
			return (
				<div key={item.id}>
					<div className="image">
						<img src={image} />
					</div>
					<div>
						<button id={item.id} className="remove" onClick={this._remove}>X</button>
						<a href={item.url} target="_blank">{item.title}</a>
						<p>{item.caption}</p>
						<button id={index} className="button blue edit" onClick={this._edit}>Edit</button>
					</div>
					<div style={{clear: 'both'}}></div>
				</div>
			);
		});
		if (this.state.mode === 'edit') {
			button = <button onClick={this._save} className="button green small edit">Save Changes</button>;
		}
		return (
			<div className="links">
				<h1>Links</h1>
				<div className="fields">
					<label>Link Title:<br />
						<input type="text" onChange={this._changeTitle} value={this.state.title} placeholder="enter title" />
					</label>
					<label className="upload">Link URL/Upload:
						<input type="text" onChange={this._changeURL} value={this.state.url} placeholder="enter URL or upload"/>
						<button className="button blue"><i className="fa fa-upload" /> Upload</button>
						<button className="button blue"><i className="fa fa-dropbox" /> DropBox</button>
					</label>
					<label>Caption:
						<textarea type="text" onChange={this._changeCaption} placeholder="enter short description">{this.state.caption}</textarea>
					</label>
					{button}
				</div>
				<div className="list">
					{list}
				</div>
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

let Import = React.createClass({
	render: function () {
		return (
			<div className="import">
				<h1>Import Content</h1>
				<div className="services">
					<button>
						<i className="fa fa-facebook" />
						Import Facebook Posts
					</button>
					<button>
						<i className="fa fa-google" />
						Import Google Docs
					</button>
					<button>
						<i className="fa fa-rss" />
						Import Blog Posts
					</button>
					<button>
						<i className="fa fa-linkedin" />
						Import LinkedIn Posts
					</button>
				</div>
				<div className="manager">
					<h2 style={{textAlign: "center", paddingTop: '60px', paddingBottom: '40px'}}>Please select a service to import content from</h2>
					<div style={{width: '70%', margin: 'auto'}}>
						<p style={{textAlign: "center"}}>Don't want to rewrite all of your existing content or spend time copying and pasting? No problem!<br /> Just connect with one of your existing accounts by clicking the buttons above and you can import your content to Phourus.</p>
					</div>
				</div>
			</div>
		);
	}
});

let Select = React.createClass({
  render: function () {
    let list =[];
    if (!this.props.data) {
      return (<div>Missing option</div>);
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

module.exports = Editor;
