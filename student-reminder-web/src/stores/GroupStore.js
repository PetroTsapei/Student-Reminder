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
  async update(groupId, data) {
    try {
      const result = await GroupApi.updateById(authStore.token, groupId, data);

      this.closeModal = true;
      this.groupList = this.groupList.map(el => el._id === groupId ? result : el);

    } catch (error) {
      handleError(error);
    } finally {
      this.closeModal = false;
    }
  }

  @action
  async delete(id) {
    try {
      await GroupApi.delete(authStore.token, id);

      this.groupList = this.groupList.filter(e => e._id !== id);
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