import { action, observable } from 'mobx';
import LessonsApi from '../api/lessons';
import { Alert } from 'react-native';

export class LessonsStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable lessons = [];

  @action
  async getLessons(data) {
    try {

      this.rootStore.fetchingStore.setFetchState(true);
      this.lessons = await LessonsApi.getAll({
        ...data,
        token: this.rootStore.authStore.token
      });

    } catch (error) {
      if (error.status === 401) this.rootStore.authStore.signOut();
      else if (error.message) {
        Alert.alert(
          'Error',
          error.message
        )
      } else {
        Alert.alert(
          'Error',
          'An error occurred'
        )
      }
    } finally {
      this.rootStore.fetchingStore.setFetchState(false);
    }
  }

  @action reset() {
    this.lessons = [];
  }
}
