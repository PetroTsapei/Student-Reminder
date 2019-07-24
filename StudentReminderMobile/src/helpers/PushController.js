import React, { useEffect } from 'react';
import PushNotification from 'react-native-push-notification';

export default PushController = () => {
  useEffect(() => {
    PushNotification.configure({
      onNotification: function(notification) {
        console.log('notification:', notification);
      },
    })
  }, [])

  return null;
}