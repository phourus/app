let Map = {
	map: {},
    markers: [],
	windows: [],
	clusters: [],
	geocoder: {},
	container: '#map',
	config: {
		zoom: 4,
		x: 38,
		y: -95
    },
	init: function () {
    	this.geocoder = new google.maps.geocode();
    	this.config.center = new google.maps.LatLng(this.x, this.y);
    	this.config.mapTypeId = google.maps.MapTypeId.ROADMAP;
        this.map = new google.maps.Map($(this.container)[0], this.config);
	},
    render: function (data) {
        for (let i = 0, l = data.length; i < l; i++) {
    	    this.createMarker(data[i].id, data[i].title, data[i].address);
	    }
	    this.clusterize();
	},
	go: function (location) {
	  this.geocoder.geocode({'address': location}, function(results, status){
		if (status == 'OK') {
			let loc = results[0].geometry.location;
		  this.map.setZoom(6);
		  this.map.panTo(loc);
		} else {
		  console.log("Geocode was not successful for the following reason: " + status);
		}
	  });
	},
    createMarker: function (key, title, address) {
	  this.geocoder.geocode({'address': address}, function (results, status) {
		if (status == 'OK') {
			let loc = results[0].geometry.location;
			let data = {
    		  lat: loc.d,
    		  lng: loc.e
		  };

			  let pos = new google.maps.LatLng(data.lat, data.lng);
				let point = {
    		position: pos,
    		map: this.map,
    		//icon: image,
    		title: title
    	  }

          this.markers[key] = new google.maps.Marker(point);
    	  //let html = _.template(tWindow, {address: data.address, org: data.org, pic: self.pic});
    	  this.windows[key] = new google.maps.InfoWindow({content: ''});
				let cntx = this;
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
			this.clusters = new MarkerClusterer(this.map, this.markers);
	   } catch(error) {
		   console.log(error);
	   }
	}
}
module.exports = Map;
