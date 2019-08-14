import { observable, action } from 'mobx';
import { persist } from 'mobx-persist';
import AuthApi from '../api/auth';
import { Alert } from 'react-native';

export class AuthStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @persist @observable token = "";
  @persist @observable group = "";

  static handleError(obj) {
    if (obj.error) Alert.alert(
      'Sign In Error',
      obj.error
    );
    else Alert.alert(
      'Error',
      'An error occurred'
    )
  }

  @action
  async finishRegistration(id, data) {
    try {
      this.rootStore.fetchingStore.setFetchState(true);
      const { message } = await AuthApi.finishRegistration(id, data);

      Alert.alert(message, 'Sign In in this account?', [
        {text: 'No', onPress: () => null},
        {text: 'Yes', onPress: () => this.signIn(data)},
      ])
    } catch (obj) {
      AuthStore.handleError(obj);
    } finally {
      this.rootStore.fetchingStore.setFetchState(false);
    }
  }

  @action
  async signIn(signInData) {
    try {
      this.rootStore.fetchingStore.setFetchState(true);
      const data = await AuthApi.signIn(signInData);

      if (data.verified) {
        this.token = data.token;
        this.group = data.groupName;
      }
      
    } catch (obj) {
      AuthStore.handleError(obj);
    } finally {
      this.rootStore.fetchingStore.setFetchState(false);
    }
  }

  @action
  signOut() {
    this.token = "";
    this.group = "";
    this.rootStore.lessonsStore.reset();
  }
}