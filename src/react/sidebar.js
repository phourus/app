"use strict";
let React = require('react');
let { DropTarget } = require('react-dnd');

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
    let tags = [
      {name: 'All Posts (Default)', count: 86},
      {name: 'Marketing', count: 32},
      {name: 'Development', count: 22},
      {name: 'Sales', count: 17},
      {name: 'Executive', count: 14},
      {name: 'Admin', count: 6}
    ];
    if (!this.props.sidebarVisible) {
      return (
        <div id="sidebar">
          <button className="toggle" onClick={this.props.sidebar}><i className="fa fa-navicon" /></button>
        </div>
      );
    }
    return (
      <div id="sidebar">
        <button className="toggle" onClick={this.props.sidebar}><i className="fa fa-navicon" /></button>
        <Target />
        <ul>
          {tags.map((item, index) => {
            return (
              <li className={index === this.state.selected ? "selected" : ""}>
                <a id={'id' + index} href="javascript:void(0)" onClick={this._select}>
                  <span className="title">{item.name}</span><br />
                  <span className="count">{item.count} posts</span>
                </a>
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
    this.setState({selected: parseInt(id)});
  }
});
