var actions = {
    posts: {
        single: function (id) {
            $.ajax({
    			url: "/rest/post/" + id,
    			method: "GET",
    			dataType: "json",
    			success: function (data) {
    				update({posts: data});
    			},
    			error: function (err) {
    				console.log(err);
    			}
    		});
        },
        collection: function (params) {
            var query;
            var params = 'search=' + params.search;
            params += '&page=' + params.page;
            params += '&limit=' + params.limit;
            params += '&sort=' + params.sort;
            params += '&direction=' + params.direction;
            params += '&types=blogs;events;subjects;questions;debates;bills;beliefs;timeline;quotes';
            params += '&mode=phourus';
            params += '&org_id=0';
            params += '&user_id=0';
        
            props.query = params;
            $.ajax({
    			url: "/rest/post/" + query,
    			method: "GET",
    			dataType: "json",
    			success: function (data) {
    				update({posts: data});
    			},
    			error: function (err) {
    				console.log(err);
    			}
    		});  
        },
        create: function (model) {
            $.ajax({
    			url: "/rest/post",
    			method: "POST",
    			dataType: "json",
    			success: function (data) {
    				update({posts: data});
    			},
    			error: function (err) {
    				console.log(err);
    			}
    		});
        },
        update: function (id, model) {
            $.ajax({
    			url: "/rest/post/" + this.props.id,
    			method: "PUT",
    			dataType: "json",
    			success: function (data) {
    				update({posts: data});
    			},
    			error: function (err) {
    				console.log(err);
    			}
    		});  
        },
        remove: function (id) {
            
        }
    },
    users: {
        single: function (id) {
            
        },
        collection: function (params) {
            
        }
    },
    orgs: {
        single: function (id) {
            
        },
        collection: function (params) {
            
        },
        create: function (model) {
            
        },
        update: function (id, model) {
            
        },
        remove: function (id) {
            
        }
    },
    address: {
        
    },
    account: {
        get: function (model) {
            
        },
        create: function (model) {
            
        },
        update: function (id, model) {
            
        },
        remove: function (id) {
            
        }
    },
        
};

module.exports = actions;