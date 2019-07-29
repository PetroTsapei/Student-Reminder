import React, { useEffect, useContext } from 'react';
import {Platform, StyleSheet} from 'react-native';
import { NativeRouter, Route } from 'react-router-native';
import { Notifications } from 'expo';
import { RootStoreContext } from './src/stores/RootStore';
import AuthApi from './src/api/auth';
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

  async function registerForPushNotificationsAsync() {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
  
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
  
    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }
  
    // Get the token that uniquely identifies this device
    let pushToken = await Notifications.getExpoPushTokenAsync();

    return AuthApi.pushToken({
      pushToken,
      token: rootStore.authStore.token
    })
  }

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, [])
  
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
