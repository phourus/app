"use strict";
let React = require('react');
let Router = require('react-router');
let ga = require('../../analytics');

let Store = require('../../stores/post/thumbs');
let Actions = require('../../actions/post/thumbs');

let Thumbs = React.createClass({
   getDefaultProps: function () {
     return {
       post: {}
     };
   },
	 getInitialState: function () {
		 return {
			 id: null,
			 positive: null
		 }
	 },
   componentDidMount: function () {
     let params = this.getParams();
     this.unsubscribe = Store.listen((data) => {
			 this.setState(data);
     });
     Actions.post(params.id);
   },
   componentWillUnmount: function () {
     this.unsubscribe();
   },
   render: function () {
		 let classLike = "button up medium";
		 let classDislike = "button down medium";
     if (this.state.positive === true) {
       classLike += ' selected';
     } else if (this.state.positive === false) {
       classDislike += ' selected';
     }
     // <p>You have decided you {current} this post. Click the button below to change your mind.</p>
     return (
        <div className="thumb">
          <div className="buttons">
            <button className={classLike} onClick={this.state.positive === true ? this._remove : this._like}><i className="fa fa-angle-up" /> <span className="total"> Like</span></button>
            <button className={classDislike} onClick={this.state.positive === false ? this._remove: this._dislike}><i className="fa fa-angle-down" /> <span className="total"> Dislike</span></button>
          </div>
        </div>
     );
   },
	 _like: function () {
		 let model = {
			 positive: 1
		 };
		 if (this.state.id) {
			 Actions.save(this.state.id, model);
       ga('send', 'event', 'engagement', 'changevote');
		 } else {
			 model.postId = this.props.post.id;
			 Actions.add(model);
       ga('send', 'event', 'engagement', 'upvote');
		 }
	 },
	 _dislike: function () {
		 let model = {
			 positive: 0
		 };
			if (this.state.id) {
				Actions.save(this.state.id, model);
        ga('send', 'event', 'engagement', 'changevote');
			} else {
				model.postId = this.props.post.id;
				Actions.add(model);
        ga('send', 'event', 'engagement', 'downvote');
			}
	 },
	 _remove: function () {
		 Actions.remove(this.state.id);
     ga('send', 'event', 'engagement', 'unvote');
	 }
});

module.exports = Thumbs;
