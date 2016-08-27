import React from 'react'
import Router, { Link, History } from 'react-router'

import Actions from '../../../actions/post'
import Store from '../../../stores/post'

export default React.createClass({
  mixins: [History],
  contextTypes: {
    route: React.PropTypes.object
  },
  getDefaultProps: function () {
    return {
      post: {
        id: 0
      },
      owner: false,
      saving: false
    };
  },
  render: function () {
    return (
      <div className="actions">
        <Close back={this._back} />
        <Edit owner={this.props.owner} post={this.props.post} />
        <Create back={this._back} post={this.props.post} />
        <Controls owner={this.props.owner} post={this.props.post} myposts={this._myposts} />
      </div>
    );
  },
  _back: function () {
    if (!this.history.goBack()) {
      if (this.context.route.type === 'edit') {
        this.history.pushState(null, "/me");
      } else {
        this.history.pushState(null, "/stream");
      }
    }
  },
  _myposts: function () {
  	this.history.pushState(null, "/me");
  }
});

let Rich = React.createClass({
  render: function () {
    return (this.props.post.rich
      ? false
      : <button className="button gold rich" onClick={this._rich}><i className="fa fa-font" /> Enable Rich Text</button>
    );
  },
  _rich: function () {
    Actions.change('rich', 1);
  }
});

let Close = React.createClass({
  contextTypes: {
    route: React.PropTypes.object
  },
  render: function () {
    if (this.context.route.type !== 'post') {
      return false;
    }
    return (
      <button className="close" onClick={this.props.back}><i className="fa fa-remove" /></button>
    );
  }
});

let Edit = React.createClass({
  contextTypes: {
    route: React.PropTypes.object
  },
  getDefaultProps: function () {
    return {
      owner: false
    };
  },
  render: function () {
    let post = this.props.post;
    let username = 'post';
    if (!this.props.owner) {
      return false;
    }
    if (this.context.route.type === 'edit' || this.context.route.type === 'create') {
      return false;
    }
    if (post.user && post.user.username) {
      username = post.user.username;
    }
    return (
      <Link to={`/${username}/${post.slug}/edit`} className="edit"><i className="fa fa-pencil" /><br />Edit</Link>
    );
  }
});

let Create = React.createClass({
  contextTypes: {
    route: React.PropTypes.object
  },
  getDefaultProps: function () {
    return {
      saving: false
    };
  },
  render: function () {
    if (this.context.route.type !== 'create') {
      return false;
    }
    return (
      <div>
        <Rich owner={this.props.owner} post={this.props.post} />
        <button className="button green save" onClick={this._post} disabled={this.props.saving}><i className="fa fa-save" /> Post</button>
        <button className="button red delete inverted" onClick={this.props.back}><i className="fa fa-close" /> Cancel</button>
      </div>
    );
  },
  _post: function () {
    Actions.add();
  }
});

let Controls = React.createClass({
  contextTypes: {
    route: React.PropTypes.object
  },
  getInitialState: function () {
    return {
      confirmTrash: false
    };
  },
  getDefaultProps: function () {
    return {
      post: {},
      owner: false,
      saving: false
    };
  },
  render: function () {
    if (!this.props.owner) {
      return false;
    }
    if (this.context.route.type !== 'edit') {
      return false;
    }
    if (this.state.confirmTrash) {
      return (
        <div>
          <button className="button red delete" onClick={this._confirm} disabled={this.props.saving}><i className="fa fa-trash" /> Confirm Delete</button>
          <button className="button red delete inverted" onClick={this._cancel}><i className="fa fa-remove" /> Cancel Delete</button>
        </div>
      );
    }
    return (
      <div>
        <Rich owner={this.props.owner} post={this.props.post} />
        <button className="button green save" onClick={this._update} disabled={this.props.saving}><i className="fa fa-save" /> {this.props.saving ? 'Saving' : 'Save Changes'}</button>
        <button className="button red delete inverted" onClick={this._trash}><i className="fa fa-trash" /> Delete</button>
        <button className="button blue myposts inverted" onClick={this.props.myposts}><i className="fa fa-arrow-left" /> Back to My Posts</button>
      </div>
    );
  },
  _update: function () {
    Store.post.id = this.props.post.id;
    this.setState({saving: true});
    Actions.save();
  },
  _trash: function () {
    this.setState({confirmTrash: true});
  },
  _cancel: function () {
    this.setState({confirmTrash: false});
  },
  _confirm: function () {
    Store.post.id = this.props.post.id;
    Actions.trash();
  },
});
