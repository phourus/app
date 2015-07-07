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
        <div className="content">{this.state.post.content}</div>
        <h2>Comments</h2>
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


module.exports = Post;
