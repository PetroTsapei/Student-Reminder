import React, { useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
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
  Spinner,
  Text
} from 'native-base';
import validate from '../helpers/validate';
import { useForm } from '../helpers/customHooks';
import { observer } from 'mobx-react-lite';
import { findNumbers } from 'libphonenumber-js';
import { RootStoreContext } from '../stores/RootStore';

import styles from '../assets/styles/SignUp';
import AuthApi from "../api/auth";


export default SignUp = observer(({ history }) => {
  const rootStore = useContext(RootStoreContext);
  const [linkVerified, setLinkVerified] = useState(false);

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    setValues
  } = useForm(onConfirm, validate);

  async function validateDeepLink(userId) {
    try {

      await AuthApi.validateDeepLink(userId);

      setValues({
        phone: `+${history.location.queryParams.phone}`,
        password: ""
      })

    } catch (data) {
      Alert.alert(
        'Error',
        data.error,
        [
          {text: 'OK', onPress: () => history.push('/')},
        ]
      );
    } finally {
      setLinkVerified(true);
    }
  }

  function onConfirm() {
    let numberData = findNumbers(values.phone, 'UA', {
      v2: true
    })[0].number;

    rootStore.authStore.finishRegistration(history.location.queryParams.id, {
      countryCode: `+${numberData.countryCallingCode}`,
      phone: numberData.nationalNumber,
      password: values.password
    });
  }

  useEffect(() => {
    if (history.location.queryParams) validateDeepLink(history.location.queryParams.id);
  }, []);


  if (!linkVerified) return <Spinner style={{ flex: 1 }} color='blue' />;

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => history.goBack()}>
            <Icon name='ios-arrow-back' />
          </Button>
        </Left>
        <Body>
          <Title>
            Finish sign up
          </Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <Form style={styles.form}>
          <Item floatingLabel last error={!!errors.phone}>
            {/* <Icon name='home' /> */}
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
            {
              errors.password ?
                <Label style={styles.error}>{errors.password}</Label>
                :
                <Label>Set password for your account</Label>
            }
            <Input
              secureTextEntry={true}
              value={values.password}
              onChangeText={text => handleChange(text, 'password')}
            />
          </Item>
          <Button primary rounded style={styles.button} onPress={handleSubmit}>
            {
              rootStore.fetchingStore.isFetching ?
                <Spinner color='black'/>
                  :
                <Text>Sign Up</Text>
            }
          </Button>
        </Form>
      </Content>
    </Container>
  )
});
