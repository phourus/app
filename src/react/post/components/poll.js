import React from 'react'

import Actions from '../../../actions/post'
import Store from '../../../stores/post'

const Poll = React.createClass({
  getInitialState: function () {
    return {
      votes: {}
    };
  },
  getDefaultProps: function () {
    return {
      post: {
        poll: ''
      }
    }
  },
  componentDidMount: function () {
    this.unsubscribe = Store.listen((data) => {
      if (data.votes && data.postId === this.props.post.id) {
        this.setState({votes: data.votes});
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
      <div className="extra poll">
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
    let options = [];
    let votes = this.state.votes || {};
    if (this.props.post && this.props.post.poll) {
      options = this.props.post.poll.split(';');
    }
    let columns = options.map((key) => {
      let value = votes[key] || 0;
      return [key, value];
    });
    this.chart = c3.generate({
      bindto: '#poll' + this.props.post.id,
      size: {
        height: 150
      },
      axis: {
        rotated: true,
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
        position: 'bottom',
        item: {
          onclick: function (d) {
            self._vote(d);
            return false;
          }
        }
      },
      data: {
        columns: columns,
        type: 'bar',
        colors: this._colors()
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
    let options = [];
    if (this.props.post.poll) {
      options = this.props.post.poll.split(';');
    }
    if (this.state.selected) {
      _palette = _faded;
    }
    let colors = {};
    let i = 0;
    options.forEach((key) => {
      if (i === _palette.length) {
        i = 0;
      }
      let _c = _palette[i];
      if (this.state.selected && key === this.state.selected) {
        _c = _dark[i];
      }
      colors[key] = _c;
      i++;
    });
    return colors;
  }
});

export default Poll
