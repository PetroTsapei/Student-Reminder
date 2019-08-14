import React, { useContext } from 'react';
import { useForm } from '../helpers/customHooks';
import validate from '../helpers/validate';
import { findNumbers } from 'libphonenumber-js';
import { Text } from 'react-native';
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

export const SignIn = observer(() => {
  const rootStore = useContext(RootStoreContext);

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(onSignIn, validate);

  function onSignIn() {
    let numberData = findNumbers(values.phone, 'UA', {
      v2: true
    })[0].number;

    rootStore.authStore.signIn({
      countryCode: `+${numberData.countryCallingCode}`,
      phone: numberData.nationalNumber,
      password: values.password
    });
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
          <Item floatingLabel last error={!!errors.phone}>
            {/* <Icon style={styles.icon} type="FontAwesome" name="phone" /> */}
            {
              errors.phone ?
                <Label style={styles.error}>{errors.phone}</Label>
                :
                <Label>Phone Number</Label>
            }
            <Input
              keyboardType={'phone-pad'}
              returnKeyType='done'
              maxLength={15}
              value={values.phone}
              onChangeText={text => handleChange(text, 'phone')}
            />
          </Item>
          <Item floatingLabel last error={!!errors.password}>
            {/* <Icon style={styles.icon} type="FontAwesome" name="lock" /> */}
            {
              errors.password ?
                <Label style={styles.error}>{errors.password}</Label>
                :
                <Label>Password</Label>   
            }
            <Input 
              secureTextEntry={true}
              value={values.password}
              onChangeText={text => handleChange(text, 'password')}
            />
          </Item>
        </Form>
      </Content>
      <Button disabled={rootStore.fetchingStore.isFetching} block large warning onPress={handleSubmit}>
        {
          rootStore.fetchingStore.isFetching ?
            <Spinner color='black' />
            :
            <Text>Sign In</Text>
        }
      </Button>
    </Container>
  )
});