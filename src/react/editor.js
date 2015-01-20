/** @jsx React.DOM */
"use strict";
var React = require('react');
var posts = require('../objects/posts');
var token = require('../token');
var View401 = require('./401');

var Editor = React.createClass({
	 getDefaultProps: function () {
		 return {
			 post: {},
			 posts: [],
			 mode: "list"
		 }
	 },
	 componentDidMount: function () {
		var self = this;
		posts.on('returnAdd', function (data) {
			 alert('post created');
			 // message('green', 'Post created');
			 posts.account();
		 }); 
		posts.on('returnSingle', function (data) {
			 self.setProps({mode: 'form', post: data});
		 });	 
		 posts.on('returnSave', function (data) {
			 alert('post updated');
			 // message('green', 'Post saved');
			 posts.account();
		 });
		 posts.on('returnAccount', function (data) {
			 self.setProps({posts: data.rows, total: data.total, mode: "list"});
		 });
		 posts.account();		
	 },
	 save: function () {
		 var model = this.getValues();
		 if (this.props.id === null) {
			 posts.add(model);
		 } else {
			 posts.save(this.props.id, model);
		 }
	 },
	 change: function (id, e) {		
		var post = this.props.post;
		post[id] = e.currentTarget.value;
		this.setProps({post: post}, function () {
			console.log(this.props);
		});		
	 },
	 add: function () {
		 this.setProps({mode: 'form', post: {}});
	 },
	 list: function () {
		 this.setProps({mode: 'list'});
	 },
	 update: function (obj) {
		var self = this;
		this.setProps(obj);
	 },
	 getValues: function () {
		var model = {};
		// title, content, privacy, type
		model.title = this.refs.title.getDOMNode().value;
		model.content = this.refs.content.refs.content.getDOMNode().value;
		model.privacy = this.refs.privacy.getDOMNode().value;
		model.type = this.refs.details.refs.type.getDOMNode().value;
		//	
		return model;
	 },
	 render: function () {
		var view;
		if (token.get() === false) {
            return (<View401 />);
		}
		view = <List posts={this.props.posts} update={this.update} add={this.add} />
        if (this.props.mode == 'form') {
            view = <Form ref="form" {...this.props} update={this.update} change={this.change} list={this.list} />
        }
        return (
            <div className="editor">
            	<h1>Content Factory</h1>
            	{view}
            </div>
        );
	 }
});

var List = React.createClass({
	edit: function (e) {
		var id = e.currentTarget.id;
		posts.single(id);
	},
	render: function () {
		var rows;
		var self = this;
		rows = this.props.posts.map(function (item) {
		   return <tr key={item.id}><td>{item.createdAt}</td><td>{item.title}</td><td>{item.type}</td><td><button id={item.id} className="edit button blue" onClick={self.edit}>Edit</button></td></tr>;
		});
		return (
			<div className="list">
				<button className="add button green" onClick={this.props.add}>Add New Post</button>
				<table className="posts">
					<thead>
						<th>Created</th><th>Title</th><th>Type</th><th>Edit</th>
					</thead>
					{rows}
				</table>
			</div>
		);
	}
});

var Form = React.createClass({
	render: function () {
		return (
			<div className="form">
				<input ref="title" type="text" placeholder="title" value={this.props.post.title} onChange={this.props.change.bind(null, 'title')}/>
				<select ref="privacy" value={this.props.post.privacy} onChange={this.props.change.bind(null, 'privacy')}>
					<option value="private">Private</option>
					<option value="phourus">Members only</option>
					<option value="public">Public</option>
				</select>
				<Tags></Tags>
				<div className="format">
					<select>
						<option>Paragraph</option>
						<option>Heading 1</option>
						<option>Heading 2</option>
						<option>Heading 3</option>
						<option>Heading 4</option>
						<option>Heading 5</option>
						<option>Heading 6</option>
						<option>Code</option>
					</select>
					<button className="fa fa-bold"></button>
					<button className="fa fa-italic"></button>
					<button className="fa fa-underline"></button>
					<button className="fa fa-align-left"></button>
					<button className="fa fa-align-center"></button>
					<button className="fa fa-align-justify"></button>
					<button className="fa fa-align-right"></button>
					<button className="fa fa-list-ul"></button>
					<button className="fa fa-list-ol"></button>
				</div>
				<TextEditor ref="rte" content={this.props.post.content} change={this.props.change}></TextEditor>
				<h3>Post Details</h3>
				<Details ref="details" update={this.props.update} post={this.props.post} change={this.props.change}></Details>
				<Links></Links>
				<div className="actions">
					<button className="button green" disabled={this.props.type === "" ? true : false} onClick={this.save}>{this.props.id === null ? "Create New Post" : "Update Post"}</button>
					<button className="button red">Delete Post</button>
					<button className="button blue" onClick={this.props.list}>Back to List</button>
				</div>
			</div>
		);
	}
});

var TextEditor = React.createClass({
	render: function () {
	  return (
		<div>
			<textarea ref="content" placeholder="insert content here" value={this.props.content} onChange={this.props.change.bind(null, 'content')}></textarea>
		</div>
	  );
	 }
});

var Details = React.createClass({
	generate: function (type) {
		var out, element;
		if (!type) {
			return out;
		}
		type = type.toLowerCase();
		element =		   
		<select ref="element" value={this.props.post.element} onChange={this.props.change.bind(null, 'element')}>
			<option>World</option>
			<option>Mind</option>
			<option>Voice</option>
			<option>Self</option>
		</select>
		
		switch (type) {
			case "blog":
			  out = 
			  <div>
				{element}
				<select ref="category" value={this.props.post.category} onChange={this.props.change.bind(null, 'category')}>
					<option>Factual</option>
					<option>Opinion</option>
					<option>Idea</option>
					<option>Humor</option>
					<option>Rant</option>
				</select>
				<label>Positive?</label>
				<input ref="positive" type="checkbox" value={this.props.post.positive} onChange={this.props.change.bind(null, 'positive')} />
			  </div>
			  break;
			case "event":
			   out = 
			   <div>
				{element}
				<select ref="category" value={this.props.post.category} onChange={this.props.change.bind(null, 'category')}>
					<option>Category 1</option>
					<option>Category 2</option>
					<option>Category 3</option>
					<option>Category 4</option>
					<option>Category 5</option>
				</select>
				<label>Date</label>
				<input ref="date" value={this.props.post.date} onChange={this.props.change.bind(null, 'date')} />
				<label>Address</label>
				<input ref="address" value={this.props.post.address} onChange={this.props.change.bind(null, 'address')} />
			  </div>
			  break;   
			case "subject":
			   out = <div>
				<select ref="category" value={this.props.post.category} onChange={this.props.change.bind(null, 'category')}>
					<option>Category 1</option>
					<option>Category 2</option>
					<option>Category 3</option>
					<option>Category 4</option>
					<option>Category 5</option>
				</select>
				<select ref="subcategory" value={this.props.post.subcategory} onChange={this.props.change.bind(null, 'subcategory')}>
					<option>Subcategory 1</option>
					<option>Subcategory 2</option>
					<option>Subcategory 3</option>
					<option>Subcategory 4</option>
					<option>Subcategory 5</option>
				</select>
				<select ref="difficulty" value={this.props.post.difficulty} onChange={this.props.change.bind(null, 'difficulty')}>
					<option>Easy</option>
					<option>Medium</option>
					<option>Hard</option>
				</select>
			  </div>
			  break;
			case "question":
			   out = <div>
				<select ref="category" value={this.props.post.category} onChange={this.props.change.bind(null, 'category')}>
					<option>Category 1</option>
					<option>Category 2</option>
					<option>Category 3</option>
					<option>Category 4</option>
					<option>Category 5</option>
				</select>
				<select ref="subcategory" value={this.props.post.subcategory} onChange={this.props.change.bind(null, 'subcategory')}>
					<option>Subcategory 1</option>
					<option>Subcategory 2</option>
					<option>Subcategory 3</option>
					<option>Subcategory 4</option>
					<option>Subcategory 5</option>
				</select>
				<select ref="difficulty" value={this.props.post.difficulty} onChange={this.props.change.bind(null, 'difficulty')}>
					<option>Easy</option>
					<option>Medium</option>
					<option>Hard</option>
				</select>
			  </div>
			  break;
			case "debate":
			   out = <div>
				<select ref="category" value={this.props.post.category} onChange={this.props.change.bind(null, 'category')}>
					<option>Category 1</option>
					<option>Category 2</option>
					<option>Category 3</option>
					<option>Category 4</option>
					<option>Category 5</option>
				</select>
				<select ref="subcategory" value={this.props.post.subcategory} onChange={this.props.change.bind(null, 'subcategory')}>
					<option>Subcategory 1</option>
					<option>Subcategory 2</option>
					<option>Subcategory 3</option>
					<option>Subcategory 4</option>
					<option>Subcategory 5</option>
				</select>
				<select ref="scope" value={this.props.post.scope} onChange={this.props.change.bind(null, 'scope')}>
					<option>Local</option>
					<option>County</option>
					<option>State</option>
				</select>
				<label>Zip</label>
				<input ref="zip" value={this.props.post.zip} onChange={this.props.change.bind(null, 'zip')} />
			  </div>
			  break;
			case "belief":
			  out = <div>
				<select ref="category" value={this.props.post.category} onChange={this.props.change.bind(null, 'category')}>
					<option>Category 1</option>
					<option>Category 2</option>
					<option>Category 3</option>
					<option>Category 4</option>
					<option>Category 5</option>
				</select>
				<select ref="subcategory" value={this.props.post.subcategory} onChange={this.props.change.bind(null, 'subcategory')}>
					<option>Subcategory 1</option>
					<option>Subcategory 2</option>
					<option>Subcategory 3</option>
					<option>Subcategory 4</option>
					<option>Subcategory 5</option>
				</select>
			  </div>
			  break;
			case "quote":
			  out = <div>
			  <label>Source/Author</label>
			  <input ref="author" value={this.props.post.author} onChange={this.props.change.bind(null, 'author')} /> 
			  </div>
			  break;	  
		}
		return out;
	},
	radio: function (e) {
    	var radios = this.refs.radios.getDOMNode();
    	var post = this.props.post;
    	post.type = radios.type.value;
    	this.props.update({post: post});
	},
	render: function () {
	  var details = this.generate(this.props.post.type);
	  var type = this.props.post.type;
	  return (	
		<div>
			<div>Please select a type before saving</div>
			<form ref="radios" onChange={this.radio}>
    			<input type="radio" name="type" value="blog" checked={(type == 'blog') ? true : false} />
    			<strong>Blog:</strong> General Post type, start here if you dont know what to choose<br />
    			<input type="radio" name="type" value="event" checked={(type == 'event') ? true : false} />
    			<strong>Event:</strong> Virtual or real-world event<br />
    			<input type="radio" name="type" value="subject" checked={(type == 'subject') ? true : false} />
    			<strong>Subject:</strong> Share your knowledge or expertise with the community on a variety of Subjects<br />
    			<input type="radio" name="type" value="question" checked={(type == 'question') ? true : false} />
    			<strong>Question:</strong> Need help or clarification on a topic? Ask it with a Question<br />
    			<input type="radio" name="type" value="debate" checked={(type == 'debate') ? true : false} />
    			<strong>Debate:</strong> Get the discussion started with a local, county, state or national-level Debate<br />
    			<input type="radio" name="type" value="quote" checked={(type == 'quote') ? true : false} />
    			<strong>Quote:</strong> Has someone else already described how you feel? Post their Quote here<br />
    			<input type="radio" name="type" value="belief" checked={(type == 'belief') ? true : false} />
    			<strong>Belief:</strong> Tell us more about your Belief on something dear to you<br />
			</form>
			{details}
		</div>
	  );
	 }	   
});
// 			<select id="type" onChange={this.change} value={this.props.post.type}>
var Tags = React.createClass({
   render: function () {
	   return (
		 <div>
			<h3>Tags</h3>
		 </div>
	   );
   } 
});

var Links = React.createClass({
   render: function () {
	   return (
		 <div>
			<h3>Links</h3>
		 </div>
	   );
   } 
});

module.exports = Editor;