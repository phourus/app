/** MAP **/
// Location filter, overlays

/** FILTERS **/
// Groups, Types, Sort, Search, Pagination

/** STREAM **/
// iPost
/**
* @jsx React.DOM
*/
var Stream = React.createClass({
     getDefaultProps: function(){
         return {
             posts: [],
             source: "http://localhost:4444/posts/?exclude=blogs&exclude=debates&exclude=subjects&limit=20&direction=ASC&sort=user_id"
         };
     },
     componentDidMount: function() {      
       $.ajax({
            type: 'GET',
            url: this.props.source,
            success: function(data) {
               if (this.isMounted()) {
                console.log(this.props);
                this.props.posts = data;
                this.forceUpdate();
                console.log(this.props);
                }
            }.bind(this)
        });
     },
     render: function() {
          return (
               <div>
                 <streamFilter />
                 <streamTypes />
                 <streamPagination />
                 <streamPosts posts={this.props.posts}/>
               </div>
          );
     }
});

var streamFilter = React.createClass({
     getDefaultProps: function() {
         return {
             sortValue: "influence",
             directionValue: "desc",
             searchValue: ""
         };
     },
     search: function() {
         this.dispatch();
     },
     searchChange: function(e) {
        var value = e.target.value;
        var updated = this.props;
        updated.searchValue = value;
        this.setState(updated);
     },
     sortChange: function(e) {
         var value = e.target.value;
         var updated = this.props;
         updated.sortValue = value;
         this.setState(updated);
         this.dispatch();
     },
     directionChange: function(e) {
         var value = e.target.value;
         var updated = this.props;
         updated.directionValue = value;
         this.setState(updated);
         this.dispatch();
     },
     dispatch: function() {
         console.log(this.props);
     },
     render: function(){
          return (
               <div>
               <input type="text" placeholder="search here" value={this.props.searchValue} onChange={this.searchChange} />
               <button onClick={this.search}>Search</button>
               <select value={this.props.sortValue} onChange={this.sortChange}>
                    <option value="influence">Influence</option>
                    <option value="views">Views</option>
                    <option value="comments">Comments</option>
                    <option value="likes">Likes</option>
                    <option value="date">Date</option>
                    <option value="distance">Distance</option>
               </select>
               <select value={this.props.directionValue} onChange={this.directionChange}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
               </select>
</div>
          );
     }
});
var streamTypes = React.createClass({
                    getDefaultProps: function() {
         return {
             types: {'blogs': 'on', 'events': 'off', 'questions': 'off', 'subjects': 'on', 'debates': 'on', 'bills': 'off', 'paths': 'on', 'quotes': 'off'}
         };
     },
     toggle: function(e) {
         var current = this.props.types;
         var updated = (current[e] == 'off') ? 'on' : 'off';
         current[e] = updated;
         this.setState({types: current});
         this.dispatch();
     },
     dispatch: function() {
         console.log(this.props);
     },
     render: function() {
          return (
              <div>
                  {Object.keys(this.props.types).map(function(value, index, types) {
                    return (
                        <button class={this.props.types[value]} onClick={this.toggle.bind(this, value)} key={value}>{value}</button>
                    );
                  }, this)}
              </div>
          );
     }
});
var streamPagination = React.createClass({
     render: function() {
          return (
              <div>
               <button>Previous</button>
               <button>Next</button>
              </div>
          );
     }
});
var streamPosts = React.createClass({
     render: function() {
          var rows = [];
          console.log(this.props.posts);
          this.props.posts.map(function(item, i, posts){
            rows.push(<iPost post={item} />);
          });
          return (
               <div>{rows}</div>
          );
     }
});
var iPost = React.createClass({
     render: function() {
          return (
               <div>
                   <h2>{this.props.post.Type}</h2>
                   <p>{this.props.post.Privacy}</p>
               </div>
          );
     }
});
React.renderComponent(<Stream/>, document.body);