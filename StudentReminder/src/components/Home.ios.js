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
  Title
} from 'native-base';
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
            <Body>
              <Title>
                Settings
              </Title>
            </Body>
          </Header>
          <Content>
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