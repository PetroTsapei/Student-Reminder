import { observable, action } from 'mobx';
import GroupApi from '../api/groups';
import { authStore } from '../stores/AuthStore';
import handleError from '../helpers/handleError';

export class GroupStore {
  @observable groupList = [];
  @observable closeModal = false;

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

      this.closeModal = true;

      this.groupList.push(result.group_info);

    } catch (error) {
      handleError(error);
    } finally {
      this.closeModal = false;
    }
  }

  @action
  async update(data) {
    try {
      const result = await GroupApi.updateById(authStore.token, data);

      this.closeModal = true;

      console.log(result);
    } catch (error) {
      handleError(error);
    } finally {
      this.closeModal = false;
    }
  }

  @action
  setListToInitState() {
    this.groupList = [];
  }
}

export const groupStore = new GroupStore();