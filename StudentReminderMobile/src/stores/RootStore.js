import { create } from 'mobx-persist';
import { createContext } from 'react';
import { AsyncStorage } from 'react-native';
import { ObservableAuthStoreContext } from './ObservableAuthStrore';

const hydrate = create({
  storage: AsyncStorage,
  jsonify: true
});

export class RootStore {
  authStore = new ObservableAuthStoreContext(this)

  constructor() {
    hydrate("authStore", this.authStore);
  }
}

export const RootStoreContext = createContext(new RootStore());