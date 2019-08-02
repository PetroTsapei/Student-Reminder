import { observable, action } from 'mobx';
import { persist, create } from 'mobx-persist';
import AuthApi from '../api/auth';
import { globalAlertsStore } from '../stores/GlobalAlertsStore';

export class AuthStore {

  @persist @observable token = "";

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
        this.token = data.token;
        !needToRemember && localStorage.removeItem('auth');
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
  signOut() {
    this.token = "";
  }
}

const hydrate = create({
  jsonify: true,
});

export const authStore = new AuthStore();

// save auth data to localStorage
hydrate('auth', authStore);
