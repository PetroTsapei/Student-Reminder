import React, { useEffect } from 'react';
import { NativeRouter, Route } from 'react-router-native';
import * as Permissions from 'expo-permissions';

import MainRouter from './src/routes';

export default App = () => {
  async function registerForPushNotificationsAsync() {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      await Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
  }

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);
  
  return (
    <NativeRouter>
      <Route component={MainRouter} />
    </NativeRouter>
  )
}