import { StyleSheet, Platform } from 'react-native';

// IOS
const ios = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default Platform.select({
  ios
})