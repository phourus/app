"use strict";
let React = require('react');
var ga = require('../analytics');

let Steps = require('../steps');
let Store = require('../stores/tutorial');
let Actions = require('../actions/tutorial');
let localStorage;

let Joyride = React.createClass({
  render: function () {
    return false;
  }
});

if (typeof window === 'object') {
  Joyride = require('react-joyride');
  localStorage = window.localStorage;
}

module.exports = React.createClass({
  getInitialState: function () {
    return {
      active: true,
      module: 'navigation',
      ready: false,
      complete: [],
    };
  },
  componentDidMount: function () {
    this._getLocal();
    this.unsubscribe = Store.listen((data) => {
      if (data.ready) {
        this.setState({ready: data.ready});
      }
      if (data.reset) {
        this._resetLocal();
      }
    });
  },
  componentWillUnmount: function () {
    this.unsubscribe();
  },
  componentWillReceiveProps: function (nextProps) {
    let route = nextProps._route;
    if (route) {
      let current = this._current(route);
      this.setState({module: current, ready: false});
    }
  },
  shouldComponentUpdate: function () {
    return true;
    //return this.state.module === this._current();
  },
  componentDidUpdate: function () {
    let incomplete = this.state.complete.indexOf(this.state.module) === -1;
    if (this.state.ready && incomplete) {
      this.refs.joyride.reset();
      this.refs.joyride.start(true);
    }
  },
  render: function () {
    let module = this.state.module;
    let steps = Steps[module] || [];

    return (
      <Joyride ref="joyride" type={'continuous'} steps={steps} scrollOffset={80}
        showStepsProgress={true} showSkipButton={true} showOverlay={true}
        stepCallback={this._stepCallback} completeCallback={this._completeCallback}
        locale={{last: 'Finish', next: 'Next', skip: 'Skip', back: 'Back'}} />
    );
    return false;
  },
  _current: function (nextRoute) {
    let modules = ['account', 'stream', 'post', 'create', 'edit'];
    let route = nextRoute;
    let root = route.root;
    let type = route.type;
    let mod = root;
    if (root === 'stream' && ['post', 'create', 'edit'].indexOf(type) > -1) {
      mod = type;
    }
    if (modules.indexOf(root) > -1) {
      return mod;
    } else {
      return false;
    }
  },
  _stepCallback: function (step, close) {
    let module = Store.module;
    let index = 0;
    let progress = this.refs.joyride.getProgress();
    if (progress) {
      index = progress.index;
    }
    ga('send', 'event', 'tutorial', module, index.toString());
    if (step.cb && typeof step.cb === 'function') {
      step.cb.apply(this);
    }
  },
  _completeCallback: function (step, skip) {
    let action = skip ? 'skip' : 'complete';
    let module = this.state.module;
    let copy = this.state.complete;
    if (copy.indexOf(module) === -1) {
      copy.push(module);
    }
    this._setLocal(copy);
    this.setState({module: false, ready: false, complete: copy});
    ga('send', 'event', 'tutorial', module, action);
  },
  _setLocal: function (completeArray) {
    try {
      localStorage.setItem('complete', JSON.stringify(completeArray));
    } catch (e) {
      console.warn('localStorage not supported');
    }
  },
  _getLocal: function () {
    try {
      let complete = localStorage.getItem('complete');
      if (complete) {
        this.setState({complete: JSON.parse(complete)});
      }
    } catch (e) {
      console.warn('localStorage not supported');
    }
  },
  _resetLocal: function () {
    this._setLocal([]);
    this.setState({module: 'navigation', ready: true, complete: []});
  },
});
