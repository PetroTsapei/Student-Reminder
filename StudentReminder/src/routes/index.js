import React, { useContext, useEffect, useState } from 'react';
import { Switch } from 'react-router-native';
import {observer} from 'mobx-react-lite';
import { Alert } from 'react-native';
import { Linking } from 'expo';
import { RootStoreContext } from '../stores/RootStore';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

export default MainRouter = observer(({ history }) => {
  const rootStore = useContext(RootStoreContext);
  const [isDeepLink, setIsDeepLink] = useState(true);

  async function getInitialUrl() {
    try {

      const linkParse = url => {
        let { queryParams } = Linking.parse(url);
        if (Object.keys(queryParams).length) history.push('/sign-up');
      }

      Linking.addEventListener('url', data => linkParse(data.url));
      let url = await Linking.getInitialURL();

      if (url) linkParse(url);

    } catch(error) {
      Alert.alert(
        'Error',
        error.message
      )
    } finally {
      setIsDeepLink(false);
    }
  }

  useEffect(() => {
    getInitialUrl();
  }, [])

  if (isDeepLink) return; 

  return (
    <Switch>
      { rootStore.authStore.token && PrivateRoutes() }
      { PublicRoutes() }
    </Switch>
  )
})