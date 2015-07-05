"use strict";
let React = require('react');
let Router = require('react-router');
let { Link } = Router;
let moment = require('moment');
let Actions = require('../actions/post');
let Store = require('../stores/post');
let Popularity = require('../popularity');

/** POST **/
let fa = {
    blog: "bookmark",
    event: "calendar",
    subject: "book",
    question: "question",
    debate: "microphone",
    poll: "pie-chart",
    quote: "quote-right",
    belief: "cloud"
}
// Post, Author

/** INTERACT **/
// Views, Comments, Likes
let Post = React.createClass({
  mixins: [Router.State],
  getInitialState: function () {
    return {
      post: {
        id: 0,
        title: "",
        created: "",
        influence: null,
        element: '',
        scope: '',
        type: '',
        tags: [],
        links: []
      },
      user: {
        id: 0,
        first: "",
        last: ""
      }
    }
  },
  componentDidMount: function () {
    let params = this.getParams();
    this.unsubscribe = Store.listen((data) => {
      this.setState(data);
    });
    Actions.single(params.id);
    Actions.Comments.collection({postId: params.id});
  },
  componentWillUnmount: function () {
    this.unsubscribe();
  },
  render: function () {
    let params = this.getParams();
    let author = false;
    if (this.state.post.author) {
      author = <div style={{fontSize: '80%', fontStyle: 'italic'}}>Originally by: {this.state.post.author}</div>
    }
    return (
      <div className="post">
        <div className="heading">
          <Meta post={this.state.post} />
          <h1>{this.state.post.title}</h1>
          <Thumbs {...this.state} />
          <div className="basic">
            <div>
              <span>Created by </span>
              <Link to="user" params={{id: this.state.user.id}}>
                {this.state.user.first} {this.state.user.last}
              </Link>
              <span className="created"> {moment(this.state.post.createdAt).fromNow()}</span>
            </div>
            {author}
            <div className="views">
              <i className="fa fa-eye" />
              <span> {this.state.post.totalViews} views</span>
            </div>
          </div>
        </div>
        <Tags tags={this.state.post.tags} /><br /><br />
        <div className="content">{this.state.post.content}</div>
        <h2>Comments</h2>
        <Comments post={this.state.post} />
      </div>
    );
  }
});

let Meta = React.createClass({
  render: function () {
    let meta = [];
    let capitalized = "";
    let t = this.props.post.type;
    if (t.length > 0) {
      capitalized = t[0].toUpperCase() + t.slice(1);
    }
    for (let i in this.props.post) {
      if (['difficulty', 'scope', 'zip'].indexOf(i) !== -1 && this.props.post[i] !== null) {
        meta.push(<div key={i}><strong>{i.toUpperCase()}:</strong> {this.props.post[i]}</div>);
      }
    }
    return (
      <div className="top">
        <div className="type">
          <span className={t + " type"}>
            <i className={"fa fa-" + fa[t]} /> {capitalized}
          </span>
        </div>
        <ul className="breadcrumb">
          <li><a href="">Mind</a> >></li>
          <li><a href="">History</a> >></li>
          <li><a href="">American History</a></li>
        </ul>
        <div className="meta">{meta}</div>
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
    return (
      <div className="links">
        {this.props.links.map((item, index) => {
          return (
            <div className="link" key={index}>
              <a href={item.url}>
                {item.caption}
              </a>
            </div>
          );
        })}
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
     Actions.Thumbs.collection(params.id);
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
       new Popularity(document.getElementById('popularity'), this.props.post.popularity);
     }
     if (this.props.thumb === 1) {
       current = 'like';
     } else if (this.props.thumb === 0) {
       current = 'dislike';
     }
     // <p>You have decided you {current} this post. Click the button below to change your mind.</p>
     return (
        <div className="thumb">
          <div className="popularity">
            <canvas id='popularity'></canvas>
          </div>
          <div className="counts">
            <span className="green"><i className="fa fa-arrow-up" />1,434  </span>
            <span className="red"><i className="fa fa-arrow-down" />142</span>
          </div>
          <div className="buttons">
            <button className="button green medium" onClick={this.like}><i className="fa fa-2x fa-arrow-circle-o-up" /> Like</button>
            <button className="button red medium" onClick={this.dislike}><i className="fa fa-2x fa-arrow-circle-o-down" /> Dislike</button>
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
    let params = this.getParams();
    this.unsubscribe = Store.Comments.listen((data) => {
      this.setState(data);
    });
    Actions.Comments.collection(params.id);
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
        let user = {id: 1, first: "JESSE", last: "drelick", influence: 66, username: "jdrelick", img: 1};
        return <Comment key={item.id} comment={item} user={user} />;
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

module.exports = Post;
