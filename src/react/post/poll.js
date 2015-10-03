"use strict";
let React = require('react');

let Actions = require('../../actions/post');
let Store = require('../../stores/post');

let Poll = React.createClass({
  getInitialState: function () {
    return {
      data: []
    };
  },
  componentDidMount: function () {
    this.unsubscribe = Store.listen((data) => {
      if (data.data && data.data[0] && data.data[0].postId === this.props.post.id) {
        this.setState(data);
      }
    });
    Actions.poll(this.props.post.id);
  },
  componentWillUnmount: function () {
    this.unsubscribe();
  },
  render: function () {
    setTimeout(() => {
      this._draw();
    }, 1);
    return (
      <div className="poll">
        <div id={"poll" + this.props.post.id}></div>
      </div>
    );
  },
  _vote: function (option) {
    if (this.state.selected === option) {
      Actions.vote(this.props.post.id, null);
    } else {
      Actions.vote(this.props.post.id, option);
    }
  },
  _draw: function () {
    let self = this;
    let columns = this.state.data.map((item) => {
      return [item.option, item.count];
    });
    this.chart = c3.generate({
      bindto: '#poll' + this.props.post.id,
      axis: {
        rotated: true,
        size: {
          width: '100%'
        },
        padding: {
          top: 0,
          left: 10,
          right: 10,
          bottom: 0
        },
        y: {
          show: false
        },
        x: {
          show: false
        }
      },
      tooltip: {
        show: false
      },
      legend: {
        position: 'bottom'
      },
      data: {
        columns: columns,
        type: 'bar',
        colors: this._colors(),
        onclick: function (d, element) {
          self._vote(d.id);
        }
      },
      bar: {
        width: {
          ratio: 1
        }
      }
    });
  },
  _colors: function () {
    let _dark = ['#236794', '#ce9a0e', '#5b7e00', '#a70202'];
    let _colors = ['#3498DB', '#ECB010', '#8ABF00', '#ED0303'];
    let _faded = ['#d4eeff', '#ece1c4', '#e2eec3', '#edcfcf'];
    let _palette = _colors;
    if (this.state.selected) {
      _palette = _faded;
    }
    let colors = {};
    let i = 0;
    this.state.data.forEach((item) => {
      if (i === _palette.length) {
        i = 0;
      }
      let _c = _palette[i];
      if (this.state.selected && item.label === this.state.selected) {
        _c = _dark[i];
      }
      colors[item.label] = _c;
      i++;
    });
    return colors;
  }
});

module.exports = Poll;
