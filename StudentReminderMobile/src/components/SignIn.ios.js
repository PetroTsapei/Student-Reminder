import React, { useContext } from 'react';
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
  Icon
} from 'native-base';
import {observer} from 'mobx-react-lite';
import { RootStoreContext } from '../stores/RootStore';

import styles from '../assets/styles/SignIn';

export const SignIn = observer(({ history }) => {
  const rootStore = useContext(RootStoreContext);

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
          <Button transparent dark style={styles.signUpButton} onPress={() => history.push('/sign-up')}>
              <Text>Don't have an account? </Text>
              <Text style={styles.signUpButtonText}>Sign Up</Text>
          </Button>
        </Form>
      </Content>
      { console.log(rootStore.fetchingStore.isFetching) }
      <Button disabled={rootStore.fetchingStore.isFetching} block large warning onPress={() => {
        // rootStore.fetchingStore.setFetchState(true);
        rootStore.authStore.signIn();
      }}>
        <Text>Sign In</Text>
      </Button>
    </Container>
  )
})