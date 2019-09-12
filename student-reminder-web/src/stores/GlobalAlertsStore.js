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
    let id = data.id || Date.now();
    this.alertsObj = {
      ...this.alertsObj,
      [id]: {
        ...this.alertInitialState,
        id,
        ...data
      }
    }
  }

  @action
  removeFromStore(id) {
    delete this.alertsObj[id];
  }
}

export const globalAlertsStore = new GlobalAlertsStore();
