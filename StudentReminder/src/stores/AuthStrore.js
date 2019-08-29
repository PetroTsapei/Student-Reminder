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
  @persist @observable group = undefined;
  @persist @observable enableNotifications = true;
  @observable userInfo = {};

  static handleError(obj) {
    if (obj.errors) Alert.alert(
      'Field error',
      Object.values(obj.errors)[0].message
    );
    else if (obj.error) Alert.alert(
      'Error',
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
        this.token = data.token;
        this.group = data.group;
        if (this.enableNotifications) await sendPushToken(data.token);
      }

    } catch (obj) {
      AuthStore.handleError(obj);
    } finally {
      this.rootStore.fetchingStore.setFetchState(false);
    }
  }

  @action
  async switchNotifications(value) {
    this.enableNotifications = value;

    if (value) await sendPushToken(this.token);
    else AuthApi.deletePushToken(this.token);
  }

  @action
  async getUserInfo() {
    try {
      this.rootStore.fetchingStore.setFetchState(true);

      this.userInfo = await AuthApi.getUserInfo(this.token);
    } catch (error) {
      AuthStore.handleError(error);
    } finally {
      this.rootStore.fetchingStore.setFetchState(false);
    }
  }

  @action
  async updateInfo(id, data) {
    try {
      this.userInfo = await AuthApi.updateUserInfo(id, data, this.token);

    } catch (error) {
      AuthStore.handleError(error);
    }
  }

  @action
  resetUserInfo() {
    this.userInfo = {};
  }

  @action
  signOut() {
    AuthApi.deletePushToken(this.token);
    this.token = "";
    this.rootStore.lessonsStore.reset();
  }
}
