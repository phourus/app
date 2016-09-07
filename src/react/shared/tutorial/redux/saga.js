import Reflux from 'reflux';
import Actions from '../actions/tutorial';

export default Reflux.createStore({
  init: function () {
    this.listenTo(Actions.ready, this._ready);
    this.listenTo(Actions.reset, this._reset);
  },
  _ready: function (ready) {
    this.trigger({ready: ready});
  },
  _reset: function () {
    this.trigger({reset: true});
  }
});
