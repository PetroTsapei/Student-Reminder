import React, { useEffect, useContext } from 'react';
import {Platform, StyleSheet} from 'react-native';
import { NativeRouter, Route } from 'react-router-native';
import { Notifications } from 'expo';
import { RootStoreContext } from './src/stores/RootStore';
import * as Permissions from 'expo-permissions';

import MainRouter from './src/routes';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default App = () => {
  const rootStore = useContext(RootStoreContext);

  useEffect(() => {
    Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
      if (status === "granted") {
        Notifications.getExpoPushTokenAsync().then(token => {
          console.log(token);
        })
      }
    })
  }, [])

  // console.log(rootStore.authStore.token);
  
  return (
    <NativeRouter>
      <Route component={MainRouter} />
    </NativeRouter>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
