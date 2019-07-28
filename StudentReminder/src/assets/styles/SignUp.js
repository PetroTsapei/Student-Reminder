import { StyleSheet, Platform } from 'react-native';

// IOS
const ios = StyleSheet.create({
  form: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonSignIn: {
    width: '90%',
    justifyContent: 'center',
    color: '#fff',
    marginTop: 15
  }
});

export default Platform.select({
  ios
})