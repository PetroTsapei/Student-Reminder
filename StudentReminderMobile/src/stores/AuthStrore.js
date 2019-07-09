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
  async signIn(signInData) {
    try {

      const {
        countryCode,
        phone,
        password
      } = signInData;

      this.rootStore.fetchingStore.setFetchState(true);
      const data = await AuthApi.signIn({
        countryCode: `+${countryCode}`,
        phone,
        password
      });

      if (data.verified) {
        this.token = data.token;
      }
      
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

  @action
  signOut() {
    this.token = "";
  }
}