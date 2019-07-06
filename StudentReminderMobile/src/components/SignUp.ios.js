import React, { useContext } from 'react';
import {Text, View, AlertIOS} from 'react-native';
import { 
  Container, 
  Header, 
  Content, 
  Form, 
  Item, 
  Input, 
  Label, 
  Title,
  Left,
  Right,
  Body,
  Button,
  Icon
} from 'native-base';
import {observer} from 'mobx-react-lite';
import { RootStoreContext } from '../stores/RootStore';
import PhoneAuth from 'react-native-phone-auth-component';

import styles from '../assets/styles/SignUp';


export const SignUp = observer(({ history }) => {
  const authStore = useContext(RootStoreContext);

  function signUpForm() {
    return (
      <>
        <Header>
          <Left>
            <Button transparent onPress={() => history.goBack()}>
              <Icon name='ios-arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>
              Sign Up
            </Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form style={styles.form}>
            <Item floatingLabel>
              {/* <Icon name='home' /> */}
              <Label>Phone Number</Label>
              <Input 
                keyboardType={'phone-pad'}
                returnKeyType='done'
                autoCorrect={false}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input 
                secureTextEntry={true}
              />
            </Item>
            <Button rounded style={styles.buttonSignIn}>
              <Text>Sign In</Text>
            </Button>
          </Form>
        </Content>
      </>
    )
  }

  function tabs() {
    switch(history.location.pathname) {
      case '/sign-up' : return signUpForm()
      case '/sign-up/phone': {
        return (
          <PhoneAuth
            signInWithPhone={phone => new Promise((res, rej) => {
              console.log(phone);
              return rej()
            })}
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
    <Container>
      { tabs() }
    </Container>
  )
});