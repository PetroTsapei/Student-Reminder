import React, { useContext } from 'react';
import { Switch } from 'react-router-native';
import {observer} from 'mobx-react-lite';
import { RootStoreContext } from '../stores/RootStore';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

export default MainRouter = observer(() => {
  const rootStore = useContext(RootStoreContext);

  return (
    <Switch>
      { rootStore.authStore.token && PrivateRoutes() }
      { PublicRoutes() }
    </Switch>
  )
})