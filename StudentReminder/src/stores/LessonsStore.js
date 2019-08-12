import { observable, action } from 'mobx';
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
      const results = await LessonsApi.getAll({
        ...data,
        token: this.rootStore.authStore.token
      })

      this.lessons = results;

    } catch (error) {
      if (error.message) {
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