import { observable, action } from 'mobx';

class RouterStore {
  @observable location = {};
  @observable match = {};
  @observable history = {};

  @action setRoute(location, match, history) {
    this.location = location;
    this.match = match;
    this.history = history;
  }
}

export default new RouterStore();