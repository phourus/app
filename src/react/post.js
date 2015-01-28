/** @jsx React.DOM */
"use strict";
var React = require('react');
var posts = require('../objects/posts');
var comments = require('../objects/comments');
var thumbs = require('../objects/thumbs');

/** POST **/
// Post, Author

/** INTERACT **/
// Views, Comments, Likes
var Post = React.createClass({
     componentDidMount: function () {         
         var self = this;
         posts.on('returnSingle', function (data) {
             self.props.update('post', {post: data}, function () {
                 comments.collection({post_id: data.id});
             });
         });
         comments.on('returnCollection', function (data) {
             self.props.update('post', {comments: data});
         });
         posts.single(this.props.id);
     },
     render: function () {
          console.log(this.props.post);
          return (
            <div>
                <a href="">Go Back</a>
                <h1>{this.props.post.title}</h1>
                <div className="basic">
                  <h3>By {this.props.user.first} {this.props.user.last}</h3>
                  <span className="created">{this.props.created}</span>
                  <div className="type">{this.props.post.type}</div>
                </div>
                <Details post={this.props.post} />
                <div>{this.props.post.content}</div>
                <Interact post={this.props.post} update={this.update} comments={this.props.comments} />
            </div>
          );
     }
});

var Details = React.createClass({
   //<div className="influence">{this.props.post.influence}</div>

   render: function () {
       return (
         <ul className="detail">
            <li><strong>Positive:</strong> {this.props.post.positive}</li>
            <li><strong>Category:</strong> {this.props.post.category}</li>
            <li><strong>Element:</strong> {this.props.post.element}</li>
            <li><strong>Date/Time:</strong> {this.props.post.date}</li>
            <li><strong>Address:</strong> {this.props.post.address}</li>
            <li><strong>Difficulty:</strong> {this.props.post.difficulty}</li> 
            <li><strong>Scope:</strong> {this.props.post.scope}</li> 
         </ul>
       );
   }  
});

var Interact = React.createClass({
   render: function () {
       return (
           <div>
                <Thumbs post={this.props.post} thumb={this.props.thumb} />
                <Views post={this.props.post} />
                <Comments post={this.props.post} postID={this.props.postID} update={this.props.update} comments={this.props.comments} />
           </div>
       );
   }  
});

var Views = React.createClass({
    render: function () {
        return (
          <div className="views">
            <i className="fa fa-eye fa-2x" />
            <div>{this.props.post.views} views</div>
         </div>
        );
    }    
});

var Thumbs = React.createClass({
   componentDidMount: function () {
     var self = this;
     thumbs.on('returnSingle', function (data) {
         if (data) {
             self.props.update({thumb: data.positive});
         }
     });
     thumbs.single(this.props.post.id);
   },
   like: function () {
       var model = {};
       model.post_id = this.props.post.id;
       model.positive = 1;
       console.log(model);
       thumbs.add(model);
   },
   dislike: function () {
       var model = {};
       model.post_id = this.props.post.id;
       model.positive = 0;
       console.log(model);
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
       return (  
          <div className="thumb">
            <p>You have decided you {current} this post. Click the button below to change your mind.</p>
            {icon}
            <div>
                <button className="button green small" onClick={this.like}><i className="fa fa-2x fa-thumbs-o-up" /></button>
                <button className="button red small" onClick={this.dislike}><i className="fa fa-2x fa-thumbs-o-down" /></button>
                {this.props.post.positive} / {this.props.post.thumbs}
                <em className="{c}">({this.props.popularity}% popularity)</em>
            </div>
          </div>
       );
   } 
});

var Comments = React.createClass({
    add: function () {
        var model = {};
        model.content = this.refs.comment.getDOMNode().value;
        model.post_id = this.props.postID;
        comments.add(model);
    },
    componentDidMount: function () {
         var self = this;
         comments.on('returnAdd', function (data) {
             console.log(data);
         });         
    },
    render: function () {
          var pic = "You must be logged-in to comment";
          var token = null;
          if (token === null) { 
            //pic = <a href="#user/{this.props.id}"><img src="{this.props.pic}" width="100"></a>
          }
        var data = this.props.comments.rows;
		var comments = [];
		if (data) {
		    console.log(data);
            comments= data.map(function (item, i) {
    		   var user = {id: 1, first: "JESSE", last: "drelick", influence: 66, username: "jdrelick", pic: ""};
    		   return <Comment key={item.id} comment={item} user={user} />;
    		});
		}
        return (
            <div>
                <h2 className="comments">
                    <i className="fa fa-comments" /> Comments
                </h2>
                <div id="comments">{comments}</div>
                <div className="create">
                    <div className="pic">{pic}</div>
                    <textarea ref="comment" placeholder="Comment goes here"></textarea>
                    <button className="button green add" onClick={this.add}>Post Comment</button>
                </div>
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
           <div className="item" id="{this.props.id}">
              <div className="pic">
                <a href="#user/{this.props.user.id}">
                    <img src="{this.props.user.pic}" width="100" onerror="this.src='/assets/pics/default.png'" />
                </a>
                <a href="#user/{this.props.user.id}" className="username">
                    {this.props.user.username} ({this.props.user.influence})
                </a>
              </div>
              <div className="comment">
                <span className="date">{this.props.date}</span>
                <span>{this.props.comment.content}</span>
                {textarea}
              </div>
              <div className="actions"></div>
            </div>
       );       
   } 
});
module.exports = Post;