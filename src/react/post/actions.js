"use strict";
let React = require('react');
let Router = require('react-router');
let { Link, History } = Router;

let Actions = require('../../actions/post');
let Store = require('../../stores/post');

module.exports = React.createClass({
  mixins: [History],
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
        <Close _route={this.props._route} back={this._back} />
        <Edit _route={this.props._route} owner={this.props.owner} post={this.props.post} />
        <Create _route={this.props._route} back={this._back} />
        <Controls _route={this.props._route} owner={this.props.owner} post={this.props.post} myposts={this._myposts} />
      </div>
    );
  },
  _back: function () {
    if (!this.history.goBack()) {
      if (this.props._route.type === 'edit') {
        this.history.pushState(null, "/stream/me");
      } else {
        this.history.pushState(null, "/stream");
      }
    }
  },
  _myposts: function () {
  	this.history.pushState(null, "/stream/me");
  }
});

let Close = React.createClass({
  render: function () {
    if (this.props._route.type !== 'post') {
      return false;
    }
    return (
      <button className="close" onClick={this.props.back}><i className="fa fa-remove" /></button>
    );
  }
});

let Edit = React.createClass({
  getDefaultProps: function () {
    return {
      owner: false
    };
  },
  render: function () {
    if (!this.props.owner) {
      return false;
    }
    if (this.props._route.type === 'edit' || this.props._route.type === 'create') {
      return false;
    }
    return (
      <Link to={`/stream/edit/${this.props.post.id}`} className="edit"><i className="fa fa-pencil" /><br />Edit</Link>
    );
  }
});

let Create = React.createClass({
  getDefaultProps: function () {
    return {
      saving: false
    };
  },
  render: function () {
    if (this.props._route.type !== 'create') {
      return false;
    }
    return (
      <div>
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
    if (this.props._route.type !== 'edit') {
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
