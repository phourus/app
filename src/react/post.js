/** @jsx React.DOM */
"use strict";
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var posts = require('../sockets/posts');
var comments = require('../sockets/comments');
var thumbs = require('../sockets/thumbs');
var moment = require('moment');
var msg = function (color, msg, code) {}

/** POST **/
var fa = {
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
var Post = React.createClass({
     mixins: [Router.State],
     componentDidMount: function () {         
         var self = this;
         var params = this.getParams();
         posts.on('single', function (code, data) {
            if (code != 200) {
                msg('red', 'Post could not be loaded', code);
                return;
            }
             self.props.mutant.set({post: data, user: data.user});
         });
         comments.on('collection', function (code, data) {
            if (code != 200) {
                msg('yellow', 'Comments could not be loaded', code);
                return;
            }
            self.props.mutant.set({comments: data});
         });
         console.log(params);
         posts.single(params.id);
         comments.collection({postId: params.id});
     },
     componentWillUnmount: function () {
         posts.off('single');
         comments.off('collection');
     },
     render: function () {
          var params = this.getParams();
          console.log(params);
          return (
            <div>
                <div className="heading">
                    <Meta post={this.props.post} />
                    <h1>{this.props.post.title}</h1>
                    <div className="basic">
                      <span>By <Link href={"/user/" + this.props.user.id}>{this.props.user.first} {this.props.user.last}</Link> </span>
                      <Tags tags={this.props.post.tags} />
                      <br />
                      <span>Originally by {this.props.post.author}</span>
                      <br />
                      <span className="created">{moment(this.props.post.createdAt).fromNow()} </span>
                      <span className="views">
                        <i className="fa fa-eye" />
                        <span> {this.props.post.views} views</span>
                     </span>
                    </div>
                </div>
                <div className="content">{this.props.post.content}</div>
                <Links />
                <Author />
                <Thumbs post={this.props.post} thumb={this.props.thumb} />
                <Comments post={this.props.post} comments={this.props.comments} />
            </div>
          );
     }
});

var Meta = React.createClass({
   render: function () {
       var meta = [];
       var capitalized = "";
       var t = this.props.post.type;
       if (t.length > 0) {
          capitalized = t[0].toUpperCase() + t.slice(1);
       }
       for (var i in this.props.post) {
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

var Tags = React.createClass({
    render: function () {
        var tags = [];
        for (var i in this.props.tags) {
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

var Links = React.createClass({
    render: function () {
        var links;
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

var Author = React.createClass({
      render: function () {
        return (
            <div className="author">
            </div>
        );
    }  
});

var Thumbs = React.createClass({
   componentDidMount: function () {
     var self = this;
     thumbs.on('single', function (code, data) {
         if (code != 200) {
            msg('yellow', 'Thumbs could not be loaded', code);
            return;
         }
     });
     thumbs.single(this.props.post.id);
   },
   componentWillUnmount: function () {
       thumbs.off('single');
   },
   like: function () {
       var model = {};
       model.post_id = this.props.post.id;
       model.positive = 1;
       thumbs.add(model);
   },
   dislike: function () {
       var model = {};
       model.post_id = this.props.post.id;
       model.positive = 0;
       thumbs.add(model);
   },
   render: function () {
       var c = ''; 
       var current = '';
       var icon = '';
       var popularity = (this.props.post.likes / this.props.post.dislikes);
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

var Comments = React.createClass({
    componentDidMount: function () {
         var self = this;
         comments.on('add', function (code, data) {
            if (code != 201) {
                msg('red', 'Comment could not be created', code);
                return;
            }
         });         
    },
    componentWillUnmount: function () {
        comments.off('add');    
    },
    render: function () {
          var create = <h3>You must be logged-in to comment</h3>
          var token = null;
          if (token === null) { 
            //pic = <a href="#user/{this.props.id}"><img src="{this.props.pic}" width="100"></a>
          }
        var data = this.props.comments.rows;
		var comments = [];
		if (data) {
            comments= data.map(function (item, i) {
    		   var user = {id: 1, first: "JESSE", last: "drelick", influence: 66, username: "jdrelick", img: 1};
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

var Create = React.createClass({
    add: function () {
        var model = {};
        model.content = this.refs.comment.getDOMNode().value;
        model.post_id = this.props.postID;
        comments.add(model);
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

var Comment = React.createClass({
   render: function () {
       var textarea = '';
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
                    <img src={"/assets/avatars/" + this.props.user.img + ".jpg"} width="100" />
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