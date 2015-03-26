"use strict";
let React = require('react');
let Router = require('react-router');
let { Link } = Router;
let moment = require('moment');
let Actions = require('../actions/post');
let Store = require('../stores/post');

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
                id: null,
                title: "",
                created: "",
                influence: null,
                element: '',
                scope: '',
                type: ''
            },
            user: {
                id: null,
                first: "",
                last: ""
            },
            comments: {
                rows: [],
                total: 0
            }
        }
     },
     componentDidMount: function () {
         let self = this;
         let params = this.getParams();
         Store.listen(function (data) {
             self.setState(data);
         });
         Actions.single(params.id);
         Actions.Comments.collection({postId: params.id});
     },
     render: function () {
      //  <Link to="user" path={`/user/${this.state.user.id}`} params={{id: this.state.user.id}}>
      //                          {this.state.user.first} {this.state.user.last}
      //                        </Link>
          let params = this.getParams();
          return (
            <div className="post">
                <div className="heading">
                    <Meta post={this.state.post} />
                    <h1>{this.state.post.title}</h1>
                    <div className="basic">
                      <span>
                      By

                      </span>
                      <Tags tags={this.state.post.tags} />
                      <br />
                      <span>Originally by {this.state.post.author}</span>
                      <br />
                      <span className="created">{moment(this.state.post.createdAt).fromNow()} </span>
                      <span className="views">
                        <i className="fa fa-eye" />
                        <span> {this.state.post.views} views</span>
                     </span>
                    </div>
                </div>
                <div className="content">{this.state.post.content}</div>
                <Links />
                <Author />
                <Thumbs post={this.state.post} thumb={this.state.thumb} />
                <Comments post={this.state.post} comments={this.state.comments} />
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
				meta.push(<div key={i}><strong>{i}:</strong> {this.props.post[i]}</div>);
			}
		}
       return (
         <div className="meta">
            <div>
                <span className={t + " type"}>
                    <i className={"fa fa-" + fa[t]} /> {capitalized}
                </span>
                <div>
                    {meta}
                </div>
            </div>
            <ul className="breadcrumb">
                <li>{this.props.post.element}</li>
                <li>{this.props.post.category}</li>
                <li>{this.props.post.category}</li>
            </ul>
         </div>
       );
   }
});

let Tags = React.createClass({
    render: function () {
        let tags = [];
        for (let i in this.props.tags) {
            tags.push(<span className="tag" key={i}>{this.props.tags[i].tag}</span>);
        }
        return (
            <span className="tags">
                <i className="fa fa-tag" />
                {tags}
            </span>
        );
    }
});

let Links = React.createClass({
    render: function () {
        let links;
        if (!this.props.post || !this.props.post.tags) {
            return <div></div>
        }
        links = this.props.post.links;
        return (
            <div className="links">
                {links}
            </div>
        );
    }
});

let Author = React.createClass({
      render: function () {
        return (
            <div className="author">
            </div>
        );
    }
});

let Thumbs = React.createClass({
   componentDidMount: function () {
     Actions.Thumbs.single(this.props.post.id);
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
       let icon = '';
       let popularity = (this.props.post.likes / this.props.post.dislikes);
       if(popularity > 50){
         c = 'positive';
         <i className="fa fa-plus fa-2x" />
       } else if (popularity < 50) {
         c = 'negative';
         <i className="fa fa-minus fa-2x" />
       }
       if (this.props.thumb === 1) {
           current = 'like';
       } else if (this.props.thumb === 0) {
           current = 'dislike';
       }
       // <p>You have decided you {current} this post. Click the button below to change your mind.</p>
       return (
          <div className="thumb">

            {icon}
            <div>
                <em className="{c}">({this.props.popularity}% popularity)</em>
                <span><i className="fa fa-arrow-up" />{this.props.post.positive}</span>
                <span><i className="fa fa-arrow-down" />{this.props.post.thumbs}</span>
                <button className="button green medium inline" onClick={this.like}><i className="fa fa-2x fa-arrow-circle-o-up" /> Like</button>
                <button className="button red medium inline" onClick={this.dislike}><i className="fa fa-2x fa-arrow-circle-o-down" /> Dislike</button>


            </div>
          </div>
       );
   }
});

let Comments = React.createClass({
    render: function () {
          let create = <h3>You must be logged-in to comment</h3>
          let token = null;
          if (token === null) {
            //pic = <a href="#user/{this.props.id}"><img src="{this.props.pic}" width="100"></a>
          }
        let data = this.props.comments.rows;
		let comments = [];
		if (data) {
            comments= data.map(function (item, i) {
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
