import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {ScrollView, Alert, RefreshControl} from 'react-native';
import {
  Body,
  Button,
  Header,
  Icon,
  Left,
  ListItem,
  List,
  Right,
  Switch,
  Text,
  Title,
  Spinner
} from "native-base";
import styles from "../assets/styles/Home";
import { RootStoreContext } from "../stores/RootStore";
import {findNumbers} from "libphonenumber-js";

const Setting = observer(props => {
  const rootStore = useContext(RootStoreContext);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    rootStore.authStore.getUserInfo();

    setRefreshing(false);
  }, [refreshing]);

  const _renderItems = () => {
    if (rootStore.fetchingStore.isFetching && !refreshing && !Object.keys(rootStore.authStore.userInfo).length) return (
      <Spinner color='blue' />
    );

    if (!Object.keys(rootStore.authStore.userInfo).length) return;

    const {
      fullName,
      countryCode,
      phone,
      groupName,
      email,
      _id
    } = rootStore.authStore.userInfo;

    return(
      <>
        <ListItem thumbnail>
          <Left />
          <Body>
            <Text>Group</Text>
            <Text note numberOfLines={1}>{groupName}</Text>
          </Body>
          <Right />
        </ListItem>
        <ListItem thumbnail>
          <Left />
          <Body>
            <Text>Full name</Text>
            <Text note numberOfLines={1}>{fullName}</Text>
          </Body>
          <Right>
            <Button transparent onPress={() => Alert.prompt(
              'Enter full name',
              null,
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: fullName => rootStore.authStore.updateInfo(_id, {
                    ...rootStore.authStore.userInfo,
                    fullName
                  }),
                },
              ],
              'plain-text',
              fullName
            )}>
              <Text>Edit</Text>
            </Button>
          </Right>
        </ListItem>
        <ListItem thumbnail>
          <Left />
          <Body>
            <Text>Phone number</Text>
            <Text note numberOfLines={1}>{countryCode + phone}</Text>
          </Body>
          <Right>
            <Button transparent onPress={() => Alert.prompt(
              'Enter Phone number',
              null,
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: phone => {
                    let numberData = findNumbers(phone, 'UA', {
                      v2: true
                    })[0];

                    if (numberData) {
                      const {
                        countryCallingCode : countryCode,
                        nationalNumber : phone
                      } = numberData.number;

                      rootStore.authStore.updateInfo(_id, {
                        ...rootStore.authStore.userInfo,
                        countryCode: `+${countryCode}`,
                        phone
                      })

                    } else Alert.alert('Error', 'Invalid phone number');
                  },
                },
              ],
              'plain-text',
              countryCode + phone,
              'phone-pad'
            )}>
              <Text>Edit</Text>
            </Button>
          </Right>
        </ListItem>
        <ListItem thumbnail>
          <Left />
          <Body>
            <Text>Email</Text>
            <Text note numberOfLines={1}>{email}</Text>
          </Body>
          <Right>
            <Button transparent onPress={() => Alert.prompt(
              'Enter email',
              null,
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: email => rootStore.authStore.updateInfo(_id, {
                    ...rootStore.authStore.userInfo,
                    email
                  }),
                },
              ],
              'plain-text',
              email,
              'email-address'
            )}>
              <Text>Edit</Text>
            </Button>
          </Right>
        </ListItem>
      </>
    )
  };

  return (
    <>
      <Header>
        <Body>
          <Title>
            Settings
          </Title>
        </Body>
      </Header>
      <ScrollView
        contentContainerStyle={[{flex:1,justifyContent:'space-between'}]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => setRefreshing(true)}
          />
        }
      >
        <List>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="notifications" />
              </Button>
            </Left>
            <Body>
              <Text>Notifications</Text>
            </Body>
            <Right>
              <Switch onValueChange={val => rootStore.authStore.switchNotifications(val)} value={rootStore.authStore.enableNotifications} />
            </Right>
          </ListItem>
          { _renderItems() }
        </List>
        <Button large full danger style={styles.settingSignOut} onPress={props.onSignOut}>
          <Text>Sign Out</Text>
        </Button>
      </ScrollView>
    </>
  )
});

export default Setting
