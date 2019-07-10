import { StyleSheet, Platform } from 'react-native';

// IOS
const ios = StyleSheet.create({
  footerItem: {

  },
  map: {
    flex: 1,
  },
  settingSignOut: {
    paddingTop: 10,
  },
  tabItem: {
    color: '#f0ad4e'
  }
});

export default Platform.select({
  ios
})