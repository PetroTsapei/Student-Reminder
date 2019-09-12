import { StyleSheet, Platform } from 'react-native';

// IOS
const ios = StyleSheet.create({
  buttonSignIn: {
    marginTop: 15
  },
  signUpButton: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  signUpButtonText: {
    color: '#eb9e3e'
  },
  icon: {
    fontSize: 20
  },
  error: {
    color: '#e83540'
  }
});

export default Platform.select({
  ios
})