import React from 'react';
import Drop from './drop';
import Actions from '../../actions/post/folders';
import Store from '../../stores/post/folders';
import Stream from '../../actions/stream';

export default React.createClass({
  getInitialState: function () {
    return {
      folders: [],
      selected: 0
    };
  },
  componentDidMount: function () {
    this.unsubscribe = Store.listen((data) => {
      this.setState(data);
    });
    Actions.collection();
  },
  componentWillUnmount: function () {
    this.unsubscribe();
  },
  render: function () {
    let folders = this.state.folders;
    if (folders[0] && folders[0].id !== 0) {
      folders.unshift({id: 0, name: 'All Posts'});
    }

    if (!this.props.sidebarVisible) {
      return false;
    }
    return (
      <div id="sidebar">
        <button className="toggle" onClick={this.props.sidebar}><i className="fa fa-angle-right" /> Collapse Sidebar</button>
        <ul>
          {folders.map((item, index) => {
            return (
              <Drop key={item.id} item={item} index={index} select={this._select} selected={this.state.selected} />
            );
          })}
        </ul>
      </div>
    );
  },
  _select: function (e) {
    let id = e.currentTarget.id;
    id = id.replace('id', '');
    Stream.folder(id);
    this.setState({selected: parseInt(id)});
  }
});
