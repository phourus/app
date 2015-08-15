"use strict";
let React = require('react');
let Router = require('react-router');
let { Link } = Router;
let moment = require('moment');
let numeral = require('numeral');
let thousands = "0,0";
let Store = require('../stores/search');
let Actions = require('../actions/search');

let Influence = require('../influence');
let Popularity = require('../popularity');

let Post = React.createClass({
	getInitialState: function () {
		return {
			selected: false
		}
	},
	componentDidMount: function () {
		let element = document.getElementById(`popularity${this.props.post.id}`);
		let popularity = new Popularity(element, this.props.post.popularity);
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
			tags = <Tags tags={this.props.post.tags} />;
			links = <Links links={this.props.post.links} />;
			thumbs = <Thumbs post={this.props.post} />;
			content = <div className="content" dangerouslySetInnerHTML={{__html: this.props.post.content}}></div>;
			comments = <Comments post={this.props.post} />;
			className += " selected";
			details = <ul>{meta}</ul>;
		}
		//<Link to="post" params={{id: this.props.post.id}}>{this.props.post.title}</Link>
		return (
			<div className={className}>
				<button className="close" onClick={this._hide}>X</button>
				<div className={`type ${this.props.post.type}`}><i className="fa fa-bell" /> {this.props.post.type}</div>
				<Link to="edit" params={{id: this.props.post.id}}>Edit</Link>
				<h2 className="title"><a href="javascript:void(0)" onClick={this._toggle}>{this.props.post.title}</a></h2>
				<div className="details">
					<div className="pic">
						<Link to="user" params={{id: this.props.user.id}}>
								<img src={`/assets/avatars/${this.props.user.img || 'default'}.jpg`} />
						</Link>
					</div>
					<div className="basic">
						<span>By <Link to="user" params={{id: this.props.user.id}}>{this.props.post.user.first} {this.props.post.user.last} </Link></span>
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
		Actions.select(id);
	},
	_hide: function () {
		this.setState({hidden: true});
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
		return (
      <div className="links">
				<div className="list">
					{this.props.links.map((item, index) => {
						let image = item.img || '/assets/logos/logo-emblem.png';
						return (
							<div key={item.id}>
								<div className="image">
									<img src={image} />
								</div>
								<div>
									<a href={item.url} target="_blank">{item.title}</a>
									<p>{item.caption}</p>
								</div>
								<div style={{clear: 'both'}}></div>
							</div>
						);
					})}
				</div>
      </div>
    );
  }
});

let Thumbs = React.createClass({
   mixins: [Router.State],
   componentDidMount: function () {
     let params = this.getParams();
     this.unsubscribe = Store.Thumbs.listen((data) => {
       this.setState(data);
     });
     Actions.thumbs(params.id);
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
    Actions.comments(this.props.post.id);
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
          <a href="/account">
            <img src={"/assets/avatars/1.jpg"} />
          </a>
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
          <a href={"/user/" + this.props.user.id}>
            <img src={`/assets/avatars/${this.props.user.img}.jpg`} width="100" />
          </a>
        </div>
        <div className="content">
          <a className="username" href={"/user/" + this.props.user.id} >
            {this.props.user.username} ({this.props.user.influence})
          </a>
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
