import React from 'react'

import ga from '../../../../lib/analytics'

import Comment from './comment'
import Create from './create'

export default class Comments extends React.Component {

  componentDidMount() {
    // this.unsubscribe = Store.listen((data) => {
		// 	if (this.state.ready === false) {
		// 		data.ready = true;
		// 	}
    //   if (data.added) {
    //     data.added.user = this.props.session.user;
    //     data.rows = this.state.rows;
    //     data.rows.unshift(data.added);
    //   }
		// 	this.setState(data);
    // });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.post && newProps.post.id) {
      //Actions.collection({postId: newProps.post.id});
    }
  }

  render() {
    let create = <h3>You must be logged-in to comment</h3>
    let token = null;
    let session = this.props.session
    if (token === null) {
      //pic = <a href="#user/{this.props.id}"><img src="{this.props.pic}" width="100"></a>
    }
    let data = this.props.rows;
    let comments = [];
    if (data && this.props.ready === true) {
			if (data.length > 0) {
				comments = data.map(function (item, i) {
					return <Comment key={item.id} comment={item} user={item.user} />
				});
			} else {
				comments = <h3>This post does not have any comments. Be the first!</h3>
			}
    } else {
			//comments = <Loader />
		}
    if (session.authenticated) {
      create = <Create post={this.props.post} add={this._add} change={this._change} content={this.props.content} />
    }
    return (
      <div className="comments">
        {create}
        <div className="list">{comments}</div>
      </div>
    )
  }

  _add() {
    let model = {}
    model.content = this.state.content
    model.postId = this.props.post.id
    //Actions.add(model)
    //this.setState({content: ""})
    ga('send', 'event', 'engagement', 'comment')
  }

  _change(e) {
    let value = e.currentTarget.value
    //this.setState({content: value})
  }
}
