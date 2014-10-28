module.exports = function(){
    
    var router = Backbone.Router.extend({
    
        appRoutes: {
          "!stream": "stream",
          "!post/:id": "post",
          "add/:type": "add",
          "edit/:id": "edit",
          "profile/:id": "profile",
          "profile/:id/:page": "profile",
          "!home": "homepage",
          "!about": "about",
          "!help": "help",
          "!contact": "contact",
          "terms": "terms",
          "privacy": "privacy",
          "!signup": "signup",
          "account": "account",
          "user/:id": "user",
          "!history": "history",
          "!notifications": "notifications",
          "": "homepage"
          ":page": "page",
        }
    });
    var session = Backbone.Model.extend({

    });
    var sidebar = Backbone.View.extend({
        el: "#sidebar",
        
        render: function(){
            var params = {};
            LazyLoad.js('react/sidebar.js', function(){
                React.renderComponent(new Sidebar(params), this.el);
            });
        }
    });
    var content = Backbone.View.extend({
        el: "#content",
        
        initialize: (options){
            this.render(component, params);
        }
        render: function(component, params){

            LazyLoad.js('react/sidebar.js', function(){
                var Component = figureOutHowToUseReflectionOrSomethingLikeThatToGetRootComponentOfLoadedJSFileBecauseLazyLoadDoesNotExportValues(component);
                React.renderComponent(new Component(params), this.el);
            });
        }
    });
}    