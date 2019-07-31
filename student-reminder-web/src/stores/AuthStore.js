import { observable, action, decorate } from 'mobx';
import { createContext } from 'react';
import { persist } from 'mobx-persist';
import AuthApi from '../api/auth';

export class AuthStore {

  token = "";

  async signIn(signInData) {
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
      }
      
    } catch (error) {
      console.log(error);
      // console.log(obj);
      // Alert.alert(
      //   'Sign In Error',
      //   obj.error
      // );
    } finally {

    }
  }

  signOut() {
    this.token = "";
  }
}

decorate(AuthStore, {
  token: observable,
  signIn: action,
  signOut: action
})

export const AuthStoreContext = createContext(new AuthStore());