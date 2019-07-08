import React, { useContext } from 'react';
import { Switch } from 'react-router-native';
import { RootStoreContext } from '../stores/RootStore';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

export default MainRouter = () => {
  const rootStore = useContext(RootStoreContext);
  console.log(rootStore.authStore.token);

  return (
    <Switch>
      {/* TODO fix dynamic update token */}
      { rootStore.authStore.token && PrivateRoutes() }
      { PublicRoutes() }
    </Switch>
  )
}