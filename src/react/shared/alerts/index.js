import React from 'react';

export default React.createClass({
  propTypes: {
    color: React.PropTypes.string,
    msg: React.PropTypes.string,
    code: React.PropTypes.number,
    remove: React.PropTypes.func.isRequired
  },
  render: function () {
    return (
      <div className={this.props.color + " alert"}>
        <button className="remove fa fa-remove" onClick={this._remove}></button>
        <div className="msg">{this.props.msg}</div>
        <div className="code">HTTP Status Code: {this.props.code}</div>
      </div>
    );
  },
  _remove: function () {
    if (this.props.remove) {
      return this.props.remove();
    }
    console.warn('Alert remove function not provided');
  }
});
