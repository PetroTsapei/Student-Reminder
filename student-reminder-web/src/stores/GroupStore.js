import { observable, action } from 'mobx';
import GroupApi from '../api/groups';
import { globalAlertsStore } from '../stores/GlobalAlertsStore';
import { authStore } from '../stores/AuthStore';
import { errorStore } from '../stores/ErrorStore';

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
  async create(data) {
    try {
      const result = await GroupApi.create({
        token: authStore.token,
        ...data
      });

      this.groupList.push(result.group_info);

    } catch (error) {
      if (error.fieldsErrors) {
        errorStore.add(error.fieldsErrors.errors);
      } else {
        globalAlertsStore.addAlert({
          title: "Error",
          message: error.message
        });
      }
    }
  }

  @action
  setListToInitState() {
    this.groupList = [];
  }
}

export const groupStore = new GroupStore();