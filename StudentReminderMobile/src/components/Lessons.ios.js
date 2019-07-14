import React, { useContext, useEffect } from 'react';

import { Text } from 'react-native';
import { Title, Header, Body, ScrollableTab, Tabs, Tab, Spinner } from 'native-base';
import { RootStoreContext } from '../stores/RootStore';
import {observer} from 'mobx-react-lite';

export const Lessons = observer(() => {
  const rootStore = useContext(RootStoreContext);

  useEffect(() => {
    rootStore.lessonsStore.getLessons({
      typeOfTime: "short",
      groupName: rootStore.authStore.group
    })
  }, []);

  return (
    <>
      <Header hasTabs>
        <Body>
          <Title>
            Lessons
          </Title>
        </Body>
      </Header>
      {
        rootStore.fetchingStore.isFetching ?
        <Spinner style={{ flex: 1 }} color='blue' />
          : 
        <Tabs renderTabBar={() => <ScrollableTab />}>
          <Tab heading="Mon">
            <Text>test</Text>
          </Tab>
          <Tab heading="Tue">
            <Text>test 2</Text>
          </Tab>
          <Tab heading="Wed">
            <Text>test 2</Text>
          </Tab>
          <Tab heading="Thu">
            <Text>test 2</Text>
          </Tab>
          <Tab heading="Fri">
            <Text>test 2</Text>
          </Tab>
        </Tabs>
      }
    </>
  )
})