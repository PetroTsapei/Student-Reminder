import { observable, action } from 'mobx';
import { persist } from 'mobx-persist';
import AuthApi from '../api/auth';

export class AuthStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @persist @observable token = "";

  @action
  async signIn() {
    try {
      this.rootStore.fetchingStore.setFetchState(true);
      const data = await AuthApi.signIn({
        login: ""
      });

      console.log(data);
      
    } catch (error) {
      console.log(error);
    } finally {
      this.rootStore.fetchingStore.setFetchState(false);
    }
  }
}