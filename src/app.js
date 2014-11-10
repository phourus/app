//page('', landing);
page.base('/');
page('search', search);
page('post/:id', post);
page('account', account);
page('editor', editor);
page('editor/:id', editor);
page('profile/*', profile);
page('game', game);
//page('*', general);
page();
    
function landing () {
    console.log('landing');  
}

function search () {
    console.log('search');
    /*LazyLoad.js('react/search.js', function(){
        React.renderComponent(new Search(params), document.getElementById('content'));
    });*/    
}

function post (ctx) {
    var id = ctx.params[0];
    console.log('post %s', id);    
}

function account () {
    console.log('account');    
}

function editor (ctx) {
    var id = ctx.params[0];
    console.log('editor %s', id);    
}

function profile (ctx) {
    var id = ctx.params[0];
    var widget = ctx.params[1];
    console.log('profile %s %s', id, widget);
}

function game (ctx) {
    var page = ctx.params[0];
    console.log('game');
}

function general (ctx) {
    var page = ctx.params[0];
    console.log('general %s', page);
}


var Session = function () {
    
}

var Map = {
	map: {},
    markers: [],
	windows: [],
	clusters: [],
	init: [
	    {id: 1, title: "Jesse", address: "100 White Cap Lane"}
	],
	//geocoder: new google.maps.Geocoder(),
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
	   var config = {
		zoom: 4,
		center: new google.maps.LatLng(38, -95),
		mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var cnt = $("#map");
		new google.maps.Map(cnt[0], config);
		//this.update(this.init);
	}
}		