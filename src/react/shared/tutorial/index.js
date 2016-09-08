import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ga from '../../../lib/analytics'

import Steps from './steps'
import actions from './redux/actions'

let localStorage;

//import styles from './node_modules/react-joyride/lib/styles/react-joyride.css'

class Joyride extends React.Component {
  render() {
    return false
  }
}

if (typeof window === 'object') {
  Joyride = require('react-joyride')
  localStorage = window.localStorage
}

class Tutorial extends React.Component {

  getInitialState() {
    return {
      active: true,
      module: 'navigation',
      ready: false,
      complete: [],
    };
  }

  componentDidMount() {
    this._getLocal();
    // this.unsubscribe = Store.listen((data) => {
    //   if (data.ready) {
    //     this.setState({ready: data.ready});
    //   }
    //   if (data.reset) {
    //     this._resetLocal();
    //   }
    // });
  }

  componentWillReceiveProps(nextProps) {
    const url = nextProps.url
    if (url) {
      let current = this._current(url);
      this.setState({module: current, ready: false});
    }
  }

  shouldComponentUpdate() {
    let current = this._current(this.props.url);
    return this.state.module === current;
  }

  componentDidUpdate() {
    let incomplete = this.state.complete.indexOf(this.state.module) === -1;

    if (this.state.ready && incomplete) {
      try {
        this.refs.joyride.reset();
        this.refs.joyride.start(true);
      } catch (e) {
        console.warn(e);
      }
    }
  }

  render() {
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
  }

  _exists() {
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
  }

  _current(nextRoute) {
    let modules = ['account', 'stream', 'post', 'create', 'edit'];
    let url = nextRoute;
    let root = url.root;
    let type = url.type;
    let mod = root;
    if (root === 'stream' && ['post', 'create', 'edit'].indexOf(type) > -1) {
      mod = type;
    }
    if (modules.indexOf(root) > -1) {
      return mod;
    } else {
      return false;
    }
  }

  _stepCallback(step, close) {
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
  }

  _completeCallback(step, skip) {
    let action = skip ? 'skip' : 'complete';
    let module = this.state.module;
    let copy = this.state.complete;
    if (copy.indexOf(module) === -1) {
      copy.push(module);
    }
    this._setLocal(copy);
    this.setState({module: false, ready: false, complete: copy});
    ga('send', 'event', 'tutorial', action, module);
  }

  _setLocal(completeArray) {
    try {
      localStorage.setItem('complete', JSON.stringify(completeArray));
    } catch (e) {
      console.warn('localStorage not supported');
    }
  }

  _getLocal() {
    try {
      let complete = localStorage.getItem('complete');
      if (complete) {
        this.setState({complete: JSON.parse(complete)});
      }
    } catch (e) {
      console.warn('localStorage not supported');
    }
  }

  _resetLocal() {
    this._setLocal([]);
    this.setState({module: 'navigation', ready: true, complete: []});
  }
}

const mapState = (state) => {
  return {}
}

const mapDispatch = (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapState, mapDispatch)(Tutorial)
