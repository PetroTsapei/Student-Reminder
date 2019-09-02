import React, { useContext, useState, useEffect } from 'react';
import {
  Container,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text,
} from 'native-base';
import getDirections from 'react-native-google-maps-directions';
import Setting from './Setting';
import { Image, View } from 'react-native';
import Lessons from '../components/Lessons';
import College from '../assets/images/college.png';
import MapView, { Marker } from 'react-native-maps';
import { RootStoreContext } from '../stores/RootStore';
import { latitude, longitude } from '../constants/collegeCoords';

import styles from '../assets/styles/Home';

export default Home = ({ history }) => {
  const rootStore = useContext(RootStoreContext);
  const [initialRegion, setInitialRegion] = useState({});
  const [markerIsOpen, setMarkerIsOpen] = useState(false);

  const goTo = path => {
    if (history.location.pathname === path) return;

    setMarkerIsOpen(false);
    history.push(path);
    rootStore.lessonsStore.reset();
    rootStore.authStore.resetUserInfo();
  };

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
      () => null,
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
        <Setting
          onSignOut={onSignOut}
        />
      );
      case '/:map': {
        if (Object.keys(initialRegion).length) {
          return (
            <>
              <MapView
                showsUserLocation={true}
                followUserLocation={true}
                zoomEnabled={true}
                style={styles.map}
                initialRegion={initialRegion}
                onMarkerDeselect={() => setMarkerIsOpen(false)}
                onMarkerSelect={() => setMarkerIsOpen(true)}
              >
                <Marker
                  coordinate={{ longitude, latitude }}
                  title="College of electronic devices"
                >
                  <Image source={College} style={{ width: 40, height: 40 }} />
                </Marker>
              </MapView>
              {
                markerIsOpen &&
                  <Button full onPress={handleGetDirections}>
                    <Text>Get direction</Text>
                  </Button>
              }
            </>
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
