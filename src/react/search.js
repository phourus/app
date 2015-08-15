"use strict";
let React = require('react');
let Router = require('react-router');
let { Link } = Router;
let posts = require('../api/posts');
let moment = require('moment');
let numeral = require('numeral');
let thousands = "0,0";
let Store = require('../stores/search');
let Actions = require('../actions/search');

let Tax = require('../taxonomy');
let Influence = require('../influence');
let Popularity = require('../popularity');
let Scroll = require('react-infinite-scroll')(React);

let Search = React.createClass({
	mixins: [Router.State],
	getInitialState: function () {
		return {
			posts: [],
			total: 0,
			selected: 0,
			params: {
				exclude: [],
				search: '',
				sortBy: 'influence',
				direction: 'DESC',
				page: 1,
				limit: 10,
				total: 0
			},
			context: {
				type: null,
				id: null
			}
		}
	},
	componentDidMount: function () {
		let type = null;
		let route = this.context.router.getCurrentRoutes();
		let params = this.context.router.getCurrentParams();
		if (route[2]) {
			type = route[2].name;
		}
		Actions.context(type, params.id);
		this.unsubscribe = Store.listen((data) => {
			this.setState(data);
		});
		Actions.collection();
	},
	componentWillUnmount: function () {
		this.unsubscribe();
	},
	render: function () {
		let visible = 'fa fa-minus-square-o';
		let hidden = 'fa fa-plus-square-o';
		return (
			<div className="search">
				<Head {...this.state.params} />
				<Scroll pageStart={0} loadMore={this._more} hasMore={(this.state.posts.length < this.state.total)} loader={<div className="loader">Loading more...</div>}>
						<Posts posts={this.state.posts} selected={this.state.selected} scroll={this.state.scroll} />
				</Scroll>
			</div>
		);
	},
	_more: function () {
		Actions.more();
	}
});

let Head = React.createClass({
	getInitialState: function () {
		return { mode: false };
	},
	render: function () {
		let popup = '';
		if (this.state.mode === 'categories') {
			popup = <Categories {...this.props} />
		}
		if (this.state.mode === 'filter') {
			popup = <Filter {...this.props} />
		}
		if (this.state.mode === 'sort') {
			popup = <Sort {...this.props} />
		}
		return (
			<div className="heading">
				<div className="keywords">
						<input ref="term" className="term" type="text" placeholder="Search for" />
						<button className="button blue" ref="search" onClick={this._search}><i className="fa fa-search" /> Search</button>
				</div>
				<div className="refine">
					<Context {...this.props.context} />
					<div className="toggles">
						<button className="fa fa-tag" onClick={this._tags}> Tags</button>
						<button className="fa fa-filter" onClick={this._filter}> Filter</button>
						<button className="fa fa-sort" onClick={this._sort}> Sort</button>
					</div>
				</div>
				{popup}
			</div>
		);
	},
	_search: function () {
			let val = this.refs.term.getDOMNode().value;
			Actions.search(val);
	},
	_tags: function () {
		if (this.state.mode === 'categories') {
			this.setState({mode: false});
		} else {
			this.setState({mode: 'categories'});
		}
	},
	_filter: function () {
		if (this.state.mode === 'filter') {
			this.setState({mode: false});
		} else {
			this.setState({mode: 'filter'});
		}
	},
	_sort: function () {
		if (this.state.mode === 'sort') {
			this.setState({mode: false});
		} else {
			this.setState({mode: 'sort'})
		}
	}
});

let Context = React.createClass({
	getDefaultProps: function () {
		return {
			id: null,
			type: null,
			profile: null
		}
	},
	render: function () {
		let label = 'Viewing all public Phourus posts';
		let img = '/assets/logos/logo-emblem.png';
		let clear = false;
		let clearLink = <span> | Clear filters <a href="javascript:void(0)" className="close" onClick={this._clear}>x</a></span>;
		let link = false;
		let name = '';
		if (this.props.profile) {
			name = this.props.profile.username || this.props.profile.shortname || '';
		}
		if (true === 'user is logged in') {
			link = <Link to="myPosts">Click here to view your posts</Link>
		} else {
			link = <Link to="account">Click here to create posts</Link>
		}
		if (this.props.type === 'myPosts') {
			label = 'Viewing all my posts:';
			clear = clearLink;
			img = '/assets/avatars/' + (this.props.profile.img || 'default') + '.jpg';
			link = <Link to="account">View my account</Link>
		}
		if (this.props.type === 'userPosts') {
			label = 'Viewing posts by:';
			img = '/assets/avatars/' + (this.props.profile.img || 'default') + '.jpg';
			clear = clearLink;
			link = <Link to="user" params={{id: this.props.id}}>{name}</Link>
		}
		if (this.props.type === 'orgPosts') {
			label = 'Viewing posts by:';
			img = '/assets/orgs/' + (this.props.profile.img || 'default') + '.jpg';
			clear = clearLink;
			link = <Link to="user" params={{id: this.props.id}}>{name}</Link>
		}
		return (
			<div className="context">
				<img src={img} />
				{label}<br />
			  {link} {clear}
			</div>
		);
	},
	_clear: function () {
		Actions.context(null, null);
	}
});

let Foot = React.createClass({
	render: function () {
		return (
			<div className="foot">
				<Pagination ref="pagination" page={this.props.params.page} total={this.props.total} limit={this.props.params.limit} />
			</div>
		);
	}
});

let Categories = React.createClass({
	getInitialState: function () {
		return {
			element: 'blogs',
			category: '',
			subcategory: ''
		}
	},
	render: function () {
		let categories = [];
		let subcategories = [];
		categories = Tax[this.state.element];

		if (this.state.element === 'blogs') {
			categories = Tax.blogs.world;
		}
		if (this.state.element === 'subjects') {
			categories = Tax.subjects.category;
			subcategories = Tax.subjects[this.state.category || Tax.subjects.category[0].value];
		}
		if (this.state.element === 'debates') {
			categories = Tax.debates.category;
			subcategories = [];
		}
		if (this.state.element === 'beliefs') {
			categories = Tax.beliefs.category;
			subcategories = [];
		}
		return (
			<div className="categories">
				<div className="toggles">
					<button className="button blue">Select All</button>
					<button className="button red">Select None</button>
				</div>
				<ul>
					<li><a id="blogs" href="javascript:void(0)" onClick={this._changeElement}>Blogs & Events</a></li>
					<li><a id="subjects" href="javascript:void(0)" onClick={this._changeElement}>Subjects & Questions</a></li>
					<li><a id="debates" href="javascript:void(0)" onClick={this._changeElement}>Debates & Polls</a></li>
					<li><a id="beliefs" href="javascript:void(0)" onClick={this._changeElement}>Beliefs & Quotes</a></li>
				</ul>
				<ul>
					{categories.map((item) => {
						return <li><a id={item.value} href="javascript:void(0)" onClick={this._changeCategory}>{item.label}</a></li>
					})}
				</ul>
				<ul>
					{subcategories.map((item) => {
						return <li><a id={item.value} href="javascript:void(0)" onClick={this._changeCategory}>{item.label}</a></li>
					})}
				</ul>
			</div>
		);
	},
	_changeElement: function (e) {
		let id = e.currentTarget.id;
		this.setState({element: id});
	},
	_changeCategory: function (e) {
		let id = e.currentTarget.id;
		this.setState({category: id});
	}
});

let Filter = React.createClass({
	render: function () {
		return (
			<div className="filter">
				<div className="triangle"></div>
				<div className="label">Filter By</div>
				<Types {...this.props} />
				<div className="label">Date Range</div>
				<Dates />
				<button className="clear">
					Clear All <i className="fa fa-close" />
				</button>
				<button className="apply">
					Apply <i className="fa fa-check" />
				</button>
			</div>
		);
	},
	toggleFilter: function (e) {
		let id = e.currentTarget.id;
		let prop = id + "Visible";
		let obj = {};
		let visibility = this.state[prop] == true ? false : true;
		obj[prop] = visibility;
		Actions.type(obj);
	}
});

let Sort = React.createClass({
	render: function () {
		return (
			<div className="sortby">
				<div className="triangle"></div>
				<div className="label">Sort by</div>
				<ul className="sort" ref="sort">
					<li className={(this.props.sortBy === 'influence') ? "selected" : ""} onClick={this._influence}><i className="fa fa-check" /> Influence</li>
					<li className={(this.props.sortBy === 'totalViews') ? "selected" : ""} onClick={this._views}><i className="fa fa-check" /> Views</li>
					<li className={(this.props.sortBy === 'popularity') ? "selected" : ""} onClick={this._popularity}><i className="fa fa-check" /> Popularity</li>
					<li className={(this.props.sortBy === 'totalThumbs') ? "selected" : ""} onClick={this._thumbs}><i className="fa fa-check" /> Thumbs</li>
					<li className={(this.props.sortBy === 'totalComments') ? "selected" : ""} onClick={this._comments}><i className="fa fa-check" /> Comments</li>
					<li className={(this.props.sortBy === 'location') ? "selected" : ""} onClick={this._location}><i className="fa fa-check" /> Location</li>
					<li className={(this.props.sortBy === 'date') ? "selected" : ""} onClick={this._date}><i className="fa fa-check" /> Date</li>
				</ul>
				<div className="direction"  ref="direction">
					<button className={(this.props.direction === 'DESC') ? 'selected' : ''} onClick={this._desc}>
							<i className="fa fa-arrow-down" /> High to Low
					</button>
					<button className={(this.props.direction === 'ASC') ? 'selected' : ''} onClick={this._asc}>
						<i className="fa fa-arrow-up" /> Low to High
					</button>
				</div>
			</div>
		);
	},
	_influence: function (e) { Actions.sortBy('influence'); },
	_views: function (e) { Actions.sortBy('totalViews'); },
	_popularity: function (e) { Actions.sortBy('popularity'); },
	_thumbs: function (e) { Actions.sortBy('totalThumbs'); },
	_comments: function (e) { Actions.sortBy('totalComments'); },
	_location: function (e) { Actions.sortBy('location'); },
	_date: function (e) { Actions.sortBy('date'); },
	_asc: function (e) { Actions.direction('ASC'); },
	_desc: function (e) { Actions.direction('DESC'); },
});

let Dates = React.createClass({
	render: function () {
		return (
			<div className="dates">
				<div>
					<label>From:</label>
					<button><i className="fa fa-calendar" /></button>
					<input />
				</div>
				<div>
					<label>To:</label>
					<button><i className="fa fa-calendar" /></button>
					<input />
				</div>
			</div>
		);
	}
});

let Types = React.createClass({
	render: function () {
		var classes = {
			blog: "button green",
			event: "button green",
			subject: "button blue",
			question: "button blue",
			debate: "button red",
			poll: "button red",
			belief: "button gold",
			quote: "button gold"
		}
		for (var i = 0; i < this.props.exclude.length; i++) {
			var key = this.props.exclude[i];
			classes[key] += " off";
		}
		return (
			<div className="types">
				<button id="blog" className={classes.blog} onClick={this._toggle}><i className="fa fa-laptop" /> Blogs</button>
				<button id="event" className={classes.event} onClick={this._toggle}><i className="fa fa-calendar" /> Events</button>
				<button id="subject" className={classes.subject} onClick={this._toggle}><i className="fa fa-puzzle-piece" /> Subjects</button>
				<button id="question" className={classes.question} onClick={this._toggle}><i className="fa fa-question" /> Questions</button>
				<button id="debate" className={classes.debate} onClick={this._toggle}><i className="fa fa-bullhorn" /> Debates</button>
				<button id="poll" className={classes.poll} onClick={this._toggle}><i className="fa fa-line-chart" /> Polls</button>
				<button id="belief" className={classes.belief} onClick={this._toggle}><i className="fa fa-road" /> Beliefs</button>
				<button id="quote" className={classes.quote} onClick={this._toggle}><i className="fa fa-quote-right" /> Quotes</button>
			</div>
		);
	},
	_toggle: function (e) {
		let type = e.currentTarget.id;
		Actions.exclude(type);
	}
});

let Pagination = React.createClass({
	render: function () {
		let pages = Math.ceil(this.props.total / this.props.limit);
		return (
			<div className="pagination">
				<div>Displaying page {this.props.page} of {pages} out of {this.props.total} posts</div>
				<button href="javascript:void(0)" ref="prev" className="button blue" onClick={this._previous}>Previous</button>
				<button href="javascript:void(0)" ref="next" className="button blue" onClick={this._next}>Next</button>
			</div>
		);
	},
	_next: function () {
		Actions.nextPage();
	},
	_previous: function () {
		Actions.previousPage();
	}
});

/** POSTS **/
let Posts = React.createClass({
	render: function () {
		let data = this.props.posts;
		let list = [];

		list = data.map((item, i) => {
			 let location = {};
			 let selected = (item.id === this.props.selected);
			 if (item.user.locations && item.user.locations.length > 0) {
					 location = item.user.locations[0];
			 }
			 return <PostItem key={item.id} post={item} user={item.user} location={location} selected={selected} scroll={this.props.scroll} />;
		});
		return (
			<div className={this.props.selected > 0 ? "post" : "posts"}>{list}</div>
		);
	}
});

let PostItem = React.createClass({
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

module.exports = Search;
