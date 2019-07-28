import { observable, action } from 'mobx';

export class FetchingStore {
  @observable isFetching = false;

  @action
  setFetchState(state) {
    this.isFetching = state;
  }
}