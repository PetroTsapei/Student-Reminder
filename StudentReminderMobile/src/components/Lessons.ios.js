import React, { useContext, useEffect, useState } from 'react';

import { Text, ScrollView, RefreshControl } from 'react-native';
import { 
  Title, 
  Header, 
  Body, 
  ScrollableTab, 
  Tabs, 
  Tab, 
  Spinner, 
  H2, 
  View,
  Card,
  CardItem,
} from 'native-base';
import dayOfWeek from '../helpers/numberOfWeek';
import { RootStoreContext } from '../stores/RootStore';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import styles from '../assets/styles/Home';

export const Lessons = observer(() => {
  const rootStore = useContext(RootStoreContext);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    rootStore.lessonsStore.getLessons({
      typeOfTime: "short",
      groupName: rootStore.authStore.group
    })

    setRefreshing(false);
  }, [refreshing]);

  function renderTabs() {
    if (rootStore.fetchingStore.isFetching && !refreshing && !rootStore.lessonsStore.lessons.length) {
      return <Spinner style={{ flex: 1 }} color='blue' />
    }

    if (rootStore.lessonsStore.lessons.length) {
      let tabArr = [], initialPage = 0;
      const {
        lessons
      } = rootStore.lessonsStore;

      for (let day in dayOfWeek) {
        let weekLessons = [];
        let lessonsForDayOfWeek = lessons.filter(lesson => lesson.schedule.dayOfWeek == day);
        
        if (!lessonsForDayOfWeek.length) {
          weekLessons.push(notification('No lessons for this day'))
        };
        if (new Date().getDay() == day) initialPage = day - 1; // tabs start numerate from 0

        lessonsForDayOfWeek.forEach((lessonItem, key) => {
          const startLesson = moment(lessonItem.schedule.startTime).format('LT');
          const endLesson = moment(lessonItem.schedule.endTime).format('LT');

          weekLessons.push(
            <Card style={styles.card} key={key}>
              <CardItem>
                <Body style={styles.cardItemHours}>
                  <Text>
                    {`${startLesson} - ${endLesson}`}
                  </Text>
                </Body>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>test</Text>
                </Body>
              </CardItem>
            </Card>
          )
        })

        if (weekLessons.length) {
          tabArr.push(
            <Tab key={day} heading={dayOfWeek[day]}>
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={() => setRefreshing(true)}
                  />
                }
              >
                { weekLessons }
              </ScrollView>
            </Tab>
          )
        }
      }

      return (
        <Tabs initialPage={initialPage} renderTabBar={() => <ScrollableTab />}>
          { tabArr }
        </Tabs>
      )
    } else return notification('Not found Lessons');
  }

  function notification(text) {
    return (
      <View key={new Date().getMilliseconds()} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <H2>{text}</H2>
      </View>
    )
  }

  return (
    <>
      <Header hasTabs>
        <Body>
          <Title>
            Lessons
          </Title>
        </Body>
      </Header>
      { renderTabs() }
    </>
  )
})