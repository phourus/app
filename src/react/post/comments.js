"use strict";
let React = require('react');
let Router = require('react-router');
let { Link, State, Navigation } = Router;
let moment = require('moment');

let Actions = require('../../actions/post').Comments;

let Store = require('../../stores/post').Comments;
let AccountStore = require('../../stores/account');

let Pic = require('../shared/pic');

let Comments = React.createClass({
  mixins: [State],
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
			this.setState(data);
    });
		// Actions.Comments.collection moved to Post component because initial
		// render postID = 0
  },
  componentWillUnmount: function () {
    this.unsubscribe();
  },
  render: function () {
    let create = <h3>You must be logged-in to comment</h3>
    let token = null;
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
    if (AccountStore.authenticated) {
      create = <Comments.Create post={this.props.post} />
    }
    return (
      <div className="comments">
				<h2>Comments</h2>
        <div className="list">{comments}</div>
        {create}
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
          <Link to="account">
            <img src={"/assets/avatars/1.jpg"} />
          </Link>
        </div>
        <textarea ref="comment" placeholder="Comment goes here" value={this.state.content} onChange={this._content} />
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
	},
	_content: function (e) {
		let value = e.currentTarget.value;
		this.setState({content: value});
	}
});

Comments.Comment = React.createClass({
  mixins: [Navigation],
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
				<Pic id={this.props.user.id} img={this.props.user.img} />
        <div className="content">
					<Link to="userPosts" params={{id: this.props.user.id}} className="username">
						{this.props.user.first} {this.props.user.last} ({this.props.user.influence})
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
