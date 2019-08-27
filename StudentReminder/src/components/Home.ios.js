import React, { useContext, useState, useEffect } from 'react';
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text,
  Body,
  Header,
  Title,
  ListItem,
  Left,
  Right,
  Switch,
} from 'native-base';
import getDirections from 'react-native-google-maps-directions'
import { Image, Alert, View } from 'react-native';
import { Lessons } from '../components/Lessons';
import College from '../assets/images/college.png';
import MapView, { Marker } from 'react-native-maps';
import { RootStoreContext } from '../stores/RootStore';
import { latitude, longitude } from '../constants/collegeCoords';

import styles from '../assets/styles/Home';

export const Home = ({ history }) => {
  const rootStore = useContext(RootStoreContext);
  const [initialRegion, setInitialRegion] = useState({});

  const goTo = path => history.push(path);
  const isActive = path => history.location.pathname === path;
  const onSignOut = () => {
    rootStore.authStore.signOut();
    history.push('/');
  };


  const handleGetDirections = () => {
    const data = {
      source: initialRegion,
      destination: {
        latitude,
        longitude
      },
      params: [
        {
          key: "travelmode",
          value: "walking"
        },
        {
          key: "dir_action",
          value: "navigate"
        }
      ],
    };

    getDirections(data)
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        let region = {
          latitude: parseFloat(position.coords.latitude),
          longitude: parseFloat(position.coords.longitude),
          latitudeDelta: 0.1,
          longitudeDelta: 0.1
        };

        setInitialRegion(region);
      },
      error => Alert.alert('Error', error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      }
    );
  };

  useEffect(() => getCurrentLocation(), ['initialRegion']);

  const pages = () => {
    switch(history.location.pathname) {
      case '/': return <Lessons />;
      case '/:settings': return (
        <>
          <Header>
            <Left />
            <Body>
              <Title>
                Settings
              </Title>
            </Body>
            <Right>
              <Button transparent>
                <Text>Edit</Text>
              </Button>
            </Right>
          </Header>
          <Content>
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
                <Switch value={false} />
              </Right>
            </ListItem>
            <Button full danger style={styles.settingSignOut} onPress={onSignOut}>
              <Text>Sign Out</Text>
            </Button>
          </Content>
        </>
      );
      case '/:map': {
        if (Object.keys(initialRegion).length) {
          return (
            <MapView
              showsUserLocation={true}
              followUserLocation={true}
              zoomEnabled={true}
              style={styles.map}
              initialRegion={initialRegion}
            >
              <Marker
                coordinate={{ longitude, latitude }}
                title="College of electronic devices"
                onPress={handleGetDirections}
              >
                <Image source={College} style={{ width: 40, height: 40 }} />
              </Marker>
            </MapView>
          )
        } else return (
          <View style={styles.mapLoading}>
            <Text>Getting your location...</Text>
          </View>
        )
      }
    }
  };

  return (
    <Container>
        { pages() }
        <Footer>
          <FooterTab>
            <Button
              vertical
              active={isActive('/')}
              onPress={() => goTo('/')}
            >
              <Icon
                type="MaterialIcons"
                name="schedule"
                active={isActive('/')}
              />
              <Text>Lessons</Text>
            </Button>
            <Button
              vertical
              active={isActive('/:map')}
              onPress={() => goTo('/:map')}
            >
              <Icon
                active={isActive('/:map')}
                name="navigate"
              />
              <Text>Map</Text>
            </Button>
            <Button
              vertical
              onPress={() => goTo('/:settings')}
              active={isActive('/:settings')}
            >
              <Icon
                name="settings"
                active={isActive('/:settings')}
              />
              <Text>Settings</Text>
            </Button>
        </FooterTab>
      </Footer>
    </Container>
  )
};
