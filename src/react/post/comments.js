"use strict";
let React = require('react');
let Router = require('react-router');
let { Link, History } = Router;
let moment = require('moment');
let ga = require('../../lib/analytics');

let Actions = require('../../actions/post/comments');
let Store = require('../../stores/post/comments');

let Pic = require('../shared/pic');

let Comments = React.createClass({
  contextTypes: {
    session: React.PropTypes.object
  },
  getInitialState: function () {
    return {
			ready: false,
      count: 0,
      rows: []
    }
  },
  componentDidMount: function () {
    this.unsubscribe = Store.listen((data) => {
			if (this.state.ready === false) {
				data.ready = true;
			}
      if (data.added) {
        data.added.user = this.context.session.user;
        data.rows = this.state.rows;
        data.rows.unshift(data.added);
      }
			this.setState(data);
    });
  },
  componentWillUnmount: function () {
    this.unsubscribe();
  },
  componentWillReceiveProps: function (newProps) {
    if (newProps.post && newProps.post.id) {
      Actions.collection({postId: newProps.post.id});
    }
  },
  render: function () {
    let create = <h3>You must be logged-in to comment</h3>
    let token = null;
    let session = this.context.session;
    if (token === null) {
      //pic = <a href="#user/{this.props.id}"><img src="{this.props.pic}" width="100"></a>
    }
    let data = this.state.rows;
    let comments = [];
    if (data && this.state.ready === true) {
			if (data.length > 0) {
				comments = data.map(function (item, i) {
					return <Comments.Comment key={item.id} comment={item} user={item.user} />;
				});
			} else {
				comments = <h3>This post does not have any comments. Be the first!</h3>;
			}
    } else {
			//comments = <Loader />
		}
    if (session.authenticated) {
      create = <Comments.Create post={this.props.post} />
    }
    return (
      <div className="comments">
        {create}
        <div className="list">{comments}</div>
      </div>
    );
  }
});

Comments.Create = React.createClass({
  getDefaultProps: function () {
    return {
      post: {}
    };
  },
  getInitialState: function () {
		return {
			content: ""
		}
	},
	render: function () {
    return (
      <div className="create">
        <div className="pic">
          <Link to="/account">
            <img src={"/assets/avatars/1.jpg"} />
          </Link>
        </div>
        <textarea ref="comment" placeholder="Enter your comment here" value={this.state.content} onChange={this._content} />
        <button className="button green add" onClick={this._add}>
          <i className="fa fa-comment" /> Post Comment
        </button>
      </div>
    );
  },
	_add: function () {
		let model = {};
		model.content = this.state.content;
		model.postId = this.props.post.id;
		Actions.add(model);
		this.setState({content: ""});
    ga('send', 'event', 'engagement', 'comment');
	},
	_content: function (e) {
		let value = e.currentTarget.value;
		this.setState({content: value});
	}
});

Comments.Comment = React.createClass({
  mixins: [History],
  getDefaultProps: function () {
    return {
      comment: {},
      user: {
        id: 0
      }
    };
  },
	render: function () {
    let textarea = '';
    let user = this.props.user || {};
    /*
    if (owner === true) {
    textarea =   <textarea>{this.props.id}</textarea>
    actions =
    <% if(owner === true){ %>
    <div class="actions-admin">
    <button class="button blue edit">Edit Comment</button>
    <button class="button red delete">Delete Comment</button>
    </div>
    <div class="actions-edit">
    <button class="button green save">Save Changes</button>
    <button class="button red cancel">Cancel</button>
    </div>
    <div class="actions-delete">
    <button class="button green confirm">Confirm Delete</button>
    <button class="button red cancel">Cancel</button>
    </div>
</Link>

    }
    */
    return (
      <div className="comment" id={this.props.comment.id}>
				<Pic id={user.id} img={user.img} name={user.username} type='user' />
        <div className="content">
					<Link to={`/${this.props.user.username}`} className="username">
						{this.props.user.first} {this.props.user.last}
					</Link>
          <p>{this.props.comment.content}</p>
          <span className="date">{moment(this.props.comment.createdAt).fromNow()}</span>
        </div>
        <div className="actions"></div>
      </div>
    );
  }
});

module.exports = Comments;
