"use strict";
/** POST **/
// Post, Author

/** INTERACT **/
// Views, Comments, Likes
if (typeof module !== 'undefined' && module.exports) {
    var React = require('react');
}
/**
* @jsx React.DOM
*/
var Post = React.createClass({
     getDefaultProps: function () {
         return {
             post: {
                 title: "My first Phourus post",
                 created: "2 weeks ago",
                 influence: 65,
                 element: 'voice',
                 scope: 'local',
                 type: 'debate'      
             },

             user: {
                 first: "Jesse",
                 last: "Drelick" 
             },
             
             stats: {
                 influence: 62,
             }
         }
     },
     render: function () {
          return (
            <div>
                <h1>{this.props.post.title}</h1>
                <div class="basic">
                  <h3>By {this.props.user.first} {this.props.user.last}</h3>
                  <span class="created">{this.props.created}</span>
                  <div class="type">{this.props.post.type}</div>
                </div>
                <Details post={this.props.post} />
                <Stats stats={this.props.stats} />
                <div>{this.props.post.content}</div>
                <Interact stats={this.props.stats} />
            </div>
          );
     }
});

var Details = React.createClass({
   render: function () {
       return (
         <ul class="detail">
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
               <div class="influence">{this.props.stats.influence}</div>
               <i class="fa fa-2x fa-bell" /> 
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
                <Comments stats={this.props.stats} />
           </div>
       );
   }  
});

var Views = React.createClass({
    render: function () {
        return (
          <div class="views">
            <i class="fa fa-eye fa-2x" />
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
         <i class="fa fa-plus fa-2x" />
       } else if (this.props.stats.popularity < 50) { 
         c = 'negative'; 
         <i class="fa fa-minus fa-2x" />
       } 
       if (this.props.stats.positive === 1) {
           current = 'like';
       } else if (this.props.stats.positive === 0) {
           current = 'dislike';
       }
       return (  
          <div class="thumb">
            <p>You have decided you {current} this post. Click the button below to change your mind.</p>
            {icon}
            <div>
                {this.props.stats.positive} / {this.props.stats.thumbs}
                <em class="{c}">({this.props.popularity}% popularity)</em>
            </div>
          </div>
       );
   } 
});

var Comments = React.createClass({
    render: function () {
          var pic = "You must be logged-in to comment";
          var token = null;
          if (token === null) { 
            //pic = <a href="#user/{this.props.id}"><img src="{this.props.pic}" width="100"></a>
          }
        return (
            <div>
                <h2 class="comments">
                    <i class="fa fa-comments" /> Comments
                </h2>
                <div id="comments"></div>
                <div class="create">
                    <div class="pic">{pic}</div>
                    <textarea placeholder="Comment goes here"></textarea>
                    <button class="button green add">Post Comment</button>
                </div>
            </div>
        );
    }
});

var Comment = React.createClass({
   render: function () {
       var textarea = '';
       if (owner === true) {
           //textarea =   <textarea>{this.props.id}</textarea>
           /* actions = 
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
            */
       }
       return (
           <div class="item" id="{this.props.id}">
              <div class="pic">
                <a href="#user/{this.props.user.id}">
                    <img src="{this.props.pic}" width="100" onerror="this.src='/assets/pics/default.png'" />
                </a>
                <a href="#user/{this.props.user.id}" class="username">
                    {this.props.user.username} ({this.props.user.influence})
                </a>
              </div>
              <div class="comment">
                <span class="date">{this.props.date}</span>
                <span>{this.props.comment}</span>
                {textarea}
              </div>
              <div class="actions">{actions}</div>
            </div>
       );       
   } 
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Post;
} else{
    var cnt = document.getElementById('content');
    React.renderComponent(Post({}), cnt);
}
