import { observable, action } from 'mobx';
import { persist } from 'mobx-persist';
import AuthApi from '../api/auth';
import { Alert } from 'react-native';

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
        countryCode: "+380",
        phone: "964566810",
        password: "sniper_petro2"
      });

      console.log(data);
      
    } catch (obj) {
      if (obj.error) Alert.alert(
        'Sign In Error',
        obj.error
      );
      else Alert.alert(
        'Error',
        'An error occurred'
      )
    } finally {
      this.rootStore.fetchingStore.setFetchState(false);
    }
  }
}