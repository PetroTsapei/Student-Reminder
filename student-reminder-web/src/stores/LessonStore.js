import {action, observable} from 'mobx';
import LessonApi from '../api/lessons';
import {authStore} from '../stores/AuthStore';
import handleError from '../helpers/handleError';

export class LessonStore {
  @observable lessonList = [];
  @observable closeModal = false;

  @action
  async getAll() {
    try {
      this.lessonList = await LessonApi.getLessons(authStore.token);

    } catch (error) {
      handleError(error);
    }
  }

  @action
  async create(data) {
    try {
      const result = await LessonApi.createLesson(authStore.token, data);

      this.closeModal = true;

      this.lessonList.push(result.lesson_info);
    } catch (error) {
      handleError(error);
    } finally {
      this.closeModal = false;
    }
  }

  @action
  async update(id, data) {
    try {
      const result = await LessonApi.updateById(authStore.token, id, data);
      this.closeModal = true;
      this.lessonList = this.lessonList.map(el => el._id === id ? result : el);

    } catch (error) {
      handleError(error);
    } finally {
      this.closeModal = false;
    }
  }

  @action
  async delete(id) {
    try {
      await LessonApi.deleteById(authStore.token, id);

      this.lessonList = this.lessonList.filter(e => e._id !== id);
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