import React from 'react'
import ga from '../../../lib/analytics'

import Steps from './steps'
import Actions from '../../../actions/tutorial'
let localStorage;

//import styles from './node_modules/react-joyride/lib/styles/react-joyride.css'

let Joyride = React.createClass({
  render: function () {
    return false;
  }
});

if (typeof window === 'object') {
  Joyride = require('react-joyride');
  localStorage = window.localStorage;
}

export default React.createClass({
  contextTypes: {
    route: React.PropTypes.object
  },
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
    // this.unsubscribe = Store.listen((data) => {
    //   if (data.ready) {
    //     this.setState({ready: data.ready});
    //   }
    //   if (data.reset) {
    //     this._resetLocal();
    //   }
    // });
  },
  componentWillReceiveProps: function (nextProps, nextContext) {
    let route = nextContext.route;
    if (route) {
      let current = this._current(route);
      this.setState({module: current, ready: false});
    }
  },
  shouldComponentUpdate: function () {
    let current = this._current(this.context.route);
    return this.state.module === current;
  },
  componentDidUpdate: function () {
    let incomplete = this.state.complete.indexOf(this.state.module) === -1;

    if (this.state.ready && incomplete) {
      try {
        this.refs.joyride.reset();
        this.refs.joyride.start(true);
      } catch (e) {
        console.warn(e);
      }
    }
  },
  render: function () {
    let module = this.state.module;
    let steps = Steps[module];
    if (!steps || !this._exists()) {
      return false;
    }
    return (
      <Joyride ref="joyride" type={'continuous'} steps={steps} scrollOffset={80}
        showStepsProgress={true} showSkipButton={true} showOverlay={true}
        stepCallback={this._stepCallback} completeCallback={this._completeCallback}
        locale={{last: 'Finish', next: 'Next', skip: 'Skip', back: 'Back'}} />
    );
    return false;
  },
  _exists: function () {
    let mod = this.state.module;
    let steps = Steps[mod];
    if (!steps || !steps[0] || !steps[0].selector) {
      return false;
    }
    let selector = steps[0].selector;
    if (typeof document !== 'undefined') {
      return document.querySelector(selector);
    }
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
    let module = this.state.module;
    let index = 0;
    let progress = this.refs.joyride.getProgress();
    if (progress) {
      index = progress.index;
    }
    ga('send', 'event', 'tutorial', index.toString(), module);
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
    ga('send', 'event', 'tutorial', action, module);
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
