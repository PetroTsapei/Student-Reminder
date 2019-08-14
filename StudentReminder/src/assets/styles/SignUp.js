import { StyleSheet, Platform } from 'react-native';

// IOS
const ios = StyleSheet.create({
  form: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    width: '90%',
    justifyContent: 'center',
    color: '#FFFFFF',
    marginTop: 15
  },
  error: {
    color: '#e83540'
  }
});

export default Platform.select({
  ios
})