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
     render: function () {
          return (
            <div>
                <h1>{this.props.title}</h1>
                <div class="basic">
                  <h3>By {this.user.first} {this.user.last}</h3>
                  <span class="created">{moment(this.props.created)}</span>
                </div>
                <Details />
                <Stats />
                <div>{this.props.content}</div>
                <Interact />
            </div>
          );
     }
});

var Details = React.createClass({
   render: function () {
       return (
         <ul class="detail">
            <li><strong>Positive:</strong> {this.props.positive}</li>
            <li><strong>Category:</strong> {this.props.category}</li>
            <li><strong>Element:</strong> {this.props.element}</li>
            <li><strong>Date/Time:</strong> {this.props.date}</li>
            <li><strong>Address:</strong> {this.props.address}</li>
            <li><strong>Difficulty:</strong> {this.props.difficulty}</li> 
            <li><strong>Scope:</strong> {this.props.scope}</li> 
         </ul>
       );
   }  
});

var Stats = React.createClass({
   render: function () {
       return (
           <div>
               <div class="influence">{this.props.influence}</div>
               <i class="fa fa-2x fa-bell" /> 
               <div class="type">{this.props.type}</div>
           </div>
       );
   }  
});

var Interact = React.createClass({
   render: function () {
       return (
           <div>
                <Thumbs />
                <Views />
                <Comments />
           </div>
       );
   }  
});

var Views = React.createClass({
    render: function () {
        return (
          <div class="views">
            <i class="fa fa-eye fa-2x" />
            <div>{this.props.views} views</div>
         </div>
        );
    }    
});

var Thumbs = React.createClass({
   render: function () {
       var c = ''; 
       var current = '';
       if(this.props.popularity > 50){ 
         c = 'positive'; 
         <i class="fa fa-plus fa-2x" />
       } else if (this.props.popularity < 50) { 
         c = 'negative'; 
         <i class="fa fa-minus fa-2x" />
       } 
       if (this.props.positive === 1) {
           current = 'like';
       } else if (this.props.positive === 0) {
           current = 'dislike';
       }
       return (  
          <div class="thumb">
            <p>You have decided you {current} this post. Click the button below to change your mind.</p>
            {icon}
            <div>
                {this.props.positive} / {this.props.thumbs}
                <em class="{c}">({this.props.popularity}% popularity)</em>
            </div>
          </div>
       );
   } 
});

var Comments = React.createClass({
    render: function () {
          var pic = "You must be logged-in to comment";
          if (user) { 
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
