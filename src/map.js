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

module.exports = Map;