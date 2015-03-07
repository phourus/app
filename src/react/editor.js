"use strict";
let React = require('react');
let Router = require('react-router');
let RouteHandler = Router.RouteHandler;

let posts = require('../sockets/posts');
let tags = require('../sockets/tags');
let links = require('../sockets/links');
let token = require('../token');
let moment = require('moment');
let tax = require('../taxonomy');
//let RTE = require('rte');
let msg = require('../actions/alerts').add;
let Mutant = require('react-mutant');
let View401 = require('./401');

let Editor = React.createClass({
	 mixins: [Router.State],
	 getInitialState: function () {
    	return new Mutant({
            post: {},
            posts: [],
            link: {
                url: "",
                caption: ""
            }
        });
	 },
	 componentDidMount: function () {
		let id;
		let self = this;
		let params;
		this.state.mutant.on('update', function (mutant) {
				self.setState(mutant);
		});
        posts.on('single', function (code, data) {
            if (code != 200) {
                msg('yellow', 'Post could not be loaded', code);
                return;
             }
			 self.state.mutant.set({post: data});
		 });
		posts.on('add', function (code, data) {
			 if (code != 201) {
			    msg('red', 'Post could not be created', code);
                return;
             }
             msg('green', 'Post created successfully', code);
			 self.reset();
		 });
		 posts.on('save', function (code, data) {
			 if (code != 204) {
			    msg('red', 'Post could not be saved', code);
                return;
             }
			 self.reset();
		 });
		 posts.on('account', function (code, data) {
             if (code != 200) {
                msg('yellow', 'Posts could not be loaded', code);
                return;
             }
			 self.state.mutant.set({posts: data.rows, total: data.total});
		 });

     params = this.getParams()
		 if (params.id) {
			posts.single(id);
		 }
    	//posts.account();
	 },
	 componentWillUnmount: function () {
    	 posts.off('single');
    	 posts.off('add');
    	 posts.off('save');
    	 posts.off('account');
	 },
	 save: function () {
		 let model = this.getValues();
		 if (this.state.post.id === null) {
			 posts.add(model);
		 } else {
			 posts.save(this.state.post.id, model);
		 }
	 },
	 list: function () {
    	this.navigate('/editor');
	 },
	 reset: function () {
    	 this.state.mutant.set({post: {}, link: {url: "", caption: ""}});
	 },
	 change: function (id, e) {
		let post = this.state.post;
		post[id] = e.currentTarget.value;
		this.state.mutant.set({post: post});
	 },
	 add: function () {
		 //this.setState({mode: 'form'});
		 this.state.mutant.set({post: {}, link: {url: "", caption: ""}});
		 this.navigate('/editor/add');
	 },
	 getValues: function () {
		let model = {};
		// title, content, privacy, type
		let form = this.refs.form.refs;
		model.title = form.title.getDOMNode().value;
		model.content = form.rte.refs.content.getDOMNode().value;
		model.privacy = form.privacy.getDOMNode().value;
		model.type = form.details.refs.type.getDOMNode().value;
		//
		return model;
	 },
	 render: function () {
		if (token.get() === false) {
            return (<View401 />);
		}
        //<Fields ref="form" {...this.props} change={this.change} list={this.list} save={this.save} />
        //<List ref="list" posts={this.props.posts} add={this.add} />
        return (
            <div className="editor">
            	<h1>Content Factory</h1>
            	<RouteHandler {...this.state} change={this.change} />
            </div>
        );
	 }
});

Editor.List = React.createClass({
	add: function () {
        this.navigate("/editor/add");
	},
	edit: function (e) {
		let id = e.currentTarget.id;
		this.navigate("/editor/" + id);
	},
	render: function () {
		let rows;
		let self = this;
		rows = this.props.posts.map(function (item) {
		   return <tr key={item.id}>
    		    <td>{moment(item.createdAt).fromNow()}</td>
    		    <td><Link href={`post/${item.id}`}>{item.title}</Link></td>
    		    <td>{item.type}</td>
    		    <td><button id={item.id} className="edit button blue" onClick={self.edit}>Edit</button></td>
		    </tr>;
		});
		if (!rows.length) {
    		rows = <tr><td colSpan="4">
    		    <h3>You do not have any posts yet. Click "Add New Post" above to create your first post!</h3>
    		</td></tr>
		}
		return (
			<div className="list">
				<button className="add button green" onClick={this.add}>Add New Post</button>
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
Editor.Fields = React.createClass({
	render: function () {
        let remove, privacy;
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
				<Tags ref="tags" {...this.props}></Tags>
				<TextEditor ref="rte" post={this.props.post} change={this.props.change}></TextEditor>
				<h3>Post Details</h3>
				<Details ref="details" post={this.props.post} change={this.props.change}></Details>
				<Links ref="links" {...this.props}></Links>
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

let TextEditor = React.createClass({
	componentDidMount: function () {
        //let rte = new RTE();
        //rte.render();
	},
	render: function () {
      let content = this.props.post.content || "";
	  return (
		<div>
			<textarea ref="content" placeholder="insert content here" value={content} onChange={this.props.change.bind(null, 'content')}></textarea>
		</div>
	  );
	 }
});

let Details = React.createClass({
	select: function (e) {
	    let value = e.currentTarget.value;
	    let post = this.props.post;
    	post.type = value;
    	this.props.mutant.set({post: post});
	},
	render: function () {
	  let type = this.props.post.type;
	  if (!type) {
    	  //type = 'blog';
	  }
	  return (
		<div>
			<div>Please select a type before saving</div>
			<form ref="type">
    			<input type="radio" name="type" value="blog" onChange={this.select} checked={(type == 'blog') ? true : false} />
    			<strong>Blog:</strong> General Post type, start here if you dont know what to choose<br />
    			<input type="radio" name="type" value="event" onChange={this.select} checked={(type == 'event') ? true : false} />
    			<strong>Event:</strong> Virtual or real-world event<br />
    			<input type="radio" name="type" value="subject" onChange={this.select} checked={(type == 'subject') ? true : false} />
    			<strong>Subject:</strong> Share your knowledge or expertise with the community on a letiety of Subjects<br />
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

let Tags = React.createClass({
   add: function () {
        let model = {};
        model.tag = this.refs.tag.getDOMNode().value;

        if (model.tag !== null && this.props.post.id) {
            model.post_id = this.props.post.id;
            tags.add(model);
            return;
        }
        console.error('post must have an id first');
   },
   remove: function (e) {
       let id = e.currentTarget.id;
       tags.remove(id);
   },
   componentDidMount: function () {
        let self = this;
        tags.on('collection', function (code, data) {
            if (code != 200) {
                msg('yellow', 'Tags could not be loaded', code);
                return;
            }
            let post = self.props.post;
            post.tags = data;
            self.props.mutant.set({post: post});
        });
        tags.on('add', function (code, data) {
            if (code != 201) {
                msg('yellow', 'Tag could not be created', code);
                return;
            }
            let post = self.props.post;
            post.tags.push(data);
            self.props.mutant.set({post: post});
        });
        tags.on('remove', function (code, data) {
            if (code != 204) {
                msg('yellow', 'Tag could not be removed', code);
                return;
            }
            tags.collection({post_id: self.props.post.id});
        });
        tags.collection({post_id: this.props.post.id});
   },
   componentWillUnmount: function () {
       tags.off('collection');
       tags.off('add');
       tags.off('remove');
   },
   render: function () {
        let tags, list, self;
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

let Links = React.createClass({
   add: function () {
        if (this.props.post.id) {
            let model = {};
            model.url = this.props.link.url;
            model.caption = this.props.link.caption;
            model.post_id = this.props.post.id;
            links.add(model);
            return;
        }
        console.error('post must have an id first');
   },
   remove: function (e) {
       let id = e.currentTarget.id;
       links.remove(id);
   },
   edit: function (model) {;
        this.props.mutant.set({link: model});
   },
   save: function () {
       let link = {};
       link.url = this.props.link.url;
       link.caption = this.props.link.caption;
       links.save(this.props.link.id,  link);
   },
   change: function (e) {
       let url = this.refs.url.getDOMNode().value;
       let caption = this.refs.caption.getDOMNode().value;

       let link = this.props.link;
       link.url = url;
       link.caption = caption;
       this.props.mutant.set({link: link});
   },
   componentDidMount: function () {
        let self = this;
        links.on('collection', function (code, data) {
            if (code != 200) {
                msg('yellow', 'Links could not be loaded', code);
                return;
            }
            let post = self.props.post;
            post.links = data;
            self.props.mutant.set({post: post});
        });
        links.on('add', function (code, data) {
            if (code != 201) {
                msg('yellow', 'Link could not be created', code);
                return;
            }
            let post = self.props.post;
            post.links.push(data);
            self.props.mutant.set({post: post});
        });
        links.on('remove', function (code, data) {
            if (code != 204) {
                msg('red', 'Link could not be removed', code);
                return;
            }
            links.collection({post_id: self.props.post.id});
        });
        links.collection({post_id: this.props.post.id});
   },
   componentWillUnmount: function () {
       links.off('collection');
       links.off('add');
       links.off('remove');
   },
   render: function () {
        let links, list, self;
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
    	<select ref="element" value={this.props.post.element} onChange={this.props.change.bind(null, 'element')}>
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
        			<Select ref="category" value={this.props.post.category} onChange={this.props.change.bind(null, 'category')} data={tax.blogs[this.props.post.element]}>
        			</Select>
        			<label>Subcategory:</label>
        			<Select ref="subcategory" value={this.props.post.subcategory} onChange={this.props.change.bind(null, 'subcategory')} data={tax.blogs.subcategory}>
        			</Select>
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
        			<Select ref="category" value={this.props.post.category} onChange={this.props.change.bind(null, 'category')} data={tax.events[this.props.post.element]}>
        			</Select>
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
        			<Select ref="category" value={this.props.post.category} onChange={this.props.change.bind(null, 'category')} data={tax.subjects.category}>
        			</Select>
        			<br />
        			<label>Subcategory:</label>
        			<Select ref="subcategory" value={this.props.post.subcategory} onChange={this.props.change.bind(null, 'subcategory')} data={tax.subjects[this.props.post.category]}>
        			</Select>
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
        			<Select ref="category" value={this.props.post.subcategory} onChange={this.props.change.bind(null, 'category')} data={tax.subjects.category}>
        			</Select>
        			<br />
        			<label>Subcategory:</label>
        			<Select ref="subcategory" value={this.props.post.subcategory} onChange={this.props.change.bind(null, 'subcategory')} data={tax.subjects[this.props.post.category]}>
        			</Select>
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
        			<Select ref="category" value={this.props.post.category} onChange={this.props.change.bind(null, 'category')} data={tax.debates.category}>
        			</Select>
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
        			<Select ref="category" value={this.props.post.category} onChange={this.props.change.bind(null, 'category')} data={tax.beliefs.category}>
        			</Select>
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
