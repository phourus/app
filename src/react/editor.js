/** @jsx React.DOM */
"use strict";
var React = require('react');
var posts = require('../objects/posts');
var tags = require('../objects/tags');
var links = require('../objects/links');
var token = require('../token');
var moment = require('moment');
//var RTE = require('rte');

var View401 = require('./401');

var Editor = React.createClass({
	 getInitialState: function () {
    	 return {
        	 mode: "list"
    	 }
	 },
	 componentDidMount: function () {
		var self = this;
		posts.on('returnAdd', function (data) {
			 alert('post created');
			 // message('green', 'Post created');
			 //posts.account();
			 self.reset();
		 }); 
		posts.on('returnSingle', function (data) {
			 //self.setProps({post: data});
			 //self.setState({mode: 'form'});
		 });	 
		 posts.on('returnSave', function (data) {
			 alert('post updated');
			 // message('green', 'Post saved');
			 //posts.account();
			 self.reset();
		 });
		 posts.on('returnAccount', function (data) {
			 self.props.update('editor', {posts: data.rows, total: data.total});
		 });
		 posts.account();		
	 },
	 save: function () {
		 var model = this.getValues();
		 console.log(model);
		 if (this.props.post.id === null) {
			 posts.add(model);
		 } else {
			 posts.save(this.props.post.id, model);
		 }
	 },
	 list: function () {
    	//this.setState({mode: 'list'}); 
	 },
	 reset: function () {
    	 this.props.update('editor', {post: {}, link: {url: "", caption: ""}});
	 },
	 change: function (id, e) {		
		var post = this.props.post;
		post[id] = e.currentTarget.value;
		this.props.update('editor', {post: post});		
	 },
	 add: function () {
		 //this.setState({mode: 'form'});
		 this.props.update('editor', {post: {}, link: {url: "", caption: ""}});
	 },
	 getValues: function () {
		var model = {};
		// title, content, privacy, type
		var form = this.refs.form.refs;
		model.title = form.title.getDOMNode().value;
		model.content = form.rte.refs.content.getDOMNode().value;
		model.privacy = form.privacy.getDOMNode().value;
		console.log(form.details.refs.type);
		model.type = form.details.refs.type.getDOMNode().value;
		//	
		return model;
	 },
	 render: function () {
		var view;
		console.log('render');
		console.log(this.props);
		if (token.get() === false) {
            return (<View401 />);
		}
		view = '';
		view = <List ref="list" posts={this.props.posts} update={this.update} add={this.add} />
        if (this.state.mode == 'form') {
            view = <Fields ref="form" {...this.props} update={this.update} change={this.change} list={this.list} save={this.save} />
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
		   return <tr key={item.id}><td>{moment(item.createdAt).fromNow()}</td><td><a href={'post/' + item.id}>{item.title}</a></td><td>{item.type}</td><td><button id={item.id} className="edit button blue" onClick={self.edit}>Edit</button></td></tr>;
		});
		if (!rows.length) {
    		rows = <tr><td colSpan="4">
    		    <h3>You do not have any posts yet. Click "Add New Post" above to create your first post!</h3>
    		</td></tr>
		}
		return (
			<div className="list">
				<button className="add button green" onClick={this.props.add}>Add New Post</button>
				<table ref="posts" className="posts">
					<thead>
						<th>Created</th><th>Title</th><th>Type</th><th>Edit</th>
					</thead>
					{rows}
				</table>
			</div>
		);
	}
});

/*
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
*/
var Fields = React.createClass({
	render: function () {		
        var remove, privacy;
        if (this.props.post.id) {
            remove = <button ref="remove" className="button red">Delete Post</button>
        }
        privacy = this.props.post.privacy || 'private';
		return (
			<div className="form">
			    <label>Title:</label>
				<input ref="title" type="text" placeholder="title" value={this.props.post.title} onChange={this.props.change.bind(null, 'title')}/>
				<br />
				<label>Privacy:</label>
				<select ref="privacy" value={privacy} onChange={this.props.change.bind(null, 'privacy')}>
					<option value="private">Private</option>
					<option value="phourus">Members only</option>
					<option value="public">Public</option>
				</select>
				<Tags ref="tags" post={this.props.post}update={this.props.update}></Tags>
				<TextEditor ref="rte" post={this.props.post} change={this.props.change}></TextEditor>
				<h3>Post Details</h3>
				<Details ref="details" update={this.props.update} post={this.props.post} change={this.props.change}></Details>
				<Links ref="links" post={this.props.post} link={this.props.link} update={this.props.update}></Links>
				<div ref="actions" className="actions">
                    <button ref="save" className="button green" onClick={this.props.save}>
                        {this.props.post.id ? "Update Post" : "Create New Post"}
                    </button>
                    {remove}
                    <button ref="back" className="button blue" onClick={this.props.list}>Back to List</button>
    			</div>
			</div>
		);
	}
});

var TextEditor = React.createClass({
	componentDidMount: function () {
        //var rte = new RTE();
        //rte.render(); 
	},
	render: function () {
      var content = this.props.post.content || "";
	  return (
		<div>
			<textarea ref="content" placeholder="insert content here" value={content} onChange={this.props.change.bind(null, 'content')}></textarea>
		</div>
	  );
	 }
});

var Details = React.createClass({
	select: function (e) {
	    var value = e.currentTarget.value;
	    var post = this.props.post;
    	post.type = value;
    	this.props.update({post: post});
	},
	render: function () {
	  var type = this.props.post.type;
	  if (!type) {
    	  //type = 'blog';
	  }
	  //console.log(type);
	  return (	
		<div>
			<div>Please select a type before saving</div>
			<form ref="type">
    			<input type="radio" name="type" value="blog" onChange={this.select} checked={(type == 'blog') ? true : false} />
    			<strong>Blog:</strong> General Post type, start here if you dont know what to choose<br />
    			<input type="radio" name="type" value="event" onChange={this.select} checked={(type == 'event') ? true : false} />
    			<strong>Event:</strong> Virtual or real-world event<br />
    			<input type="radio" name="type" value="subject" onChange={this.select} checked={(type == 'subject') ? true : false} />
    			<strong>Subject:</strong> Share your knowledge or expertise with the community on a variety of Subjects<br />
    			<input type="radio" name="type" value="question" onChange={this.select} checked={(type == 'question') ? true : false} />
    			<strong>Question:</strong> Need help or clarification on a topic? Ask it with a Question<br />
    			<input type="radio" name="type" value="debate" onChange={this.select} checked={(type == 'debate') ? true : false} />
    			<strong>Debate:</strong> Get the discussion started with a local, county, state or national-level Debate<br />
    			<input type="radio" name="type" value="quote" onChange={this.select} checked={(type == 'quote') ? true : false} />
    			<strong>Quote:</strong> Has someone else already described how you feel? Post their Quote here<br />
    			<input type="radio" name="type" value="belief" onChange={this.select} checked={(type == 'belief') ? true : false} />
    			<strong>Belief:</strong> Tell us more about your Belief on something dear to you<br />
			</form>
			<Meta ref="meta" post={this.props.post} change={this.props.change} />
		</div>
	  );
	 }	   
});

var Tags = React.createClass({
   add: function () {
        var model = {};
        model.tag = this.refs.tag.getDOMNode().value;
        
        if (model.tag !== null && this.props.post.id) {
            model.post_id = this.props.post.id;
            tags.add(model);
            return;
        } 
        console.error('post must have an id first');
   },
   remove: function (e) {
       var id = e.currentTarget.id;
       tags.remove(id);
   },
   componentDidMount: function () {
        var self = this;
        tags.on('returnCollection', function (data) {
            var post = self.props.post;
            post.tags = data;
            self.props.update({post: post});
        });
        tags.on('returnAdd', function (data) {
            var post = self.props.post;
            post.tags.push(data);
            self.props.update({post: post});
        });
        tags.on('returnRemove', function (data) {
            tags.collection({post_id: self.props.post.id});
        });
        tags.collection({post_id: this.props.post.id});
   },
   render: function () {
        var tags, list, self;
        self = this;
        tags = this.props.post.tags || [];

	   list = tags.map(function (item) {
    	   return <li key={item.id}>{item.tag} <button id={item.id} className="button red tiny" onClick={self.remove}>X</button></li>
	   });
	   return (
		 <div>
			<h3>Tags</h3>
			<label>Tag: </label>
			<input ref="tag" type="text" />
			<button ref="add" onClick={this.add} className="button green small">Add Tag</button>
			<ul ref="list">{list}</ul>
		 </div>
	   );
   } 
});

var Links = React.createClass({
   add: function () {
        if (this.props.post.id) {
            var model = {};
            model.url = this.props.link.url;
            model.caption = this.props.link.caption;
            model.post_id = this.props.post.id;
            links.add(model);
            return;
        }
        console.error('post must have an id first');
   },
   remove: function (e) {
       var id = e.currentTarget.id;
       links.remove(id);
   },
   edit: function (model) {;
        this.props.update({link: model});
   },
   save: function () {
       var link = {};
       link.url = this.props.link.url;
       link.caption = this.props.link.caption;
       links.save(this.props.link.id,  link);
   },
   change: function (e) {
       var url = this.refs.url.getDOMNode().value;
       var caption = this.refs.caption.getDOMNode().value;
       
       var link = this.props.link;
       link.url = url;
       link.caption = caption;
       this.props.update({link: link});
   },
   componentDidMount: function () {
        var self = this;
        links.on('returnCollection', function (data) {
            var post = self.props.post;
            post.links = data;
            self.props.update({post: post});
        });
        links.on('returnAdd', function (data) {
            var post = self.props.post;
            post.links.push(data);
            self.props.update({post: post});
        });
        links.on('returnRemove', function (data) {
            links.collection({post_id: self.props.post.id});
        });
        links.collection({post_id: this.props.post.id});
   },
   render: function () {
        var links, list, self;
        self = this;
        links = this.props.post.links || [];

	   list = links.map(function (item) {
    	   return (
    	        <li key={item.id}>
    	            <button id={item.id} className="button red tiny remove" onClick={self.remove}>X</button> 
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
			<button ref="add" onClick={this.add} className="button green small add">Add Link</button>
			<ul ref="list">{list}</ul>
		 </div>
	   );
   } 
});

var Meta = React.createClass({
	render: function () {
        var element, type;
    	if (!this.props.post.type) {
    		return <div>Please select a type</div>;
    	}
    	type = this.props.post.type.toLowerCase();
    	/** SHARED FIELDS **/
    	element =		   
    	<select ref="element" value={this.props.post.element} onChange={this.props.change.bind(null, 'element')}>
    		<option>World</option>
    		<option>Mind</option>
    		<option>Voice</option>
    		<option>Self</option>
    	</select>
    	
    	switch (type) {
    		case "blog":
    		  return ( 
        		  <div>
        		    <label>Element:</label>
        			{element}
        			<br />
        			<label>Category:</label>
        			<select ref="category" value={this.props.post.category} onChange={this.props.change.bind(null, 'category')}>
        				<option>Factual</option>
        				<option>Opinion</option>
        				<option>Idea</option>
        				<option>Humor</option>
        				<option>Rant</option>
        			</select>
        			<br />
        			<label>Positive?</label>
        			<input ref="positive" type="checkbox" value={this.props.post.positive} onChange={this.props.change.bind(null, 'positive')} />
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
        			<select ref="category" value={this.props.post.category} onChange={this.props.change.bind(null, 'category')}>
        				<option>Category 1</option>
        				<option>Category 2</option>
        				<option>Category 3</option>
        				<option>Category 4</option>
        				<option>Category 5</option>
        			</select>
        			<br />
        			<label>Date</label>
        			<input ref="date" value={this.props.post.date} onChange={this.props.change.bind(null, 'date')} />
        			<br />
        			<label>Address</label>
        			<input ref="address" value={this.props.post.address} onChange={this.props.change.bind(null, 'address')} />
        			<br />
        		  </div>
    		  )
    		  break;   
    		case "subject":
    		   return (
        		   <div>
        		    <label>Category:</label>
        			<select ref="category" value={this.props.post.category} onChange={this.props.change.bind(null, 'category')}>
        				<option>Category 1</option>
        				<option>Category 2</option>
        				<option>Category 3</option>
        				<option>Category 4</option>
        				<option>Category 5</option>
        			</select>
        			<br />
        			<label>Subcategory:</label>
        			<select ref="subcategory" value={this.props.post.subcategory} onChange={this.props.change.bind(null, 'subcategory')}>
        				<option>Subcategory 1</option>
        				<option>Subcategory 2</option>
        				<option>Subcategory 3</option>
        				<option>Subcategory 4</option>
        				<option>Subcategory 5</option>
        			</select>
        			<br />
        			<label>Difficulty:</label>
        			<select ref="difficulty" value={this.props.post.difficulty} onChange={this.props.change.bind(null, 'difficulty')}>
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
        			<select ref="category" value={this.props.post.category} onChange={this.props.change.bind(null, 'category')}>
        				<option>Category 1</option>
        				<option>Category 2</option>
        				<option>Category 3</option>
        				<option>Category 4</option>
        				<option>Category 5</option>
        			</select>
        			<br />
        			<label>Subcategory:</label>
        			<select ref="subcategory" value={this.props.post.subcategory} onChange={this.props.change.bind(null, 'subcategory')}>
        				<option>Subcategory 1</option>
        				<option>Subcategory 2</option>
        				<option>Subcategory 3</option>
        				<option>Subcategory 4</option>
        				<option>Subcategory 5</option>
        			</select>
        			<br />
        			<label>Difficulty:</label>
        			<select ref="difficulty" value={this.props.post.difficulty} onChange={this.props.change.bind(null, 'difficulty')}>
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
        			<select ref="category" value={this.props.post.category} onChange={this.props.change.bind(null, 'category')}>
        				<option>Category 1</option>
        				<option>Category 2</option>
        				<option>Category 3</option>
        				<option>Category 4</option>
        				<option>Category 5</option>
        			</select>
        			<br />
        			<label>Subcategory:</label>
        			<select ref="subcategory" value={this.props.post.subcategory} onChange={this.props.change.bind(null, 'subcategory')}>
        				<option>Subcategory 1</option>
        				<option>Subcategory 2</option>
        				<option>Subcategory 3</option>
        				<option>Subcategory 4</option>
        				<option>Subcategory 5</option>
        			</select>
        			<br />
        			<label>Scope:</label>
        			<select ref="scope" value={this.props.post.scope} onChange={this.props.change.bind(null, 'scope')}>
        				<option>Local</option>
        				<option>County</option>
        				<option>State</option>
        			</select>
        			<br />
        			<label>Zip</label>
        			<input ref="zip" value={this.props.post.zip} onChange={this.props.change.bind(null, 'zip')} />
        			<br />
        		  </div>
    		  );
    		  break;
    		case "belief":
    		  return (
        		  <div>
        		    <label>Category:</label>
        			<select ref="category" value={this.props.post.category} onChange={this.props.change.bind(null, 'category')}>
        				<option>Category 1</option>
        				<option>Category 2</option>
        				<option>Category 3</option>
        				<option>Category 4</option>
        				<option>Category 5</option>
        			</select>
        			<br />
        			<label>Subcategory:</label>
        			<select ref="subcategory" value={this.props.post.subcategory} onChange={this.props.change.bind(null, 'subcategory')}>
        				<option>Subcategory 1</option>
        				<option>Subcategory 2</option>
        				<option>Subcategory 3</option>
        				<option>Subcategory 4</option>
        				<option>Subcategory 5</option>
        			</select>
        			<br />
        		  </div>
    		  );
    		  break;
    		case "quote":
    		  return ( 
        		  <div>
            		  <label>Source/Author</label>
            		  <input ref="author" value={this.props.post.author} onChange={this.props.change.bind(null, 'author')} />
            		  <br /> 
        		  </div>
    		  );
    		  break;	  
    	}
	}
});


module.exports = Editor;