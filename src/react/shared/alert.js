var React = require('react');

module.exports = React.createClass({
  getDefaultProps: function () {
    return {
      color: '',
      msg: ''
    }
  },
  render: function () {
    return (<div className={["alert", this.props.color].join(' ')}>
      {this.props.msg}
    </div>);
  }
});
