import React from 'react';

import { Text } from 'react-native';
import { Title, Header, Body, ScrollableTab, Tabs, Tab } from 'native-base';

export const Lessons = () => {
  return (
    <>
      <Header hasTabs>
        <Body>
          <Title>
            Lessons
          </Title>
        </Body>
      </Header>
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
    </>
  )
}