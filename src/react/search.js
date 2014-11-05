"use strict";
if (typeof module !== 'undefined' && module.exports) {
    var React = require('react');
}
/** MAP **/
// Location filter, overlays

/** FILTERS **/
// Groups, Types, Sort, Search, Pagination

/** STREAM **/
// iPost
/**
* @jsx React.DOM
*/
var Search = React.createClass({
     render: function () {
          return (
            <div>
                <input ref="term" type="text" placeholder="search for" />
                <button class="button green" id="search"><i class="fa fa-search" /></button>
                <h2>Narrow your search</h2>
                <Map />
                <Groups />
                <Filter />
                <Types />
                <Posts />
                <Pagination />
            </div>
          )
     }
});

var Map = React.createClass({
    render: function () {
        return (
            <div>Map</div>
        );
    }
});

var Groups = React.createClass({
    render: function () {
        return (
            <div>Groups</div>
        );
    }   
});

var Filter = React.createClass({
    render: function () {
        return (
            <div>
              <div id="sort_by">
              	<h3>Sort by:</h3>
                  <select id="sort">
                      <option value="influence">Influence</option>
                      <option value="comments">Comments</option>
                      <option value="thumbs">Thumbs</option>
                      <option value="views">Views</option>
                  </select>
                  <select id="direction">
                      <option value="DESC">High to Low</option>
                      <option value="ASC">Low to High</option>
                  </select>
              </div>
              <div id="dates">
              	<label for="start">Start:</label>
              	<select>
              	  <option>January</option>
                </select>
                <select>
                    <option>1</option>
                </select>
                <select>
                    <option>2014</option>
                </select>
                End: 
                <select>
                    <option>January</option>
                </select>
                <select>
                    <option>1</option>
                </select>
                <select>
                    <option>2015</option>
                </select>
              </div>
            </div>
        );
    }    
});

var Types = React.createClass({
    render: function () {
        return (
            <div>
              <h3>Filter by:</h3>
              <div class="types">
                <div>
                  <button class="button green" id="blogs"><i class="fa fa-laptop" /> Blogs</button>
                  <button class="button green" id="events"><i class="fa fa-calendar" /> Events</button>
                </div>
                <div>
                  <button class="button blue" id="subjects"><i class="fa fa-puzzle-piece" /> Subjects</button>
                  <button class="button blue" id="questions"><i class="fa fa-question" />Questions</button>
                </div>
                <div>
                  <button class="button red" id="debates"><i class="fa fa-bullhorn" />Debates</button>
                  <button class="button red" id="bills"><i class="fa fa-line-chart" />Bills</button>
                </div>
                <div>
                  <button class="button orange" id="beliefs"><i class="fa fa-road" />Paths</button>
                  <button class="button orange" id="quotes"><i class="fa fa-quote-right" />Quotes</button>
                </div>
              </div>
            </div>
        );
    }    
});

var Pagination = React.createClass({
    render: function () {
        return (
            <div>
                <a href="javascript:void(0)" ref="prev" class="fa fa-backward fa-3x"></a>
                <div class="viewing"></div>
                <div class="totals"></div>
                <a href="javascript:void(0)" ref="next" class="fa fa-forward fa-3x"></a>
            </div>
        );
    }    
});

/** POSTS **/
var Posts = React.createClass({
    render: function () {
        return (
            <div></div>
        );
    }    
});

var PostItem = React.createClass({
    render: function () {
        return (
            <div>
                <div class="stats">
                  <div class="influence">{this.props.influence}</div>
                  <img src="/assets/icons/{this.props.type}.png" class="icon" /> 
                <div class="type">{this.props.type}</div>
                  <ul class="detail">
                  	<li><strong>Positive:</strong> {this.props.positive}</li>
                  	<li><strong>Category:</strong> {this.meta.category}</li>
                  	<li><strong>Element:</strong> {this.props.element}</li> 
                  	<li><strong>Date/Time:</strong> {this.props.date}</li>
                  	<li><strong>Address:</strong> {this.props.address}</li>
                  	<li><strong>Difficulty:</strong> {this.props.difficulty}</li> 
                  	<li><strong>Scope:</strong> {this.props.scope}</li>
                  </ul> 
                </div>
                <div class="basic">
                  <h2>{this.props.title}</h2>
                  <h3>By {this.props.user.first} {this.props.user.last}</h3>
                  <span class="created">{this.props.created}</span>
                </div>
                <div style="text-align: justify;">{this.props.content}</div>
                <div className="interact"></div>
            </div>
        );
    }    
});


if (typeof module !== 'undefined' && module.exports) {
    module.exports = Home;
} else{
    var cnt = document.getElementById('content');
    React.renderComponent(Home({}), cnt);
}
