import { StyleSheet, Platform } from 'react-native';

// IOS
const ios = StyleSheet.create({
  footerItem: {

  },
  map: {
    flex: 1,
  },
  settingSignOut: {
    textAlign: 'center'
  }
});

export default Platform.select({
  ios
})