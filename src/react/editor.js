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
		let self = this;
		this.unsubscribe = Store.listen((data) => {
			if (data.add === true) {
				this.transitionTo("edit", {id: data.post.id});
			}
			self.setState({post: data.post});
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
			view = (<div>
				<h1>Import Content</h1>
			</div>);
		}

		if (this.state.post.privacy === 'org') {
			let organizations = [{id: 1, name: "Phourus Inc."}, {id: 2, name: "Tyco Intl."}, {id: 3, name: "Intuit Inc."}, {id: 4, name: "Enco Industries Inc."}];
			orgs = (
				<span>
					<label>Organization:</label>
					<select value={this.state.post.orgId} onChange={this._orgId}>
						{organizations.map((item) => {
							return (<option value={item.id}>{item.name}</option>);
						})}
					</select>
				</span>
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
		return (
			<div className="editor">

				<div className="heading">
				  <div>
						<Link to="myPosts" className="small">Edit my posts</Link> <span style={{fontSize: '0.5em'}}>|</span> <a href="javascript:void(0)" className="small" onClick={this._import}>Import content</a><br />
						<label>Title:</label>
						<input ref="title" type="text" placeholder="title" value={this.state.post.title} onChange={this._title} />
						<br />
						<label>Privacy:</label>
						<select ref="privacy" value={privacy} onChange={this._privacy}>
							<option value="private">Private</option>
							<option value="org">Organization Members only</option>
							<option value="phourus">Phourus Users only</option>
							<option value="public">Everyone</option>
						</select>
						<br />
						{orgs}
					</div>
					<div>
						<button onClick={this._save} className="button green">Save</button>
					</div>
					<div>
						<button className="fa fa-quote-right" onClick={this._content}><br />Content</button>
						<button className="fa fa-tags" onClick={this._tags}><br />Tags</button>
						<button className="fa fa-photo" onClick={this._links}><br />Links</button>
						<button className="fa fa-cloud" onClick={this._share}><br />Share</button>
					</div>
				</div>
				{view}
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
			Actions.save(this.state.post.id, this.state.post);
		} else {
			Actions.add(this.state.post);
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
									<label>Element:</label>
								{element}
								<br />
								<label>Category:</label>
								<Select ref="category" value={this.props.post.category} onChange={this._category} data={tax.blogs[this.props.post.element]}>
								</Select>
								<label>Subcategory:</label>
								<Select ref="subcategory" value={this.props.post.subcategory} onChange={this._subcategory} data={tax.blogs.subcategory}>
								</Select>
								<br />
								<label>Positive?</label>
								<input ref="positive" type="checkbox" value={this.props.post.positive} onChange={this._positive} />
								<br />
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
	_subjects: function () { Actions.change('type', 'subject'); },
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
	render: function () {
		let tags = [];
		if (this.props.post && this.props.post.tags) {
			tags = this.props.post.tags;
		}
		return (
			<div>
				<input ref="tag" type="text" />
				<button ref="add" onClick={this._add} className="button green small">Add Tag</button>
				<div ref="list">
					{tags.map((item) => {
						return <span key={item.id} className="tag">{item.tag} <button id={item.id} className="remove" onClick={this._remove}>x</button></span>
					})}
				</div>
			</div>
		);
	},
	_add: function () {
		let model = {};
		model.tag = this.refs.tag.getDOMNode().value;

		if (model.tag !== null && this.props.post.id) {
			model.postId = this.props.post.id;
			Actions.Tags.add(model);
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
			caption: ""
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
		let links = this.props.post.links;
		let button = <button onClick={this._add} className="button green small add">Add Link</button>;
		let list = links.map((item, index) => {
			return (
				<li key={item.id}>
					<button id={item.id} className="button red tiny remove" onClick={this._remove}>X</button>
					{item.url}
					<button id={index} className="button blue small edit" onClick={this._edit}>Edit</button>
				</li>
			);
		});
		if (this.state.mode === 'edit') {
			button = <button onClick={this._save} className="button green small edit">Save Changes</button>;
		}
		return (
			<div>
				<h1>Links</h1>
				<label>Link address:</label>
				<input type="text" onChange={this._changeURL} value={this.state.url} />
				<br />
				<label>Caption:</label>
				<input type="text" onChange={this._changeCaption} value={this.state.caption} />
				{button}
				<ul ref="list">{list}</ul>
			</div>
		);
	},
	_add: function () {
		if (this.props.post.id) {
			let model = {};
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
		link.url = this.state.url;
		link.caption = this.state.caption;
		Actions.Links.save(this.state.id,  link);
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
