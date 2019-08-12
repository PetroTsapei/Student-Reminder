import { observable, action } from 'mobx';
import StudentApi from '../api/students';
import { authStore } from '../stores/AuthStore';
import handleError from '../helpers/handleError';

export class StudentStore {
  @observable studentList = [];
  @observable groupName = "";

  @action
  async getStudentsByGroupId(groupId) {
    try {
      let { groupName, result } = await StudentApi.getByGroupId({
        token: authStore.token,
        groupId
      });

      this.groupName = groupName;
      this.studentList = result.filter(e => e.phone = e.countryCode + e.phone);

    } catch (error) {
      handleError(error);
    } finally {

    }
  }

  @action
  async addStudent(data) {
    if (data.groupLeader && this.studentList.length && this.studentList.findIndex(el => el.groupLeader === true) >= 0) this.studentList[this.studentList.findIndex(el => el.groupLeader === true)].groupLeader = false;

    this.studentList = [
      ...this.studentList,
      {
        ...data,
        phone: `${data.countryCode}${data.phone}`
      }
    ];
  }

  setToInitState() {
    this.studentList = [];
    this.groupName = "";
  }
}

export const studentStore = new StudentStore();