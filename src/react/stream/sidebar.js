"use strict";
let React = require('react');
let { DropTarget } = require('react-dnd');

let Actions = require('../../actions/post/folders');
let Store = require('../../stores/post/folders');
let Stream = require('../../actions/stream');

let Drop = React.createClass({
  render: function () {
    return <button>Here</button>
  }
});

module.exports = React.createClass({
  getInitialState: function () {
    return {
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
    let spec = {
    	drop(props, monitor, component) {
        console.log(props);
    		return {
    			name: props.name
    		};
    	}
    };

    let Target = DropTarget('folders', spec, (connect, monitor) => ({
      // Call this function inside render()
      // to let React DnD handle the drag events:
      connectDropTarget: connect.dropTarget(),
      // You can ask the monitor about the current drag state:
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
      itemType: monitor.getItemType()
    }))(Drop);
    let folders = this.state.folders || [];
    folders.unshift({id: 0, name: 'All Posts'});
    if (!this.props.sidebarVisible) {
      return false;
    }
    return (
      <div id="sidebar">
        <button className="toggle" onClick={this.props.sidebar}><i className="fa fa-angle-right" /> Collapse Sidebar</button>
        <ul>
          {folders.map((item, index) => {
            return (
              <li key={item.name} className={index === this.state.selected ? "selected" : ""}>
                <a id={'id' + item.id} href="javascript:void(0)" onClick={this._select}>
                  <span className="title">{item.name}</span><br />
                  {index === this.state.selected && 1
                    ? false
                    : false
                    //: <span className="count">{item.id} posts</span>
                  }
                </a>
                {index === this.state.selected && 0
                  ? <ul>
                    <li>Social Media</li>
                    <li>Search Engine Management</li>
                    <li>Direct</li>
                    <li><input /><button>Add subfolder</button></li>
                    </ul>
                  : false
                }
              </li>
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
