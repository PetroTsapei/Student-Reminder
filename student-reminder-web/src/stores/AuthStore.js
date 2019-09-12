import {action, observable} from 'mobx';
import {create, persist} from 'mobx-persist';
import AuthApi from '../api/auth';
import {globalAlertsStore} from '../stores/GlobalAlertsStore';
import handleError from '../helpers/handleError';

export class AuthStore {

  @persist @observable token = "";
  @persist('object') @observable setting = {};

  @action
  async signIn(signInData, needToRemember) {
    try {

      const {
        countryCode,
        phone,
        password
      } = signInData;

      const data = await AuthApi.signIn({
        countryCode: `+${countryCode}`,
        phone,
        password
      });

      if (data.verified) {
        if (data.role === "admin") {
          this.token = data.token;
          this.setting = data.setting;
          !needToRemember && localStorage.removeItem('auth');
        } else {
          globalAlertsStore.addAlert({
            title: "Access denied",
            message: "This user isn't admin!"
          });
        }
      }

    } catch (error) {
      globalAlertsStore.addAlert({
        title: "Error",
        message: error.message
      });
    } finally {

    }
  }

  @action
  async updateSetting(data) {
    try {
      this.setting = await AuthApi.updateSetting(authStore.token, data);

    } catch (error) {
      handleError(error);
    }
  }

  @action
  signOut() {
    this.token = "";
    this.setting = {};
  }
}

const hydrate = create({
  jsonify: true,
});

export const authStore = new AuthStore();

// save auth data to localStorage
hydrate('auth', authStore);
