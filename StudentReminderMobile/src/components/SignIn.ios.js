import React, { useContext } from 'react';
import { useInput } from '../helpers/customHooks';
import { findNumbers } from 'libphonenumber-js'
import {Text, View} from 'react-native';
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
  Icon,
  Spinner
} from 'native-base';
import {observer} from 'mobx-react-lite';
import { RootStoreContext } from '../stores/RootStore';

import styles from '../assets/styles/SignIn';

export const SignIn = observer(({ history }) => {
  const rootStore = useContext(RootStoreContext);
  const { 
    value: phone, 
    bind: phoneBind, 
    reset: phoneReset, 
    error: phoneErr,
    setError: setPhoneErr
  } = useInput('+');
  const { 
    value: password, 
    bind: passBind, 
    reset: passReset,
    error: passErr,
    setError: setPassErr
  } = useInput('');

  onSignIn = () => {
    let number = findNumbers(phone, 'UA', {
      v2: true
    })

    // TODO optimize it
    let existError = false;

    if (!phone) {
      existError = true;
      setPhoneErr('Phone number is required');
    }
    if (!password) {
      existError = true;
      setPassErr('Password is required');
    }
    if (phone && !number.length) {
      existError = true;
      setPhoneErr('Invalid phone number');
    }
    
    if (!existError) rootStore.authStore.signIn();
  }

  return (
    <Container>
      <Header>
        <Left />
        <Body>
          <Title>
            Sign In
          </Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <Form>
          <Item floatingLabel error={!!phoneErr}>
            <Icon style={styles.icon} type="FontAwesome" name="phone" />
            {
              phoneErr ? 
                <Label style={styles.error}>{phoneErr}</Label>
                :
                <Label>Phone Number</Label>
            }
            <Input
              keyboardType={'phone-pad'}
              returnKeyType='done'
              { ...phoneBind }
            />
          </Item>
          <Item floatingLabel last error={!!passErr}>
            <Icon style={styles.icon} type="FontAwesome" name="lock" />
            {
              passErr ?
                <Label style={styles.error}>{passErr}</Label>
                :
                <Label>Password</Label>   
            }
            <Input 
              secureTextEntry={true}
              { ...passBind }
            />
          </Item>
          <Button transparent dark style={styles.signUpButton} onPress={() => history.push('/sign-up')}>
              <Text>Don't have an account? </Text>
              <Text style={styles.signUpButtonText}>Sign Up</Text>
          </Button>
        </Form>
      </Content>
      <Button disabled={rootStore.fetchingStore.isFetching} block large warning onPress={onSignIn}>
        {
          rootStore.fetchingStore.isFetching ?
            <Spinner color='black' />
            :
            <Text>Sign In</Text>
        }
      </Button>
    </Container>
  )
})