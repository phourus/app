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
	 getDefaultProps: function () {
		return {
			posts: []  
		};	
	 },
	 update: function (obj) {
		 this.setProps(obj);
	 },
	 componentDidMount: function () {
    	 Map.render();
	 },
	 render: function () {
		  return (
			<div className="search">
				<input ref="term" type="text" placeholder="search for" />
				<button class="button green" id="search"><i class="fa fa-search" /></button>
				<h2>Narrow your search</h2>
				<div id="map"></div>
				<Groups />
				<Filter />
				<Types />
				<Posts update={this.update} posts={this.props.posts} />
				<Pagination />
			</div>
		  )
	 }
});

var Map = {
	map: {},
    markers: [],
	windows: [],
	clusters: [],
	init: [
	    {id: 1, title: "Jesse", address: "100 White Cap Lane"}
	],
	//geocoder: new google.maps.Geocoder(),
	config: {
		zoom: 4,
		center: new google.maps.LatLng(38, -95),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	},
	/*
	go: function (location) {
	  this.geocoder.geocode({'address': location}, function(results, status){
		if (status == 'OK') {
		  var loc = results[0].geometry.location;
		  this.map.setZoom(6);
		  this.map.panTo(loc);
		} else {
		  console.log("Geocode was not successful for the following reason: " + status);
		}
	  }); 
	},	 
	update: function (data) { 
	    for (var i = 0, l = data.length; i < l; i++) {
    	    this.createMarker(data[i].id, data[i].title, data[i].address);
	    }
	    this.clusterize();
	},
    createMarker: function (key, title, address) {
	  this.geocoder.geocode({'address': address}, function (results, status) {
		if (status == 'OK') {
		  var loc = results[0].geometry.location;
		  var data = {
    		  lat: loc.d,
    		  lng: loc.e
		  };
		  
    	  var pos = new google.maps.LatLng(data.lat, data.lng);
    	  var point = {
    		position: pos,
    		map: this.map,
    		//icon: image,
    		title: title
    	  }
	  
          this.markers[key] = new google.maps.Marker(point);
    	  //var html = _.template(tWindow, {address: data.address, org: data.org, pic: self.pic});
    	  this.windows[key] = new google.maps.InfoWindow({content: ''});
    	  var cntx = this;
    	  google.maps.event.addListener(this.markers[key], 'click', function (event) {
              cntx.map.panTo(event.latLng);
    		  cntx.map.setZoom(10);
    		  cntx.windows[key].open(map, cntx.markers[key]); 	  
    	  }); 
					   
		} else {
		  console.log("Geocode was not successful for the following reason: " + status);
		  console.log(key, title, address);
        }
	  });
	},
	clusterize: function () {
		   try {
				this.clusters = new MarkerClusterer(this.map, this.markers)
		   } catch(error) {
			   console.log(error);
		   }
	},
	// This function is responsible for listening to location & profile filters, and plot users/orgs meeting criteria on map
	componentWillReceiveProps: function () {
        /*$.ajax({
            url: "/rest/profiles?distance=50&lat=1232.43&lng=44343.32",
            success: this.update        
        });	*
	},	 */
	render: function () {
	    console.log(this.config);
		this.map = new google.maps.Map($("#map"), this.config);
		//this.update(this.init);
	}
}

var Groups = React.createClass({
	render: function () {
		return (
			<div className="groups">Groups</div>
		);
	}	
});

var Filter = React.createClass({
	render: function () {
		return (
			<div className="filter">
			  <div className="sort">
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
			  <div className="dates">
				<label>Start:</label>
				<select>
				  <option>January</option>
				</select>
				<select className="date">
					<option>1</option>
				</select>
				<select>
					<option>2014</option>
				</select>
				<label>End:</label>
				<select>
					<option>January</option>
				</select>
				<select className="date">
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
			<div className="types">
			  <h3>Filter by:</h3>
			  <div>
				  <button class="button green" id="blogs"><i class="fa fa-laptop" /> Blogs</button>
				  <button class="button green" id="events"><i class="fa fa-calendar" /> Events</button>
				  <button class="button blue" id="subjects"><i class="fa fa-puzzle-piece" /> Subjects</button>
				  <button class="button blue" id="questions"><i class="fa fa-question" />Questions</button>
				  <button class="button red" id="debates"><i class="fa fa-bullhorn" />Debates</button>
				  <button class="button red" id="bills"><i class="fa fa-line-chart" />Bills</button>
				  <button class="button orange" id="beliefs"><i class="fa fa-road" />Paths</button>
				  <button class="button orange" id="quotes"><i class="fa fa-quote-right" />Quotes</button>
			  </div>
			</div>
		);
	}	 
});

var Pagination = React.createClass({
	render: function () {
		return (
			<div className="pagination">
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
	componentDidMount: function () {
		var update = this.props.update;
		$.ajax({
			url: "/rest/posts",
			dataType: "json",
			success: function (data) {
				update({posts: data});
			},
			error: function (err) {
				console.log(err);
			}
		});		
	},
	render: function () {
		var data = this.props.posts;
		var list = data.map(function (item, i) {
		   return <PostItem key={item.id} post={item.post} meta={item.meta} address={item.address} user={item.user} stats={item.stats} />;
		});
		return (
			<div className="posts">{list}</div>
		);
	}	 
});
/*
					<li><strong>Positive:</strong> {this.props.meta.positive}</li>
					<li><strong>Category:</strong> {this.props.meta.category}</li>
					<li><strong>Element:</strong> {this.props.meta.element}</li> 
					<li><strong>Date/Time:</strong> {this.props.post.date}</li>
					<li><strong>Address:</strong> {this.props.address.city}</li>
					<li><strong>Difficulty:</strong> {this.props.meta.difficulty}</li> 
					<li><strong>Scope:</strong> {this.props.meta.scope}</li>*/
var PostItem = React.createClass({
	render: function () {
		var meta = [];
		
		for (var i = 0, keys = Object.keys(this.props.meta); i < keys.length; i++) {
			var key = keys[i];
			var value = this.props.meta[keys[i]];
			if (['content', 'date', 'title', 'post_id'].indexOf(key) === -1) {
				meta.push(<li>{key}: {value}</li>);
			}
			
		}
		return (
			<div className="postItem">
				<h2>{this.props.meta.title}</h2>
				<div className="type fa fa-bell">{this.props.post.type}</div>
				<div className="pic">
					<img src="/assets/logos/logo-new.png" />
				</div>
				<div className="basic">
				  <h3>By {this.props.user.user.first} {this.props.user.user.last}</h3>
				  <span class="created">{this.props.post.created}</span>
				</div>
				<div className="detail">
				  <ul>
					{meta}
				  </ul> 
				</div>
				<div className="stats">
				  <div class="influence">{this.props.stats.influence}</div>
				  <li>Views: {this.props.stats.views}</li>
				  <li>Comments: {this.props.stats.comments}</li>
				  <li>Popularity: {this.props.stats.thumbs}</li>
				</div>
				<div className="content">{this.props.post.content}</div>
			</div>
		);
	}	 
});


if (typeof module !== 'undefined' && module.exports) {
	module.exports = Search;
} else{
	var cnt = document.getElementById('content');
	React.renderComponent(Search({}), cnt);
}
