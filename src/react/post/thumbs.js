"use strict";
let React = require('react');
let Router = require('react-router');
let { State } = Router;

let Store = require('../../stores/post').Thumbs;
let Actions = require('../../actions/post').Thumbs;

let Thumbs = React.createClass({
   mixins: [State],
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
		 let classLike = "button green medium";
		 let classDislike = "button red medium";
     if (this.state.positive === true) {
       classLike += ' selected';
     } else if (this.state.positive === false) {
       classDislike += ' selected';
     }
     // <p>You have decided you {current} this post. Click the button below to change your mind.</p>
     return (
        <div className="thumb">
          <div className="buttons">
            <button className={classLike} onClick={this.state.positive === true ? this._remove : this._like}><i className="fa fa-arrow-circle-o-up" /> <span className="total"> Like</span></button>
            <button className={classDislike} onClick={this.state.positive === false ? this._remove: this._dislike}><i className="fa fa-arrow-circle-o-down" /> <span className="total"> Dislike</span></button>
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
		 } else {
			 model.postId = this.props.post.id;
			 Actions.add(model);
		 }
	 },
	 _dislike: function () {
		 let model = {
			 positive: 0
		 };
			if (this.state.id) {
				Actions.save(this.state.id, model);
			} else {
				model.postId = this.props.post.id;
				Actions.add(model);
			}
	 },
	 _remove: function () {
		 Actions.remove(this.state.id);
	 }
});

module.exports = Thumbs;
