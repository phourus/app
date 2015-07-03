let React = require('react');
let Router = require('react-router');
let { RouteHandler, Link } = Router;
let moment = require('moment');
let View401 = require('./401');
let Actions = require('../actions/editor');
let Store = require('../stores/editor');
let token = require('../token');
let tax = require('../taxonomy');
let RTE = require('rte');

let Editor = React.createClass({
	mixins: [Router.State],
	getInitialState: function () {
		return {
			postID: null,
			post: {}
		}
	},
	componentDidMount: function () {
		let self = this;
		this.unsubscribe = Store.listen(function (data) {
			console.log(data);
			self.setState(data);
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
		if (token.get() === false) {
			return (<View401 />);
		}
		let remove = false;
		if (this.props.postID) {
       remove = <button ref="remove" className="button red">Delete Post <i className="fa fa-trash" /></button>
    }
    let privacy = this.state.post.privacy || 'private';

		return (
			<div className="editor">
				<h1>Content Factory <Link to="myPosts" className="edit">Edit my posts</Link></h1>
				<div className="form">
				  <label>Title:</label>
					<input ref="title" type="text" placeholder="title" value={this.state.post.title} onChange={this._title} />
					<br />
					<label>Privacy:</label>
					<select ref="privacy" value={privacy} onChange={this._privacy}>
						<option value="private">Private</option>
						<option value="phourus">Members only</option>
						<option value="public">Public</option>
					</select>
					<TextEditor ref="rte" post={this.state.post}></TextEditor>
					<Details ref="details" post={this.state.post}></Details>
					<Tags ref="tags" {...this.state}></Tags>
					<div ref="actions" className="actions">
	          <button ref="save" className="button green" onClick={this._save}>
	            {this.state.post.id ? "Update Post" : "Create New Post"}
							<i className="fa fa-pencil" />
	          </button>
	          {remove}
	          <button ref="back" className="button blue" onClick={this._list}>
							Back to List
							<i className="fa fa-list" />
						</button>
	    		</div>
				</div>
			</div>
		);
	},
	_save: function () {
		if (this.props.post.id === null) {
			Actions.add(this.state.post);
		} else {
			Actions.save(this.state.post.id, this.state.post);
		}
	},
	_reset: function () {
		Actions.reset();
	},
	_privacy: function (e) {
		let value = e.currentTarget.value;
		Actions.change('privacy', value);
	},
	_title: function (e) {
		let value = e.currentTarget.value;
		Actions.change('title', value);
	}
});

let TextEditor = React.createClass({
	componentDidMount: function () {
		//let rte = new RTE();
		//rte.render();
	},
	render: function () {
		let content = this.props.post.content || "";
		return (
			<div>
				<textarea ref="content" placeholder="insert content here" value={content} onChange={this._content}></textarea>
			</div>
		);
	},
	_content: function (e) {
		let value = e.currentTarget.value;
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
	  return (
			<div className="details">
				<div className="types">
						<h3>Please select a type before saving</h3>
	    			<div className={classes.blog} onClick={this._blog}>
		    			<strong>Blog</strong>
							<p>General Post type, start here if you dont know what to choose</p>
						</div>
	    			<div className={classes.event} onClick={this._events}>
		    			<strong>Event</strong>
							<p>Virtual or real-world event</p>
						</div>
	    			<div className={classes.subject} onClick={this._subjects}>
		    			<strong>Subject</strong>
							<p>Share your knowledge or expertise with the community on a letiety of Subjects</p>
						</div>
	    			<div className={classes.question} onClick={this._questions}>
		    			<strong>Question</strong>
							<p>Need help or clarification on a topic? Ask it with a Question</p>
						</div>
	    			<div className={classes.debate} onClick={this._debates}>
		    			<strong>Debate</strong>
							<p>Get the discussion started with a local, county, state or national-level Debate</p>
						</div>
						<div className={classes.poll} onClick={this._polls}>
							<strong>Poll</strong>
							<p>Get the discussion started with a local, county, state or national-level Debate</p>
						</div>
	    			<div className={classes.quote} onClick={this._quotes}>
		    			<strong>Quote</strong>
							<p>Has someone else already described how you feel? Post their Quote here</p>
						</div>
	    			<div className={classes.belief} onClick={this._beliefs}>
		    			<strong>Belief</strong>
							<p>Tell us more about your Belief on something dear to you</p>
						</div>
				</div>
				<Meta ref="meta" post={this.props.post} change={this.props.change} />
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
	_quotes: function () { Actions.change('type', 'quote'); }
});

let Tags = React.createClass({
	getDefaultProps: function () {
		return {
			post: {
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
				<h3>Tags</h3>
				<label>Tag: </label>
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

		if (model.tag !== null && this.state.post.id) {
			model.post_id = this.state.post.id;
			Actions.tags.add(model);
			return;
		}
		console.error('post must have an id first');
	},
	_remove: function (e) {
		let id = e.currentTarget.id;
		Actions.tags.remove(id);
	},
});

let Links = React.createClass({
	getInitialState: function () {
		return {
			postID: null,
			links: [],
			link: {
				url: "",
				caption: ""
			}
		};
	},
	componentDidMount: function () {
		let self = this;
		Actions.Links.collection({post_id: this.props.postID});
		Store.listen(function (data) {
			self.setState(data);
		});
	},
	render: function () {
		let self = this;
		let links = this.state.links;
		let list = links.map(function (item) {
			return (
				<li key={item.id}>
				<button id={item.id} className="button red tiny remove" onClick={self._remove}>X</button>
				{item.url}
				<button className="button blue small edit" onClick={self.edit.bind(null, item)}>Edit</button>
				</li>
			);
		});
		return (
			<div>
				<h3>Links</h3>
				<label>Link address:</label>
				<input ref="url" type="text" onChange={this.change} />
				<br />
				<label>Caption:</label>
				<input ref="caption" type="text" onChange={this.change} />
				<button ref="add" onClick={this._add} className="button green small add">Add Link</button>
				<ul ref="list">{list}</ul>
			</div>
		);
	},
	add: function () {
		if (this.state.post.id) {
			let model = {};
			model.url = this.state.link.url;
			model.caption = this.state.link.caption;
			model.post_id = this.state.post.id;
			Actions.links.add(model);
			return;
		}
		console.error('post must have an id first');
	},
	remove: function (e) {
		let id = e.currentTarget.id;
		Actions.links.remove(id);
	},
	edit: function (id) {
		Actions.links.edit(id)
	},
	save: function () {
		let link = {};
		link.url = this.state.link.url;
		link.caption = this.state.link.caption;
		Actions.links.save(this.state.link.id,  link);
	},
	change: function (e) {
		let url = this.refs.url.getDOMNode().value;
		let caption = this.refs.caption.getDOMNode().value;
		let link = this.state.link;
		link.url = url;
		link.caption = caption;
		this.setState({link: link});
	},
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

let Meta = React.createClass({
	render: function () {
      let element, type;
    	if (!this.props.post.type) {
    		return <div>Please select a type</div>;
    	}
    	type = this.props.post.type.toLowerCase();
    	/** SHARED FIELDS **/
    	element =
    	<select ref="element" value={this.props.post.element} onChange={this._element}>
    		<option value="world">World</option>
    		<option value="mind">Mind</option>
    		<option value="voice">Voice</option>
    		<option value="self">Self</option>
    	</select>


    	switch (type) {
    		case "blog":
    		  return (
        		  <div>
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
    		  );
    		  break;
    		case "event":
    		   return (
        		   <div>
        		    <label>Element:</label>
        			{element}
        			<br />
        			<label>Category:</label>
        			<Select ref="category" value={this.props.post.category} onChange={this._category} data={tax.events[this.props.post.element]}>
        			</Select>
        			<br />
        			<label>Date</label>
        			<input ref="date" value={this.props.post.date} onChange={this._date} />
        			<br />
        			<label>Address</label>
        			<input ref="address" value={this.props.post.address} onChange={this._address} />
        			<br />
        		  </div>
    		  )
    		  break;
    		case "subject":
    		   return (
        		   <div>
        		    <label>Category:</label>
        			<Select ref="category" value={this.props.post.category} onChange={this._category} data={tax.subjects.category}>
        			</Select>
        			<br />
        			<label>Subcategory:</label>
        			<Select ref="subcategory" value={this.props.post.subcategory} onChange={this._subcategory} data={tax.subjects[this.props.post.category]}>
        			</Select>
        			<br />
        			<label>Difficulty:</label>
        			<select ref="difficulty" value={this.props.post.difficulty} onChange={this._difficulty}>
        				<option>Easy</option>
        				<option>Medium</option>
        				<option>Hard</option>
        			</select>
        			<br />
        		  </div>
    		  )
    		  break;
    		case "question":
    		    return (
        		    <div>
        		    <label>Category:</label>
        			<Select ref="category" value={this.props.post.subcategory} onChange={this._category} data={tax.subjects.category}>
        			</Select>
        			<br />
        			<label>Subcategory:</label>
        			<Select ref="subcategory" value={this.props.post.subcategory} onChange={this._subcategory} data={tax.subjects[this.props.post.category]}>
        			</Select>
        			<br />
        			<label>Difficulty:</label>
        			<select ref="difficulty" value={this.props.post.difficulty} onChange={this._difficulty}>
        				<option>Easy</option>
        				<option>Medium</option>
        				<option>Hard</option>
        			</select>
        			<br />
        		  </div>
    		  );
    		  break;
    		case "debate":
    		   return (
        		   <div>
        		    <label>Category:</label>
        			<Select ref="category" value={this.props.post.category} onChange={this._category} data={tax.debates.category}>
        			</Select>
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
    		  );
    		  break;
    		case "belief":
    		  return (
        		  <div>
        		    <label>Category:</label>
        			<Select ref="category" value={this.props.post.category} onChange={this._category} data={tax.beliefs.category}>
        			</Select>
        			<br />
        		  </div>
    		  );
    		  break;
    		case "quote":
    		  return (
        		  <div>
            		  <label>Source/Author</label>
            		  <input ref="author" value={this.props.post.author} onChange={this._author} />
            		  <br />
        		  </div>
    		  );
    		  break;
    	}
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

module.exports = Editor;
