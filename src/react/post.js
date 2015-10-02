"use strict";
let React = require('react');
let Router = require('react-router');
let { Link, State, Navigation } = Router;
let moment = require('moment');
let numeral = require('numeral');
let RTE = require('react-quill');

let Actions = require('../actions/post');
let Stream = require('../actions/stream');
let ActionsAccount = require('../actions/account');

let Store = require('../stores/post');
let AccountStore = require('../stores/account');

let Comments = require('./post/comments');
let Links = require('./post/links');
let Meta = require('./post/meta');
let Pic = require('./post/pic');
let Privacy = require('./post/privacy');
let Tags = require('./post/tags');
let Thumbs = require('./post/thumbs');
let Types = require('./post/types');

let Loader = require('./loader');
let Influence = require('../influence');
let Popularity = require('../popularity');
let thousands = "0,0";
let en = numeral.language('en');

let Post = React.createClass({
	mixins: [State, Navigation],
	getInitialState: function () {
		return {
			scroll: false,
			confirmTrash: false,
			owner: false,
			location: {},
			saving: false,
			post: {
				id: 0
			},
			user: {
				id: 0
			},
			privacy: false
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
				if (data.saving === false) {
					this.context.router.transitionTo("myPosts");
				}
				this.setState({saving: data.saving, types: false});
			}
			if (data.post) {
				this.setState({post: data.post});
			}
			if (data.deleted) {
				this.context.router.transitionTo("myPosts");
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
		// <Categories {...this.state} context={this.props.context} owner={this.props.owner} />
		return (
			<div className={className}>
				{this.props.context.type === 'post'
					? <button className="close" onClick={this._back}>X</button>
					: false
				}
				{this.props.owner && this.props.context.type !== 'edit'
					? <Link to="edit" params={{id: this.state.post.id}} className="edit"><i className="fa fa-pencil" /><br />Edit</Link>
					: false
				}
				{this.props.owner && this.props.context.type === 'edit'
					? <div className="actions">
							{this.state.confirmTrash
								? <div>
										<button className="button green red" onClick={this._confirm} disabled={this.props.saving}><i className="fa fa-trash" /> Confirm Delete</button>
										<button className="button red delete inverted" onClick={this._cancel} style={{width: '95%'}}><i className="fa fa-remove" /> Cancel Delete</button>
									</div>
								: <div>
										<button className="button green save" onClick={this._update} disabled={this.props.saving}><i className="fa fa-save" /> {this.props.saving ? 'Saving' : 'Save'}</button>
										<button className="button gold inverted save" onClick={this._privacy}><i className="fa fa-lock" /> Privacy</button>
										<button className="button red delete inverted" onClick={this._trash}><i className="fa fa-trash" /> Delete</button>
										<button className="button blue myposts inverted" onClick={this._myposts}><i className="fa fa-arrow-left" /> Back to My Posts</button>
									</div>
							}
						</div>
					: false
				}
				<div className={`type ${this.state.post.type} ${(this.state.types ? 'inverted' : '')}`} onClick={this._type}><i className="fa fa-bell" /> {this.state.post.type ? this.state.post.type : "Please select a type"}</div>
				{types}
				{this.props.context.type === 'edit' && this.props.owner && this.state.privacy
					? <Privacy post={this.state.post} />
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
				{this.props.context.type !== 'edit'
					? tags
					: false
				}
				{content}
				{this.props.context.type === 'edit'
					? tags
					: false
				}
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
	_myposts: function () {
		this.context.router.transitionTo("myPosts");
	},
	_privacy: function () {
		this.setState({privacy: !this.state.privacy});
	},
	_type: function () {
		if (this.props.context.type === 'edit' && this.props.owner) {
			this.setState({types: !this.state.types});
		}
	},
	_title: function (e) {
		Actions.change('title', e.currentTarget.value);
	},
	_update: function () {
		Store.post.id = this.props.post.id;
		this.setState({saving: true});
		Actions.save();
	},
	_trash: function () {
		this.setState({confirmTrash: true});
	},
	_cancel: function () {
		this.setState({confirmTrash: false});
	},
	_confirm: function () {
		Store.post.id = this.props.post.id;
		Actions.trash();
	}
});

let Details = React.createClass({
	render: function () {
		let context = 'user';
		let org = {};
		if (this.props.post.org && this.props.post.org.id && this.props.post.org.id != 0) {
			org = this.props.post.org;
			context = 'org';
		}
		return (
			<div className="details">
				<Pic id={context === 'org' ? org.id : this.props.user.id} img={context === 'org' ? org.img : this.props.user.img} context={context} />
				<div className="basic">
					{context === 'org'
						? <div><Link to="orgPosts" params={{id: org.id}}>{org.name}</Link><br /><br /></div>
						: false
					}
					<span>By <Link to="userPosts" params={{id: this.props.user.id}}>{this.props.user.first} {this.props.user.last} </Link></span>
					&bull;
					<span className="location"> {this.props.location.city}, {this.props.location.state}</span>
					<div className="created">{moment(this.props.post.createdAt).fromNow()}</div>
					<Meta post={this.props.post} context={this.props.context} owner={this.props.owner} />
				</div>
			</div>
		);
	}
});

let TextEditor = React.createClass({
	render: function () {
		if (!this.props.post.hasOwnProperty('content')) {
			return false;
		}
		let content = this.props.post.content || "Enter content here";
		return (
			<div className="rte">
				<RTE ref="content" value={content} onChange={this._content} theme="snow" />
			</div>
		);
	},
	_content: function (value) {
		Actions.change('content', value);
	}
});

let Stats = React.createClass({
	componentDidMount: function () {
		this._popularity(this.props);
	},
	componentWillReceiveProps: function (data) {
		this._popularity(data);
	},
	render: function () {
		return (
			<div className="interact">
				{this.props.context.type === 'post' ? <Thumbs post={this.props.post} /> : false}
				<Influence influence={this.props.post.influence}/>
				<div className="popularity">
					<div>
						<canvas id={`popularity${this.props.post.id}`}></canvas>
						<div>Popularity</div>
					</div>
				</div>
				<div className="stats">
					<div><strong>{numeral(this.props.post.totalViews).format('0a')}</strong><br /><i className="fa fa-search" /></div>
					<div><strong>{numeral(this.props.post.totalComments).format('0a')}</strong><br /><i className="fa fa-comment" /></div>
					<div><strong>{numeral(this.props.post.totalThumbs).format('0a')}</strong><br /><i className="fa fa-thumbs-up" /></div>
				</div>
			</div>
		);
	},
	_popularity: function (data) {
		if (data.post && data.post.id > 0) {
			// when _popularity is called by componentWillReceiveProps, element
			// has not yet been rendered.
			setTimeout(() => {
				let element = document.getElementById(`popularity${data.post.id}`);
				let popularity = new Popularity(element, data.post.popularity || 100);
			}, 1);
		}
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
