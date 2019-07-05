import { observable } from 'mobx';
import { persist } from 'mobx-persist';
import { createContext } from 'react'

class ObservableAuthStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable count = 0;
}

export const ObservableAuthStoreContext = createContext(new ObservableAuthStore());