import { observable, action } from 'mobx';
import GroupApi from '../api/groups';
import { globalAlertsStore } from '../stores/GlobalAlertsStore';
import { authStore } from '../stores/AuthStore';

export class GroupStore {
  @observable groupList = [];

  @action
  async getAll() {
    try {
      this.groupList = await GroupApi.getAll(authStore.token);

    } catch (error) {
      globalAlertsStore.addAlert({
        title: "Error",
        message: error.message
      });
    } finally {

    }
  }

  @action
  setListToInitState() {
    this.groupList = [];
  }
}

export const groupStore = new GroupStore();