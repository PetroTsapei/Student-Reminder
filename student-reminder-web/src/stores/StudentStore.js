import { observable, action } from 'mobx';
import UserApi from '../api/users';
import { authStore } from '../stores/AuthStore';
import handleError from '../helpers/handleError';

export class StudentStore {
  @observable studentList = [];
  @observable groupName = "";

  @action
  async getStudentsByGroupId(groupId) {
    try {
      let { groupName, result } = await UserApi.getByGroupId({
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
    let currentGroupLeader = this.studentList.findIndex(el => el.groupLeader === true);

    if (data.groupLeader && this.studentList.length && currentGroupLeader >= 0) this.studentList[currentGroupLeader].groupLeader = false;

    this.studentList = [
      ...this.studentList,
      {
        ...data,
        phone: `${data.countryCode}${data.phone}`
      }
    ];
  }

  @action
  async delete(id) {
    try {
      await UserApi.delete(authStore.token, id);

      this.studentList = this.studentList.filter(e => e._id !== id);
    } catch (error) {
      handleError(error);
    }
  }

  @action
  async update(id, data) {
    let result = await UserApi.update(authStore.token, id, data);
    let currentGroupLeader = this.studentList.findIndex(e => e.groupLeader === true);
    let studentList = Array.from(this.studentList);

    for (let i in studentList) {
      if (result.groupLeader && currentGroupLeader == i) studentList[i].groupLeader = false;

      if (id === studentList[i]._id) {
        studentList[i] = {
          ...result,
          phone: `${result.countryCode}${result.phone}`
        };
        break;
      }
    }

    this.studentList = studentList;
  }

  setToInitState() {
    this.studentList = [];
    this.groupName = "";
  }
}

export const studentStore = new StudentStore();
