import {action, observable} from 'mobx';
import SubjectApi from '../api/subjects';
import { authStore } from '../stores/AuthStore';
import handleError from '../helpers/handleError';

export class SubjectStore {
  @observable subjectList = [];
  @observable closeModal = false;

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
  async create(data) {
    try {
      const response = await SubjectApi.createSubject(authStore.token, data);

      this.closeModal = true;
      this.subjectList.push(response.subject_info);

    } catch (error) {
      handleError(error);
    } finally {
      this.closeModal = false
    }
  }

  @action
  async update(data) {
    try {
      await SubjectApi.updateSubject(authStore.token, data);

      this.subjectList = this.subjectList.map(el => el._id === data.id ? Object.assign({}, el, { name: data.name }) : el);
    } catch (error) {
      handleError(error);
    }
  }

  @action
  async delete(id) {
    try {
      await SubjectApi.deleteSubject(authStore.token, id);

      this.subjectList = this.subjectList.filter(e => e._id !== id);
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