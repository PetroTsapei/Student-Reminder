import { observable, action } from 'mobx';
import GroupApi from '../api/groups';
import { authStore } from '../stores/AuthStore';
import handleError from '../helpers/handleError';

export class GroupStore {
  @observable groupList = [];

  @action
  async getAll() {
    try {
      this.groupList = await GroupApi.getAll(authStore.token);

    } catch (error) {
      handleError(error);
    } finally {

    }
  }

  @action
  async create(data) {
    try {
      const result = await GroupApi.create({
        token: authStore.token,
        ...data
      });

      this.groupList.push(result.group_info);

    } catch (error) {
      handleError(error);
    }
  }

  @action
  setListToInitState() {
    this.groupList = [];
  }
}

export const groupStore = new GroupStore();