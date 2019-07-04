import React, { useContext } from 'react';
import {Text, View, AlertIOS, Button} from 'react-native';
import {observer} from 'mobx-react-lite';
import { ObservableAuthStoreContext } from '../stores/ObservableAuthStrore';
import PhoneAuth from 'react-native-phone-auth-component';

import styles from '../assets/styles/SignUp';


export const SignUp = observer(({ history }) => {
  const authStore = useContext(ObservableAuthStoreContext);

  function signUpForm() {
    return (
      <>
        <Text>{authStore.count}</Text>
        <Button  title="increment" onPress={() => history.push('/sign-up/phone')}/>
      </>
    )
  }

  function tabs() {
    switch(history.location.pathname) {
      case '/' : return signUpForm()
      case '/sign-up/phone': {
        return (
          <PhoneAuth
            signInWithPhone={phone => new Promise((res, rej) => rej())}
            redeemCode={code => AlertIOS('Please attach method to redeemCode prop')}
            codeLength={7}
            buttonTextColor='black'
            spinnerColor='black'
            color='#ff8203'
            androidFont='monospace'
            iOSFont='Menlo'
            containerStyle={{flex: 1}}
            verifyButtonMessage='Sign up'
            disclaimerMessage='Enter your phone number'
            cca2='UA'
            callingCode='380'
          />
        )
      }
    }
  }

  return (
    <View style={styles.container}>
      { tabs() }
    </View>
  )
});