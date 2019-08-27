import { observable, action } from 'mobx';
import { persist } from 'mobx-persist';
import AuthApi from '../api/auth';
import { Alert } from 'react-native';
import routerStore from '../stores/RouterStore';
import sendPushToken from '../helpers/sendPushToken';

export class AuthStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @persist @observable token = "";
  @persist @observable group = "";
  @persist('object') @observable setting = {};

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
        {text: 'No', onPress: () => routerStore.history.push('/')},
        {text: 'Yes', onPress: () => {
          this.signOut();
          this.signIn(data);
          routerStore.history.push('/');
        }},
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
        //TODO fix it
        this.token = data.token;
        this.group = data.group;
        this.setting = data.setting;
        await sendPushToken(data.token);
      }

    } catch (obj) {
      AuthStore.handleError(obj);
    } finally {
      this.rootStore.fetchingStore.setFetchState(false);
    }
  }

  @action
  signOut() {
    AuthApi.deletePushToken(this.token);
    this.token = "";
    this.group = "";
    this.setting = {};
    this.rootStore.lessonsStore.reset();
  }
}
