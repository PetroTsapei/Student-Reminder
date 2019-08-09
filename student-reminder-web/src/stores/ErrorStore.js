import { observable, action } from 'mobx';

export class ErrorStore {
  @observable list = {};

  @action
  async add(data) {
    this.list = {
      ...this.list,
      ...data
    }
  }

  @action
  setListToInitState() {
    this.list = {};
  }
}

export const errorStore = new ErrorStore();