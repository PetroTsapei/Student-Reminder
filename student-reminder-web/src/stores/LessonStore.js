import { observable, action } from 'mobx';
import LessonApi from '../api/lessons';
import { authStore } from '../stores/AuthStore';
import handleError from '../helpers/handleError';

export class LessonStore {
  @observable lessonList = [];

  @action
  async getAll() {
    try {
      const result = await LessonApi.getLessons(authStore.token);

      this.lessonList = result;

      console.log(result);
    } catch (error) {
      handleError(error);
    }
  }

  @action
  async create(data) {
    try {
      const result = await LessonApi.createLesson(authStore.token, data);

      console.log(result);
    } catch (error) {
      handleError(error);
    }
  }

  @action
  setToInitState() {
    this.lessonList = [];
  }
}

export const lessonStore = new LessonStore();