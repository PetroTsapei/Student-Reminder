import { observable, action } from 'mobx';
import ScheduleApi from '../api/schedules';
import { authStore } from '../stores/AuthStore';
import { globalAlertsStore } from '../stores/GlobalAlertsStore';
import handleError from '../helpers/handleError';

export class ScheduleStore {
  @observable scheduleList = [];
  @observable closeModal = false;

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
  async create(data) {
    try {
      const result = await ScheduleApi.createSchedule(authStore.token, data);

      this.closeModal = true;
      if (result.schedule_info.typeOfTime !== authStore.typeOfTime) globalAlertsStore.addAlert({
        title: "Successfully added",
        message: "Schedule was added, to show it you need switch type of time in header"
      });
      else this.scheduleList.push(result.schedule_info);

    } catch (error) {
      handleError(error);
    } finally {
      this.closeModal = false;
    }
  }

  @action
  async update(id, data) {
    try {
      const result = await ScheduleApi.updateSchedule(authStore.token, id, data);

      this.closeModal = true;
      this.scheduleList = this.scheduleList.map(el => el._id === id ? result : el);

    } catch (error) {
      handleError(error);
    } finally {
      this.closeModal = false;
    }
  }

  @action
  async delete(id) {
    try {
      await ScheduleApi.deleteById(authStore.token, id);

      this.scheduleList = this.scheduleList.filter(e => e._id !== id);
    } catch (error) {
      handleError(error)
    }
  }

  @action
  setToInitState() {
    this.scheduleList = [];
  }
}

export const scheduleStore = new ScheduleStore();