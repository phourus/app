/** @jsx React.DOM */
"use strict";
var React = require('react');

var Sidebar = React.createClass({
     componentDidMount: function () {       
         var token = 1;
         var type = 'org';
         var page = 'profile';
     },
     render: function () {
          // guest
          if (token === 0){
              return (<Guest />);
          }
          return (
            <Account />
          );
     }
});

/** GUEST **/
var Guest = React.createClass({
    render: function () {
        return (
            <div>
                <div>
                  <div class="title">Login</div>
                  <p>Login below to access your Phourus account</p>
                  <div class="auth"></div>
                </div>
                <div>
                  <div class="title">Signup</div>
                  <p>Sign up now to get full access to Phourus</p>
                  <a href="#!signup" class="button blue">Signup Now</a>
                </div>
            </div>
        );
    }
});

/** ACCOUNT **/
var Account = React.createClass({
    render: function () {
        return (
            <div>
                <div>
                  <div class="title">
                    <i class="fa fa-tachometer" />
                    {this.props.first} {this.props.last}
                  </div>
                  <a href="/account" id="{user.id}" class="profile">
                    <img src="/assets/pics/users/{this.props.id}.{this.props.img}" onerror="this.src='/assets/pics/default.png'" height="120" />
                  </a>
                  <ul class="user">
                    {this.props.address.city}
                    {this.props.address.state}
                    <li>
                      <a href="#account" id={this.props.id}>My Account</a>
                    </li>
                    <li>
                      <a href="#user/{{user.id}}" class="me">My Posts</a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" class="logout">Logout</a>
                    </li>
                  </ul>
                  <a href="#add/blogs" class="button blue">Create Post</a>
                  <br clear="all" /><br />
                </div>
                <Notifications />
                <History />
            </div>
        );
    }
});            
var Notifications = React.createClass({
    render: function () {
        return (
            <div>
              <h3><i class="fa fa-bell" />Activity</h3>
              <ul id="notifications"></ul>
              <a href="#!notifications" class="button red">Notifications</a>
              <br clear="all" /><br />
            </div>
        );
    }
});

var History = React.createClass({
    render: function () {
        return (
            <div>
              <h3><i class="fa fa-history" /> History</h3>
              <ul id="history"></ul>
              <a href="#!history" class="button green">History</a>
              <br clear="all" /><br />
            </div> 
        );
    }
});

/** PROFILE **/
var Profile = React.createClass({
    render: function(){
        return (
            <div>
                <div>
                    <div>
                      <div class="org">{this.props.name}</div>
                      <a href="/profile/{{this.props.id}}" id="{{this.props.id}}" class="profile"><img src="/assets/pics/users/{{this.props.id}}.{{this.props.img}}" onerror="this.src='/assets/pics/default.png'" height="120" /></a>
                      <ul id="user">
                          <li>{this.props.city} {this.props.state}</li>
                          <li>{this.props.type}</li>
                          <li>{this.props.members}</li>
                           <li>{this.props.website}</li>
                      </ul>
                      <br clear="all" /><br />
                    </div>
                    <Stats />
                    <Membership />
                </div>
                <div>
                  <h3 class="user">{user.first } {user.last }</h3>
                  <a href="#user/{user.id }" id="{user.id}" class="profile"><img src="/assets/pics/users/{user.id }.{user.img }" onerror="this.src='/assets/pics/default.png'" height="120" /></a>
                  <ul id="user">
                      <li>
                        {this.props.address.city } {this.props.address.state}
                      </li>
                    <li>
                      {this.props.occupation}
                    </li>
                    <li>
                      {this.props.company}
                    </li>
                    <li>
                      {this.props.website}
                      <a href="http://{{this.props.website}}" target="_blank">{this.props.website}</a>
                    </li>
                  </ul>
                  <a href="#add/blogs" class="button blue">Create Post</a>
                  <br clear="all" /><br />
                </div>
                <AuthorStats />
                <AuthorGroups />
            </div>
        );
    }

});
var Stats = React.createClass({
    render: function () {
        return (
             <div>
                 <div>
                  <h3 class="stats">Stats</h3>
                  <ul id="stats">
                    <li><strong>Views:</strong> {stats.views }</li>
                    <li><strong>Comments:</strong> {stats.comments }</li>
                    <li><strong>Posts:</strong> {stats.posts }</li>
                    <li><strong>Avg Post:</strong> {stats.avg_post }</li>
                    <li><strong>Members:</strong> {stats.members }</li>
                    <li><strong>Thumbs:</strong> {stats.positive } / {stats.thumbs } ({stats.popularity }% positive)</li>
                  </ul>
                  <br clear="all" /><br />
                </div>
                            <div>
                  <h3 class="stats">Stats</h3>
                  <ul id="stats">
                    <li><strong>Views:</strong> {stats.views }</li>
                    <li><strong>Comments:</strong> {stats.comments }</li>
                    <li><strong>Followers:</strong> {stats.followers.total }</li>
                    <li><strong>Avg Follower:</strong> {stats.followers.average }</li>
                    <li><strong>Thumbs:</strong> {stats.positive } / {stats.thumbs } ({stats.popularity }% positive)</li>
                  </ul>
                  <br clear="all" /><br />
                </div>
            </div>
        );
    }
});
var Membership = React.createClass({
    render: function () {
        return (
            <div>
                <div>
                  <h3 class="membership">Membership</h3>
                  <p>To become a Member of this Org, click "Join Org" below</p>
                  <a href="#" class="button green">Join Org</a>
                  <br clear="all" /><br />
                </div>
                            <div>
                  <h3 class="favorite">Favorite</h3>
                  <p>Click "Add to Favorites" below to add this user to your Favorites list</p>
                  <a href="#" class="button green">Add to Favorites</a>
                  <br clear="all" /><br />
                </div>
            </div>
        );
    }
});

module.exports = Sidebar;