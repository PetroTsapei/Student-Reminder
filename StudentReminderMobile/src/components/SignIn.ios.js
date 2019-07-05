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

import styles from '../assets/styles/SignIn';

export const SignIn = observer(({ history }) => (
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
    <Content contentContainerStyle={styles.form}>
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
    <Button block large warning>
      <Text>Sign In</Text>
    </Button>
  </Container>
))