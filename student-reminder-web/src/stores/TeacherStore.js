import { observable, action } from 'mobx';
import UserApi from '../api/users';
import AuthApi from '../api/auth';
import { authStore } from '../stores/AuthStore';
import handleError from '../helpers/handleError';

export class TeacherStore {
  @observable teacherList = [];

  @action
  async getTeachers() {
    try {
      let result = await AuthApi.getTeachers(authStore.token);

      this.teacherList = result.filter(e => e.phone = e.countryCode + e.phone);

    } catch (error) {
      handleError(error);
    }
  }

  @action
  async addTeacher(data) {
    this.teacherList = [
      ...this.teacherList,
      {
        ...data,
        phone: `${data.countryCode}${data.phone}`
      }
    ]
  }

  @action
  async update(id , data) {
    let result = await UserApi.update(authStore.token, id, data);

    this.teacherList = this.teacherList.map(el => el._id === id ? {
      ...result,
      phone: `${result.countryCode}${result.phone}`
    } : el);
  }

  @action
  async delete(id) {
    try {
      await UserApi.delete(authStore.token, id);

      this.teacherList = this.teacherList.filter(e => e._id !== id);
    } catch (error) {
      handleError(error);
    }
  }

  setToInitState() {
    this.teacherList = [];
  }
}

export const teacherStore = new TeacherStore();
