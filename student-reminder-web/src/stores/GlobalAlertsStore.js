import { action, observable } from 'mobx';

export class GlobalAlertsStore {
  alertInitialState = {
    title: '',
    message: '',
    id: null,
    errors: false,
    success: false,
    confirmBtnText: 'Ok'
  };

  @observable alertsObj = {};

  @action
  addAlert(data) {
    this.alertsObj = {
      ...this.alertsObj,
      [data.id]: {
        ...this.alertInitialState,
        ...data
      }
    }
  }

  @action
  removeFromStore() {

  }
}

export const globalAlertsStore = new GlobalAlertsStore();
