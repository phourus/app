"use strict";
let React = require('react');
let Router = require('react-router');
let { RouteHandler, Link } = Router;
let moment = require('moment');

let View401 = require('./401');

let Actions = require('../actions/editor');
let Store = require('../stores/editor');

let token = require('../token');
let tax = require('../taxonomy');
//let RTE = require('rte');

let Editor = React.createClass({
	 mixins: [Router.State],
	 render: function () {
		let id = this.getParams().id || null;
		if (token.get() === false) {
            return (<View401 />);
		}
    return (
      <div className="editor">
      	<h1>Content Factory</h1>
      	<RouteHandler postID={id} />
      </div>
    );
	 }
});

Editor.List = React.createClass({
	mixins: [Router.Navigation],
	getInitialState: function () {
		return {
			posts: []
		}
	},
	add: function () {
		this.transitionTo("add");
	},
	edit: function (e) {
		let id = e.currentTarget.id;
		this.transitionTo("edit", {id: id});
	},
	componentDidMount: function () {
		let self = this;
		Store.listen(function (data) {
			self.setState(data);
		});
		Actions.account();
	},
	render: function () {
		let self = this;
		let rows = this.state.posts.map(function (item) {
		   return <tr key={item.id}>
    		    <td>{moment(item.createdAt).fromNow()}</td>
    		    <td><Link to="post" params={{id: item.id}}>{item.title}</Link></td>
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

Editor.Fields = React.createClass({
	getInitialState: function () {
		return {
			postID: null,
			post: {}
		}
	},
	change: function () {

	},
	save: function () {
		let model = this.getValues();
		if (this.props.post.id === null) {
			Actions.add(model);
		} else {
			Actions.save(this.state.post.id, model);
		}
	},
	list: function () {

	},
	reset: function () {
		Actions.reset();
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
	componentDidMount: function () {
		let self = this;
		Store.listen(function (data) {
			self.setState({post: data});
		});
		if (this.props.postID) {
			Actions.single(this.props.postID);
		}
	},
	render: function () {
    let remove, privacy;
    if (this.props.postID) {
        remove = <button ref="remove" className="button red">Delete Post <i className="fa fa-trash" /></button>
    }
    privacy = this.state.post.privacy || 'private';
		return (
			<div className="form">
			    <label>Title:</label>
				<input ref="title" type="text" placeholder="title" value={this.state.post.title} onChange={this.change.bind(null, 'title')}/>
				<br />
				<label>Privacy:</label>
				<select ref="privacy" value={privacy} onChange={this.change.bind(null, 'privacy')}>
					<option value="private">Private</option>
					<option value="phourus">Members only</option>
					<option value="public">Public</option>
				</select>
				<Tags ref="tags"></Tags>
				<TextEditor ref="rte" post={this.state.post} change={this.change}></TextEditor>
				<Details ref="details" post={this.state.post} change={this.change}></Details>
				<Links ref="links"></Links>
				<div ref="actions" className="actions">
          <button ref="save" className="button green" onClick={this.save}>
              {this.state.post.id ? "Update Post" : "Create New Post"}
							<i className="fa fa-pencil" />
          </button>
          {remove}
          <button ref="back" className="button blue" onClick={this.list}>
						Back to List
						<i className="fa fa-list" />
					</button>
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
	    //let post = this.props.post;
    	//post.type = value;
    	//this.props.mutant.set({post: post});
	},
	render: function () {
	  let type = this.props.post.type;
	  if (!type) {
    	  //type = 'blog';
	  }
	  return (
			<div className="details">
				<div className="types">
						<h3>Please select a type before saving</h3>
	    			<div className="blog ">
		    			<strong>Blog</strong>
							<p>General Post type, start here if you dont know what to choose</p>
						</div>
	    			<div className="event">
		    			<strong>Event</strong>
							<p>Virtual or real-world event</p>
						</div>
	    			<div className="subject">
		    			<strong>Subject</strong>
							<p>Share your knowledge or expertise with the community on a letiety of Subjects</p>
						</div>
	    			<div className="question">
		    			<strong>Question</strong>
							<p>Need help or clarification on a topic? Ask it with a Question</p>
						</div>
	    			<div className="debate">
		    			<strong>Debate</strong>
							<p>Get the discussion started with a local, county, state or national-level Debate</p>
						</div>
						<div className="poll">
							<strong>Poll</strong>
							<p>Get the discussion started with a local, county, state or national-level Debate</p>
						</div>
	    			<div className="quote">
		    			<strong>Quote</strong>
							<p>Has someone else already described how you feel? Post their Quote here</p>
						</div>
	    			<div className="belief selected">
		    			<strong>Belief</strong>
							<p>Tell us more about your Belief on something dear to you</p>
						</div>
				</div>
				<Meta ref="meta" post={this.props.post} change={this.props.change} />
			</div>
	  );
	 }
});

let Tags = React.createClass({
   getInitialState: function () {
			return {
				postID: null,
				tags: []
			}
	 },
	 add: function () {
      let model = {};
      model.tag = this.refs.tag.getDOMNode().value;

      if (model.tag !== null && this.state.post.id) {
          model.post_id = this.state.post.id;
          Actions.tags.add(model);
          return;
      }
      console.error('post must have an id first');
   },
   remove: function (e) {
       let id = e.currentTarget.id;
       Actions.tags.remove(id);
   },
	componentDidMount: function () {
		let self = this;
		Store.listen(function (data) {
			self.setState(data);
		});
		Actions.Tags.collection({post_id: this.props.postID});
	},
   render: function () {
    let self = this;
    let tags = this.state.tags;
	   let list = tags.map(function (item) {
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
