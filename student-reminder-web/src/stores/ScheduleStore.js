import { observable, action } from 'mobx';
import ScheduleApi from '../api/schedules';
import { authStore } from '../stores/AuthStore';
import handleError from '../helpers/handleError';

export class ScheduleStore {
  @observable scheduleList = [];

  @action
  async getAll(page = 1) {
    try {
      const result = await ScheduleApi.getSchedules(authStore.token, page);

      this.scheduleList = result.schedules;

    } catch (error) {
      handleError(error);
    }
  }

  @action
  setToInitState() {
    this.scheduleList = [];
  }
}

export const scheduleStore = new ScheduleStore();