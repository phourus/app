/** @jsx React.DOM */
"use strict";
var React = require('react');
var posts = require('../objects/posts');
var comments = require('../objects/comments');

/** POST **/
// Post, Author

/** INTERACT **/
// Views, Comments, Likes
var Post = React.createClass({
     getDefaultProps: function () {
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
                 first: "",
                 last: "" 
             },
             
             stats: {
                 influence: null
             },
             
             comments: []
         }
     },
     update: function (obj) {
        this.setProps(obj);  
     },
     componentDidMount: function () {         
         var self = this;
         posts.on('returnSingle', function (data) {
             self.setProps({post: data}, function () {
                 comments.collection({post_id: data.id});
             });
         });
         comments.on('returnCollection', function (data) {
             self.update({comments: data});
         });
         posts.single(this.props.id);
     },
     render: function () {
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
                <Stats stats={this.props.stats} />
                <div>{this.props.post.content}</div>
                <Interact stats={this.props.stats} postID={this.props.post.id} update={this.update} comments={this.props.comments} />
            </div>
          );
     }
});

var Details = React.createClass({
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

var Stats = React.createClass({
   render: function () {
       return (
           <div>
               <div className="influence">{this.props.stats.influence}</div>
               <i className="fa fa-2x fa-bell" /> 
           </div>
       );
   }  
});

var Interact = React.createClass({
   render: function () {
       return (
           <div>
                <Thumbs stats={this.props.stats} />
                <Views stats={this.props.stats} />
                <Comments stats={this.props.stats} postID={this.props.postID} update={this.props.update} comments={this.props.comments} />
           </div>
       );
   }  
});

var Views = React.createClass({
    render: function () {
        return (
          <div className="views">
            <i className="fa fa-eye fa-2x" />
            <div>{this.props.stats.views} views</div>
         </div>
        );
    }    
});

var Thumbs = React.createClass({
   render: function () {
       var c = ''; 
       var current = '';
       var icon = '';
       if(this.props.stats.popularity > 50){ 
         c = 'positive'; 
         <i className="fa fa-plus fa-2x" />
       } else if (this.props.stats.popularity < 50) { 
         c = 'negative'; 
         <i className="fa fa-minus fa-2x" />
       } 
       if (this.props.stats.positive === 1) {
           current = 'like';
       } else if (this.props.stats.positive === 0) {
           current = 'dislike';
       }
       return (  
          <div className="thumb">
            <p>You have decided you {current} this post. Click the button below to change your mind.</p>
            {icon}
            <div>
                {this.props.stats.positive} / {this.props.stats.thumbs}
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