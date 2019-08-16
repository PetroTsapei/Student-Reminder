import {action, observable} from 'mobx';
import SubjectApi from '../api/subjects';
import { authStore } from '../stores/AuthStore';
import handleError from '../helpers/handleError';

export class SubjectStore {
  @observable subjectList = [];

  @action
  async getSubjects(page = 1) {
    try {
      const { subjects } = await SubjectApi.getSubjects(authStore.token, page);
      this.subjectList = subjects;
    } catch (error) {
      handleError(error);
    }
  }

  @action
  setToInitState() {
    this.subjectList = [];
  }
}

export const subjectStore = new SubjectStore();