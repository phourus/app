import React from 'react'
import Router from 'react-router'
import ga from '../../../lib/analytics'

export default class Thumbs extends React.Component {

   componentDidMount() {
    //  let params = this.props.route.params;
    //  this.unsubscribe = Store.listen((data) => {
		// 	 this.setState(data);
    //  });
    //  Actions.post(params.id);
   }

   render() {
		 let classLike = "button up medium";
		 let classDislike = "button down medium";
     if (this.props.positive === true) {
       classLike += ' selected';
     } else if (this.props.positive === false) {
       classDislike += ' selected';
     }
     // <p>You have decided you {current} this post. Click the button below to change your mind.</p>
     return (
        <div className="thumb">
          <div className="buttons">
            <button className={classLike} onClick={this.props.positive === true ? this._remove : this._like}><i className="fa fa-angle-up" /> <span className="total"> Like</span></button>
            <button className={classDislike} onClick={this.props.positive === false ? this._remove: this._dislike}><i className="fa fa-angle-down" /> <span className="total"> Dislike</span></button>
          </div>
        </div>
     );
   }

	 _like() {
		 let model = {
			 positive: 1
		 }
		 if (this.props.id) {
			//  Actions.save(this.props.id, model)
      //  ga('send', 'event', 'engagement', 'changevote')
		 } else {
			//  model.postId = this.props.post.id
			//  Actions.add(model)
      //  ga('send', 'event', 'engagement', 'upvote')
		 }
	 }

	 _dislike() {
		 let model = {
			 positive: 0
		 }
			if (this.props.id) {
				//Actions.save(this.props.id, model);
        ga('send', 'event', 'engagement', 'changevote');
			} else {
				//model.postId = this.props.post.id;
				//Actions.add(model);
        ga('send', 'event', 'engagement', 'downvote');
			}
	 }

	 _remove() {
		 //Actions.remove(this.props.id);
     ga('send', 'event', 'engagement', 'unvote');
	 }
}
