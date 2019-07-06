import { create } from 'mobx-persist';
import { createContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthStore } from './AuthStrore';
import { FetchingStore } from './FetchingStore';

const hydrate = create({
  storage: AsyncStorage,
  jsonify: true
});

export class RootStore {
  authStore = new AuthStore(this);
  fetchingStore = new FetchingStore();

  constructor() {
    hydrate("authStore", this.authStore);
  }
}

export const RootStoreContext = createContext(new RootStore());