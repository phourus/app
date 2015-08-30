"use strict";
let React = require('react');
let Router = require('react-router');
let { Link } = Router;
let moment = require('moment');
let numeral = require('numeral');
let thousands = "0,0";
let Store = require('../stores/post');
let Actions = require('../actions/post');
let Stream = require('../actions/search');
let tax = require('../taxonomy');
let RTE = require('react-quill');
let File = require('react-dropzone-component');
let AWS = require('aws-sdk');
AWS.config.update({accessKeyId: 'AKIAJJA4YUWAJE5AUIQQ', secretAccessKey: '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'});
let S3 = AWS.S3;
let s3 = new S3();

let Influence = require('../influence');
let Popularity = require('../popularity');

let Post = React.createClass({
	getInitialState: function () {
		return {
			selected: false
		}
	},
	componentDidUpdate: function () {
		if (this.props.selected === true && this.props.scroll === false) {
			let element = this.getDOMNode();
			let y = element.offsetTop - element.scrollTop + element.clientTop - 80;
			window.scrollTo(0, y);
		}
	},
	render: function () {
		let className = "postItem";
		let meta = [];
		let stats = <Stats post={this.props.post} />;
		let post = this.props.post;
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
			stats = this.props.editing ? false : <Stats post={this.props.post} />;
			tags = <Tags tags={this.props.post.tags} />;
			links = <Links post={this.props.post} editing={this.props.editing} />;
			thumbs = this.props.editing ? false : <Thumbs post={this.props.post} />;
		content = this.props.editing ? <TextEditor post={this.props.post} />: <div className="content" dangerouslySetInnerHTML={{__html: this.props.post.content}}></div>;
			comments = this.props.editing ? false : <Comments post={this.props.post} />;
			className += " selected";
			details = <ul>{meta}</ul>;
		}
		//<Link to="post" params={{id: this.props.post.id}}>{this.props.post.title}</Link>
		return (
			<div className={className}>
				<button className="close" onClick={this._hide}>X</button>
				<div className={`type ${this.props.post.type}`}><i className="fa fa-bell" /> {this.props.post.type}</div>
				<Link to="edit" params={{id: this.props.post.id}}>Edit</Link>
				{this.props.editing
					? <div contentEditable={true} className="title editing">{this.props.post.title}</div>
					: <h2 className="title"><a href="javascript:void(0)" onClick={this._toggle}>{this.props.post.title}</a></h2>
				}
				<div className="details">
					<div className="pic">
						<Link to="userPosts" params={{id: this.props.user.id}}>
								<img src={`/assets/avatars/${this.props.user.img || 'default'}.jpg`} />
						</Link>
					</div>
					<div className="basic">
						<span>By <Link to="userPosts" params={{id: this.props.user.id}}>{this.props.post.user.first} {this.props.post.user.last} </Link></span>
						&bull;
						<span className="location"> {this.props.location.city}, {this.props.location.state}</span>
						<div className="created">{moment(this.props.post.createdAt).fromNow()}</div>
						{details}
					</div>
				</div>
				<div className="footing">
					{tags}
					{content}
				</div>
				{thumbs}
				{stats}
				{links}
				{comments}
			</div>
		);
	},
	_toggle: function () {
		let id = 0;
		if (this.props.selected !== true) {
			id = this.props.post.id;
		}
		Stream.select(id);
	},
	_hide: function () {
		this.setState({hidden: true});
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
			<div className="meta">
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

let Links = React.createClass({
	render: function () {
		let edit = this.props.editing ? <Links.Edit post={this.props.post} /> : false;
		return (
			<div className="links">
				<h1>Links</h1>
				<Links.List post={this.props.post} />
				{edit}
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
				})}
			</div>
		);
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
			<div className="links">
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
     Actions.Thumbs.single(params.id);
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
		console.log(Store);
    this.unsubscribe = Store.Comments.listen((data) => {
      console.log(data);
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
        return <Comment key={item.id} comment={item} user={item.user} />;
      });
    }
    if (1) {
      create = <Create />
    }
    return (
      <div>
        <div className="comments">{comments}</div>
        {create}
      </div>
    );
  }
});

let Create = React.createClass({
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

let Comment = React.createClass({
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
